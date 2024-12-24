export class CreateFieldDTO {
    label: string;
    formId: number;
    constructor(
        title: string,
        formId: number,
    ) {
        this.label = title;
        this.formId = formId;
    }
}