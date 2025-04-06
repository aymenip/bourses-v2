import { Classification } from "articles/article.enums";

export class ConferenceDTO {
  id: number;
  documentId: number;
  userId: number;
  title: string;
  conferenceName: string;
  location: string;
  date: Date;
  classification: Classification;
  createdAt: Date;
  updatedAt: Date;
  constructor(
    id: number,
    documentId: number,
    userId: number,
    title: string,
    conferenceName: string,
    location: string,
    date: Date,
    classification: Classification,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.documentId = documentId;
    this.userId = userId;
    this.title = title;
    this.conferenceName = conferenceName;
    this.location = location;
    this.date = date;
    this.classification = classification;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
