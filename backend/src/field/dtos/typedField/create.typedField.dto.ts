export class CreateTypedFieldDTO {
  type: string;
  label: string;
  points: number;
  required: boolean;
  blockId: number;
  choices?: any[];
  description?: string;
  constructor(
    type: string,
    label: string,
    points: number,
    required: boolean,
    blockId: number,
    choices?: any[],
    description?: string
  ) {
    this.type = type;
    this.label = label;
    this.points = points;
    this.required = required;
    this.blockId = blockId;
    this.choices = choices;
    this.description = description;
  }
}
