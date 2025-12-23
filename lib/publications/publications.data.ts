import { Publication } from "./types";

type ReadFile = typeof import("node:fs/promises").readFile;
type PdfParser = import("pdf-parse").PDFParse;

const basePublications: Publication[] = [
  {
    slug: "athletics-dark-triad",
    type: "article",
    title:
      "Взаимосвязь занятий атлетизмом с психологическими чертами «тёмной триады» и установкой на преодоление",
    authors: ["Антон Ю. Колхонен"],
    year: 2023,
    journal: "Психология и педагогика спортивной деятельности",
    seoLead:
      "Исследование связывает силовые тренировки с выраженностью «тёмной триады» и готовностью к преодолению трудностей у спортсменов.",
    abstract:
      "Анализирует, как регулярные тренировки в силовых видах спорта сопряжены с выраженностью «тёмной триады» и мотивацией к преодолению трудностей у спортсменов.",
    pdfs: [
      {
        url: "/documents/research/articles/2023-athletics-dark-triad.pdf",
        lang: "RU",
      },
    ],
  },
  {
    slug: "good-evil-social-representations-part-1",
    type: "article",
    title:
      "Представления о «добре» и «зле» студентов-психологов в «до-ковидную эпоху» и в настоящее время. Часть 1. Анализ семантического пространства категорий «добро» и «зло»",
    authors: ["Е. А. Юмкина", "А. Ю. Колхонен", "И. А. Мироненко"],
    year: 2023,
    journal: "Институт психологии РАН. Социальная и экономическая психология. Том 8. №3 (31)",
    seoLead:
      "Сравнение семантических представлений о добре и зле у студентов-психологов до пандемии и в актуальный период с фиксацией сдвигов в коллективных оценках.",
    abstract:
      "Сравнивает семантическое наполнение категорий «добро» и «зло» у студентов-психологов до пандемии и после неё, фиксируя сдвиги в коллективных представлениях.",
    pdfs: [
      {
        url: "/documents/research/articles/2023-good-evil-social-representations_1.pdf",
        lang: "RU",
      },
    ],
  },
  {
    slug: "good-evil-social-representations-part-2",
    type: "article",
    title:
      "Представления о «добре» и «зле» студентов-психологов в «до-ковидную эпоху» и в настоящее время. Часть 2. Содержательный анализ определений добра и зла",
    authors: ["Е. А. Юмкина", "А. Ю. Колхонен", "И. А. Мироненко"],
    year: 2023,
    journal: "Институт психологии РАН. Социальная и экономическая психология. Том 8. №4 (32)",
    seoLead:
      "Продолжение исследования представлений студентов о категориях добра и зла с фокусом на содержательные определения и устойчивые смысловые ядра.",
    abstract:
      "Продолжает исследование представлений студентов о добре и зле, углубляясь в конкретные определения и выявляя устойчивые смысловые ядра.",
    pdfs: [
      {
        url: "/documents/research/articles/2023-good-evil-social-representations_2.pdf",
        lang: "RU",
      },
    ],
  },
  {
    slug: "personality-typology-ethical-psychology",
    type: "article",
    title: "К типологии личности в этической психологии",
    authors: ["А. Ю. Колхонен", "И. А. Мироненко"],
    year: 2024,
    journal: "Исследование по этической психологии",
    seoLead:
      "Статья предлагает типологию личности в нравственной психологии, связывая этические позиции о соотношении добра и зла с показателями Темной и Светлой триад.",
    abstract:
      "В русле актуальной дискуссии о взаимодействии и взаимосвязи этики и психологии, о возможности и необходимости развития междисциплинарных исследований, потенциально обогащающих обе дисциплины, в статье поднимается вопрос о необходимости проблематизации категорий добра и зла в психологии. Рассматриваются две этические позиции личности относительно того, как соотносятся добро и зло в мире: «зло как противоположность, отсутствие добра» и «добро и зло как автономные силы, ведущие борьбу». Анализируются корреляты данных этических позиций в академическом дискурсе психологии. Представлены результаты эмпирического исследования взаимосвязей этических позиций относительно соотношения добра и зла и характерологических особенностей личности. Показано наличие статистически значимых взаимосвязей между представлениями о добре и зле и показателями тестов Темной триады и Светлой триады. Факторная модель, полученная на основе обработки эмпирических результатов, используется как основание для выделения типов личности в нравственной психологии. На основании факторной модели описаны два полярных типа личности, каждый из которых может затем подразделяться на подтипы и смешанные типы: а) потенциально способные творить зло и верящие в силу и значимость добра («потенциально активные»); б) любящие добро и не приемлющие зла («потенциально пассивные»). Предложена теоретическая модель двумерного пространства шкал для характеристики и типологии личности в этической/нравственной психологии, где для построения основной из шкал используются синдромы «некрофилии» и «любви к росту» Э. Фромма. Результаты проведенного нами эмпирического исследования позволяют подвергнуть сомнению однозначность понимания добра и зла как двух полюсов одной шкалы, распространенного в дискурсе, и подтверждают необходимость проблематизации соотношения и взаимосвязи категорий добра и зла в этической психологии.",
    keywords: [
      "психология нравственности",
      "этическая психология",
      "этика",
      "категории добра и зла",
      "типология личностей в нравственной психологии",
      "тёмная триада",
      "светлая триада",
    ],
    pdfs: [
      {
        url: "/documents/research/articles/2024-personality-typology-ethical-psychology.pdf",
        lang: "RU",
      },
    ],
    externalLinks: [
      {
        label: "eLIBRARY",
        url: "https://elibrary.ru/item.asp?id=82424043",
      },
    ],
  },
  {
    slug: "good-evil-self-actualization",
    type: "article",
    title:
      "Представления о добре и зле людей с высокой и низкой самоактуализацией",
    authors: ["А. Ю. Колхонен", "И. А. Мироненко"],
    year: 2025,
    journal: "Вестник Санкт-Петербургского университета. Психология. 2025. Т. 15. Вып. 1",
    seoLead:
      "Сопоставление представлений о добре и зле у людей с разным уровнем самоактуализации и анализ связи ценностных ориентаций с личностной зрелостью.",
    abstract:
      "Сопоставляет представления о добре и зле у людей с разным уровнем самоактуализации, демонстрируя связи ценностных ориентаций и личностной зрелости.",
    pdfs: [
      {
        url: "/documents/research/articles/2025-good-evil-self-actualization_Kolkhonen_Mironenko.pdf",
        lang: "RU",
      },
    ],
    doi: "10.21638/spbu16.2025.108",
  },
  {
    slug: "ethical-representations-dissertation",
    type: "dissertation",
    title: "Взаимосвязь этических представлений и характерологических особенностей личности",
    authors: ["Антон Ю. Колхонен"],
    year: 2025,
    abstract: "",
    keywords: [],
    pdfs: [
      {
        url: "/documents/research/dissertations/Dissertation_Kolkhonen_(RU).pdf",
        lang: "RU",
      },
      {
        url: "/documents/research/dissertations/Dissertation_Kolkhonen_(EN).pdf",
        lang: "EN",
      },
    ],
  },
];

export const publications: Publication[] = await buildPublications();

async function buildPublications(): Promise<Publication[]> {
  if (typeof window !== "undefined") {
    return basePublications;
  }

  const [{ readFile }, { PDFParse }] = await Promise.all([
    import("node:fs/promises"),
    import("pdf-parse"),
  ]);

  const parser = new PDFParse();

  const enriched = await enrichDissertations(basePublications, readFile, parser);

  await parser.destroy();

  return enriched;
}

async function enrichDissertations(
  publications: Publication[],
  readFile: ReadFile,
  parser: PdfParser,
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
          abstract: publication.abstract || "TODO: добавить аннотацию диссертации вручную.",
          keywords: publication.keywords?.length ? publication.keywords : undefined,
          seoLead: publication.seoLead,
        };
      }

      try {
        const pdfText = await parsePdfText(readFile, parser, primaryPdf.url);
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

async function parsePdfText(readFile: ReadFile, parser: PdfParser, pdfUrl: string): Promise<string> {
  const absolutePath = `${process.cwd()}/public/${pdfUrl.replace(/^\//, "")}`;
  const fileBuffer = await readFile(absolutePath);
  const result = await parser.getText({ data: fileBuffer, partial: [1, 2, 3, 4, 5] });

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
