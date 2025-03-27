export class ThesisDTO {
  id: number;
  documentId: number;
  userId: number;
  title: string;
  isSupervisor: boolean;
  isCosupervisor: boolean;
  year: number;
  type: "PhD" | "Master" | "License";

  constructor(
    id: number,
    documentId: number,
    userId: number,
    title: string,
    isSupervisor: boolean,
    isCosupervisor: boolean,
    year: number,
    type: "PhD" | "Master" | "License"
  ) {
    this.id = id;
    this.documentId = documentId;
    this.userId = userId;
    this.title = title;
    this.isSupervisor = isSupervisor;
    this.isCosupervisor = isCosupervisor;
    this.year = year;
    this.type = type;
  }
}
