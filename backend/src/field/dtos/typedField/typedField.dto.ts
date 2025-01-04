export class TypedFieldDTO {
  id: number;
  type: string;
  label: string;
  points: number;
  fieldId: number;
  constructor(
    id: number,
    type: string,
    label: string,
    points: number,
    fieldId: number
  ) {
    this.id = id;
    this.type = type;
    this.label = label;
    this.points = points;
    this.fieldId = fieldId;
  }
}
