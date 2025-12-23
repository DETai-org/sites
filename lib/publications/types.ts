export type PublicationType = "article" | "dissertation" | "thesis";

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
  pdfUrl: string;
  externalLinks?: {
    label: string;
    url: string;
  }[];
}
