export class CreateSourceabledFieldDTO {
  source: string;
  points: number;
  label: string;
  fieldId: number;
  constructor(source: string, points: number, label: string, fieldId: number) {
    this.source = source;
    this.points = points;
    this.label = label;
    this.fieldId = fieldId;
  }
}
