export class TypedFieldDTO {
  id: number;
  type: string;
  points: number;
  fieldId: number;
  constructor(id: number, type: string, points: number, fieldId: number) {
    this.id = id;
    this.type = type;
    this.points = points;
    this.fieldId = fieldId;
  }
}
