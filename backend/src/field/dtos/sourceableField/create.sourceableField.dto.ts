export class CreateSourceabledFieldDTO {
  type: string;
  points: number;
  label: string;
  required: boolean;
  blockId: number;
  description?: string;
  constructor(
    type: string,
    points: number,
    label: string,
    required: boolean,
    blockId: number,
    description?: string
  ) {
    this.type = type;
    this.points = points;
    this.label = label;
    this.required = required;
    this.blockId = blockId;
    this.description = description;
  }
}
