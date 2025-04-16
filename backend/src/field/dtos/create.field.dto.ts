export class CreateFieldDTO {
    label: string;
    formId: number;
    constructor(
        label: string,
        formId: number,
    ) {
        this.label = label;
        this.formId = formId;
    }
}