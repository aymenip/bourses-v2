export class UpdateTypedFieldDTO {
  id: number;
  fieldId: number;
  type?: string;
  constructor(id: number, fieldId: number, type?: string) {
    this.id = id;
    this.fieldId = fieldId;
    this.type = type;
  }
}
