export class SourceabledFieldDTO {
  id: number;
  type: string;
  points: number;
  label: string;
  fieldId: number;
  constructor(
    id: number,
    type: string,
    points: number,
    label: string,
    fieldId: number
  ) {
    this.id = id;
    this.type = type;
    this.points = points;
    this.label = label;
    this.fieldId = fieldId;
  }
}
