export class CreateThesisDTO {
  documentId: number;
  title: string;
  isSupervisor: boolean;
  isCosupervisor: boolean;
  year: number;
  type: "PhD" | "Master" | "License";

  constructor(
    documentId: number,
    title: string,
    isSupervisor: boolean,
    isCosupervisor: boolean,
    year: number,
    type: "PhD" | "Master" | "License"
  ) {
    this.documentId = documentId;
    this.title = title;
    this.isSupervisor = isSupervisor;
    this.isCosupervisor = isCosupervisor;
    this.year = year;
    this.type = type;
  }
}
