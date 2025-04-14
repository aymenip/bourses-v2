export class SourceabledFieldDTO {
  id: number;
  type: string;
  points: number;
  label: string;
  required: boolean;
  blockId: number;
  description?: string;
  constructor(
    id: number,
    type: string,
    points: number,
    label: string,
    required: boolean,
    blockId: number,
    description?: string
  ) {
    this.id = id;
    this.type = type;
    this.points = points;
    this.label = label;
    this.required = required;
    this.blockId = blockId;
    this.description = description;
  }
}
