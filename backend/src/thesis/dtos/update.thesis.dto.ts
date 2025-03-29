export class UpdateThesisDTO {
  id: number;
  title?: string;
  isSupervisor?: boolean;
  year?: Date;
  type?:
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
    this.title = title;
    this.isSupervisor = isSupervisor;
    this.year = year;
    this.type = type;
  }
}
