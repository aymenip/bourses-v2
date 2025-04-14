export class UpdateTypedFieldDTO {
  id: number;
  blockId: number;
  type?: string;
  label?: string;
  points?: number;
  required?: boolean;
  choices?: any[];
  description?: string;
  constructor(
    id: number,
    blockId: number,
    type?: string,
    label?: string,
    points?: number,
    required?: boolean,
    choices?: any[],
    description?: string
  ) {
    this.id = id;
    this.blockId = blockId;
    this.type = type;
    this.label = label;
    this.points = points;
    this.required = required;
    this.choices = choices;
    this.description = description;
  }
}
