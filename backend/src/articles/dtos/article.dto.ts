import { Classification } from "articles/article.enums";

export class ArticleDTO {
  id: number;
  documentId: number;
  userId: number;
  title: string;
  authors: string;
  journal: string;
  volume: string;
  issue: string;
  pages: string;
  publicationDate: Date;
  doi: string;
  classification: Classification;
  createdAt: Date;
  updatedAt: Date;
  constructor(
    id: number,
    documentId: number,
    userId: number,
    title: string,
    authors: string,
    journal: string,
    volume: string,
    issue: string,
    pages: string,
    publicationDate: Date,
    doi: string,
    classification: Classification,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.documentId = documentId;
    this.userId = userId;
    this.title = title;
    this.authors = authors;
    this.journal = journal;
    this.volume = volume;
    this.issue = issue;
    this.pages = pages;
    this.publicationDate = publicationDate;
    this.doi = doi;
    this.classification = classification;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
