export class CreateTypedFieldDTO {
  type: string;
  label: string;
  points: number;
  fieldId: number;
  constructor(type: string, label: string, points: number, fieldId: number) {
    this.type = type;
    this.label = label;
    this.points = points;
    this.fieldId = fieldId;
  }
}
