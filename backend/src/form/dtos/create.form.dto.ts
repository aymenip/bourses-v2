export class CreateFormDTO {
  title: string;
  id?: number;
  constructor(title: string, id?: number) {
    this.title = title;
    this.id = id;
  }
}
