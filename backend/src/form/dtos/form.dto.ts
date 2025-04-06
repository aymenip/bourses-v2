import { FullFormBlockDTO } from "field/dtos/field.dto";

export class FormDTO {
  id: number;
  title: string;
  creator: number;
  constructor(id: number, title: string, creator: number) {
    this.id = id;
    this.title = title;
    this.creator = creator;
  }
}

export class FullFormDTO {
  id: number;
  title: string;
  creator: number;
  blocks: FullFormBlockDTO[];
  constructor(
    id: number,
    title: string,
    creator: number,
    blocks: FullFormBlockDTO[]
  ) {
    this.id = id;
    this.title = title;
    this.creator = creator;
    this.blocks = blocks;
  }
}
