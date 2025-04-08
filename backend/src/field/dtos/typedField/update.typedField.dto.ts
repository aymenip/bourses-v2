export class UpdateTypedFieldDTO {
  id: number;
  blockId: number;
  type?: string;
  label?: string;
  points?: number;
  required?: boolean;
  constructor(
    id: number,
    blockId: number,
    type?: string,
    label?: string,
    points?: number,
    required?: boolean
  ) {
    this.id = id;
    this.blockId = blockId;
    this.type = type;
    this.label = label;
    this.points = points;
    this.required = required;
  }
}
