export class ThesisDTO {
  id: number;
  documentId: number;
  userId: number;
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
    id: number,
    documentId: number,
    userId: number,
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
    this.id = id;
    this.documentId = documentId;
    this.userId = userId;
    this.title = title;
    this.isSupervisor = isSupervisor;
    this.year = year;
    this.type = type;
  }
}
