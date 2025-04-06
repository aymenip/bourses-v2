export class CreateTypedFieldDTO {
  type: string;
  label: string;
  points: number;
  required: boolean;
  fieldId: number;
  constructor(type: string, label: string, points: number, required: boolean,fieldId: number) {
    this.type = type;
    this.label = label;
    this.points = points;
    this.required = required;
    this.fieldId = fieldId;
  }
}
