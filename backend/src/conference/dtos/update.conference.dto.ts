import { Classification } from "articles/article.enums";

export class UpdateConferenceDTO {
  id: number;
  title?: string;
  conferenceName?: string;
  location?: string;
  date?: Date;
  classification?: Classification;
  constructor(
    id: number,
    title: string,
    conferenceName: string,
    location: string,
    date: Date,
    classification: Classification
  ) {
    this.id = id;
    this.title = title;
    this.conferenceName = conferenceName;
    this.location = location;
    this.date = date;
    this.classification = classification;
  }
}
