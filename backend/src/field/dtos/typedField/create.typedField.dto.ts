export class CreateTypedFieldDTO {
  type: string;
  points: number;
  fieldId: number;
  constructor(type: string, points: number, fieldId: number) {
    this.type = type;
    this.points = points;
    this.fieldId = fieldId;
  }
}
