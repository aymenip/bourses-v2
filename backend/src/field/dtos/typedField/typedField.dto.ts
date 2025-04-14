export class TypedFieldDTO {
  id: number;
  type: string;
  label: string;
  points: number;
  required: boolean;
  blockId: number;
  choices?: any[];
  description?: string;
  constructor(
    id: number,
    type: string,
    label: string,
    points: number,
    required: boolean,
    blockId: number,
    choices?: any[],
    description?: string
  ) {
    this.id = id;
    this.type = type;
    this.label = label;
    this.points = points;
    this.required = required;
    this.blockId = blockId;
    this.choices = choices;
    this.description = description;
  }
}
