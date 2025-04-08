export class CreateSourceabledFieldDTO {
  type: string;
  points: number;
  label: string;
  required: boolean;
  blockId: number;
  constructor(
    type: string,
    points: number,
    label: string,
    required: boolean,
    blockId: number
  ) {
    this.type = type;
    this.points = points;
    this.label = label;
    this.required = required;
    this.blockId = blockId;
  }
}
