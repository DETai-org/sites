export type OgAuthor = {
  name: string;
  url?: string;
};

export type OgInput = {
  title: string;
  description?: string;
  urlPath: string;
  coverImageSrc?: string;
  type?: "article" | "website";
  publishedTime?: string;
  authors?: OgAuthor[];
  locale?: string;
};
