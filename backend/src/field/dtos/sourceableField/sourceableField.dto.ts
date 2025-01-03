export class SourceabledFieldDTO {
  id: number;
  source: string;
  points: number;
  fieldId: number;
  constructor(id: number, source: string, points: number, fieldId: number) {
    this.id = id;
    this.source = source;
    this.points = points;
    this.fieldId = fieldId;
  }
}
