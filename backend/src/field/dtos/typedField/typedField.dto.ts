export class TypedFieldDTO {
  id: number;
  type: string;
  label: string;
  points: number;
  required: boolean;
  blockId: number;
  constructor(
    id: number,
    type: string,
    label: string,
    points: number,
    required: boolean,
    blockId: number
  ) {
    this.id = id;
    this.type = type;
    this.label = label;
    this.points = points;
    this.required = required;
    this.blockId = blockId;
  }
}
