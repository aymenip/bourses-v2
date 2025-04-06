export class UpdateSourceabledFieldDTO {
  id: number;
  fieldId: number;
  type?: string;
  points?: number;
  label?: string;
  required?: boolean;
  constructor(
    id: number,
    fieldId: number,
    type?: string,
    points?: number,
    label?: string,
    required?: boolean
  ) {
    this.id = id;
    this.fieldId = fieldId;
    this.type = type;
    this.points = points;
    this.label = label;
    this.required = required;
  }
}
