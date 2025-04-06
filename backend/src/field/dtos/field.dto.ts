import { SourceabledFieldDTO } from "./sourceableField";
import { TypedFieldDTO } from "./typedField";

export class FieldDTO {
  id: number;
  label: string;
  formId: number;
  constructor(id: number, label: string, formId: number) {
    this.id = id;
    this.label = label;
    this.formId = formId;
  }
}

export class FullFormBlockDTO {
  id: number;
  label: string;
  formId: number;
  fields?: [TypedFieldDTO | SourceabledFieldDTO][];
  constructor(
    id: number,
    label: string,
    formId: number,
    fields?: [TypedFieldDTO | SourceabledFieldDTO][]
  ) {
    this.id = id;
    this.label = label;
    this.formId = formId;
    this.fields = fields;
  }
}
