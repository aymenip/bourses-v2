export class SourceabledFieldDTO {
  id: number;
  type: string;
  points: number;
  label: string;
  required: boolean;
  fieldId: number;
  constructor(
    id: number,
    type: string,
    points: number,
    label: string,
    required: boolean,
    fieldId: number
  ) {
    this.id = id;
    this.type = type;
    this.points = points;
    this.label = label;
    this.required = required;
    this.fieldId = fieldId;
  }
}
