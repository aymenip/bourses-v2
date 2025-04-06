import { Classification } from "articles/article.enums";

export class UpdateArticleDTO {
  id: number;
  title?: string;
  authors?: string;
  journal: string;
  volume?: string;
  issue?: string;
  pages?: string;
  publicationDate?: Date;
  doi?: string;
  classification?: Classification;
  constructor(
    title: string,
    authors: string,
    journal: string,
    volume: string,
    issue: string,
    pages: string,
    publicationDate: Date,
    doi: string,
    classification: Classification
  ) {
    this.title = title;
    this.authors = authors;
    this.journal = journal;
    this.volume = volume;
    this.issue = issue;
    this.pages = pages;
    this.publicationDate = publicationDate;
    this.doi = doi;
    this.classification = classification;
  }
}
