import { basePublications } from "./publications.base";
import { Publication } from "./types";

type ReadFile = typeof import("fs/promises").readFile;
type PdfParse = (dataBuffer: Buffer) => Promise<{ text: string }>;

export const publications: Publication[] = await buildPublications();

async function buildPublications(): Promise<Publication[]> {
  if (typeof window !== "undefined") {
    return basePublications;
  }

  const [{ readFile }, pdfParseModule] = await Promise.all([
    import("fs/promises"),
    import("pdf-parse"),
  ]);

  const parsePdf = (pdfParseModule.default ?? pdfParseModule) as unknown as PdfParse;

  const enriched = await enrichDissertations(basePublications, readFile, parsePdf);

  return enriched;
}

async function enrichDissertations(
  publications: Publication[],
  readFile: ReadFile,
  parsePdf: PdfParse,
): Promise<Publication[]> {
  return Promise.all(
    publications.map(async (publication) => {
      if (publication.type !== "dissertation") {
        return publication;
      }

      const needsAbstract = !publication.abstract?.trim();
      const needsKeywords = !publication.keywords?.length;
      const needsSeoLead = !publication.seoLead?.trim();

      if (!needsAbstract && !needsKeywords && !needsSeoLead) {
        return publication;
      }

      const primaryPdf = getPrimaryPdf(publication.pdfs);

      if (!primaryPdf) {
        return {
          ...publication,
          abstract: publication.abstract || "TODO: добавить аннтацию диссертации вручную.",
          keywords: publication.keywords?.length ? publication.keywords : undefined,
          seoLead: publication.seoLead,
        };
      }

      try {
        const pdfText = await parsePdfText(readFile, parsePdf, primaryPdf.url);
        const extractedAbstract = needsAbstract ? extractAbstract(pdfText) : publication.abstract;
        const extractedKeywords = needsKeywords ? extractKeywords(pdfText) : publication.keywords;
        const seoLead = needsSeoLead
          ? buildSeoLead(extractedAbstract ?? publication.abstract)
          : publication.seoLead;

        return {
          ...publication,
          abstract: extractedAbstract || publication.abstract || "TODO: добавить аннотацию диссертации вручную.",
          keywords: extractedKeywords?.length ? extractedKeywords : publication.keywords,
          seoLead,
        };
      } catch (error) {
        console.error(`Не удалось извлечь данные из PDF диссертации ${publication.slug}:`, error);

        return {
          ...publication,
          abstract: publication.abstract || "TODO: добавить аннотацию диссертации вручную.",
          keywords: publication.keywords?.length ? publication.keywords : undefined,
          seoLead: publication.seoLead,
        };
      }
    }),
  );
}

function getPrimaryPdf(pdfs: Publication["pdfs"]): Publication["pdfs"][number] | undefined {
  if (!pdfs.length) return undefined;

  const sorted = [...pdfs].sort((a, b) => {
    if (a.lang === b.lang) return 0;
    return a.lang === "RU" ? -1 : 1;
  });

  return sorted[0];
}

async function parsePdfText(readFile: ReadFile, parsePdf: PdfParse, pdfUrl: string): Promise<string> {
  const absolutePath = `${process.cwd()}/public/${pdfUrl.replace(/^\//, "")}`;
  const fileBuffer = await readFile(absolutePath);
  const result = await parsePdf(fileBuffer);

  return result.text;
}

function extractAbstract(text: string): string | undefined {
  const normalized = text.replace(/\r\n/g, "\n");
  const abstractMatch = normalized.match(/(?:Аннотация|Abstract|Summary)[\s:]*([\s\S]{300,1400}?)(?:\n\s*(?:Ключевые слова|Keywords)\b|\n\s*(?:ГЛАВА|Глава|Chapter)\b|\n\s*\d+\s*$)/i);

  if (abstractMatch?.[1]) {
    return abstractMatch[1].replace(/\s+/g, " ").trim();
  }

  const introSlice = normalized.slice(0, 2200).replace(/\s+/g, " ").trim();

  return introSlice.length > 0 ? introSlice : undefined;
}

function extractKeywords(text: string): string[] | undefined {
  const match = text.match(/(?:Ключевые слова|Keywords)[\s:]*([\s\S]{10,180})/i);

  if (!match?.[1]) return undefined;

  return match[1]
    .replace(/[\n\r]+/g, " ")
    .split(/[,;]\s*/)
    .map((keyword) => keyword.trim())
    .filter(Boolean);
}

function buildSeoLead(abstract?: string): string | undefined {
  if (!abstract) return undefined;

  const normalized = abstract.replace(/\s+/g, " ").trim();
  const sentenceEnd = normalized.indexOf(".");

  if (sentenceEnd > 40 && sentenceEnd <= 220) {
    return normalized.slice(0, sentenceEnd + 1).trim();
  }

  return normalized.slice(0, 220);
}
