export class UpdateTypedFieldDTO {
  id: number;
  fieldId: number;
  type?: string;
  label?: string;
  points?: number;
  constructor(
    id: number,
    fieldId: number,
    type?: string,
    label?: string,
    points?: number
  ) {
    this.id = id;
    this.fieldId = fieldId;
    this.type = type;
    this.label = label;
    this.points = points;
  }
}
