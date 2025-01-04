export class SourceabledFieldDTO {
  id: number;
  source: string;
  points: number;
  label: string;
  fieldId: number;
  constructor(
    id: number,
    source: string,
    points: number,
    label: string,
    fieldId: number
  ) {
    this.id = id;
    this.source = source;
    this.points = points;
    this.label = label;
    this.fieldId = fieldId;
  }
}
