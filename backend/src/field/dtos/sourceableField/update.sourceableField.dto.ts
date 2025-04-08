export class UpdateSourceabledFieldDTO {
  id: number;
  blockId: number;
  type?: string;
  points?: number;
  label?: string;
  required?: boolean;
  constructor(
    id: number,
    blockId: number,
    type?: string,
    points?: number,
    label?: string,
    required?: boolean
  ) {
    this.id = id;
    this.blockId = blockId;
    this.type = type;
    this.points = points;
    this.label = label;
    this.required = required;
  }
}
