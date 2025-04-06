export class UpdateTypedFieldDTO {
  id: number;
  fieldId: number;
  type?: string;
  label?: string;
  points?: number;
  required?: boolean;
  constructor(
    id: number,
    fieldId: number,
    type?: string,
    label?: string,
    points?: number,
    required?: boolean
  ) {
    this.id = id;
    this.fieldId = fieldId;
    this.type = type;
    this.label = label;
    this.points = points;
    this.required = required;
  }
}
