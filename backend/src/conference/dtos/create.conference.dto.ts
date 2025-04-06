import { Classification } from "articles/article.enums";

export class CreateConferenceDTO {
  documentId: number;
  userId: number;
  title: string;
  conferenceName: string;
  location: string;
  date: Date;
  classification: Classification;
  constructor(
    documentId: number,
    userId: number,
    title: string,
    conferenceName: string,
    location: string,
    date: Date,
    classification: Classification,
  ) {
    this.documentId = documentId;
    this.userId = userId;
    this.title = title;
    this.conferenceName = conferenceName;
    this.location = location;
    this.date = date;
    this.classification = classification;
  }
}
