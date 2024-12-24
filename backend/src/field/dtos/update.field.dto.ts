export class UpdateFieldDTO {
    id: number;
    formId: number;
    label?: string;
    constructor(
        id: number,
        formId: number,
        label?: string,
    ) {
        this.id = id;
        this.formId = formId;
        this.label = label;
    }
}