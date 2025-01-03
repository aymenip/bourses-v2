export class UpdateTypedFieldDTO {
  id: number;
  fieldId: number;
  type?: string;
  points?: number;
  constructor(id: number, fieldId: number, type?: string, points?: number) {
    this.id = id;
    this.fieldId = fieldId;
    this.type = type;
    this.points = points;
  }
}
