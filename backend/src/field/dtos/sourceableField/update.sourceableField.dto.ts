export class UpdateSourceabledFieldDTO {
  id: number;
  blockId: number;
  type?: string;
  points?: number;
  label?: string;
  required?: boolean;
  description?: string;
  constructor(
    id: number,
    blockId: number,
    type?: string,
    points?: number,
    label?: string,
    required?: boolean,
    description?: string
  ) {
    this.id = id;
    this.blockId = blockId;
    this.type = type;
    this.points = points;
    this.label = label;
    this.required = required;
    this.description = description;
  }
}
