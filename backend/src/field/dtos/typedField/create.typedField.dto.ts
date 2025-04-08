export class CreateTypedFieldDTO {
  type: string;
  label: string;
  points: number;
  required: boolean;
  blockId: number;
  constructor(type: string, label: string, points: number, required: boolean,blockId: number) {
    this.type = type;
    this.label = label;
    this.points = points;
    this.required = required;
    this.blockId = blockId;
  }
}
