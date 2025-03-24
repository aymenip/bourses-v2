export class CreateSourceabledFieldDTO {
  type: string;
  points: number;
  label: string;
  fieldId: number;
  constructor(type: string, points: number, label: string, fieldId: number) {
    this.type = type;
    this.points = points;
    this.label = label;
    this.fieldId = fieldId;
  }
}
