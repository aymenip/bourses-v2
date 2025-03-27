export class UpdateFormAccessDTO {
  id: number;
  formId?: number;
  positionId?: number;
  constructor(id: number, formId?: number, positionId?: number) {
    this.id = id;
    this.formId = formId;
    this.positionId = positionId;
  }
}
