export class CreateSourceabledFieldDTO {
  source: string;
  points: number;
  fieldId: number;
  constructor(source: string, points: number, fieldId: number) {
    this.source = source;
    this.points = points;
    this.fieldId = fieldId;
  }
}
