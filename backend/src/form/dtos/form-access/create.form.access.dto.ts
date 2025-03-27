export class CreateFormAccessDTO {
  formId: number;
  positionId: number[];
  constructor(formId: number, positionId: number[]) {
    this.formId = formId;
    this.positionId = positionId;
  }
}
