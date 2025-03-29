export class CreateThesisDTO {
  documentId: number;
  title: string;
  isSupervisor: boolean;
  year: Date;
  type:
    | "phd"
    | "master"
    | "license"
    | "phd"
    | "master"
    | "license"
    | "phd"
    | "master"
    | "license";

  constructor(
    documentId: number,
    title: string,
    isSupervisor: boolean,
    year: Date,
    type:
      | "phd"
      | "master"
      | "license"
      | "phd"
      | "master"
      | "license"
      | "phd"
      | "master"
      | "license"
  ) {
    this.documentId = documentId;
    this.title = title;
    this.isSupervisor = isSupervisor;
    this.year = year;
    this.type = type;
  }
}
