export class UpdateThesisDTO {
  id: number;
  title?: string;
  isSupervisor?: boolean;
  isCosupervisor?: boolean;
  year?: number;
  type?: "PhD" | "Master" | "License";
  constructor(
    id: number,
    title: string,
    isSupervisor: boolean,
    isCosupervisor: boolean,
    year: number,
    type: "PhD" | "Master" | "License"
  ) {
    this.id = id;
    this.title = title;
    this.isSupervisor = isSupervisor;
    this.isCosupervisor = isCosupervisor;
    this.year = year;
    this.type = type;
  }
}
