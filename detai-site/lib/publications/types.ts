export type PublicationType = "article" | "dissertation" | "thesis";

export type PublicationPdfLanguage = "RU" | "EN";

export interface PublicationPdf {
  url: string;
  lang: PublicationPdfLanguage;
}

export interface Publication {
  slug: string;
  type: PublicationType;
  title: string;
  authors: string[];
  year: number;
  journal?: string;
  seoLead?: string;
  abstract: string;
  keywords?: string[];
  citation?: {
    apa?: string;
    gost?: string;
  };
  doi?: string;
  pdfs: PublicationPdf[];
  externalLinks?: {
    label: string;
    url: string;
  }[];
}
