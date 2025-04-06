export class CreateSourceabledFieldDTO {
  type: string;
  points: number;
  label: string;
  required: boolean;
  fieldId: number;
  constructor(
    type: string,
    points: number,
    label: string,
    required: boolean,
    fieldId: number
  ) {
    this.type = type;
    this.points = points;
    this.label = label;
    this.required = required;
    this.fieldId = fieldId;
  }
}
