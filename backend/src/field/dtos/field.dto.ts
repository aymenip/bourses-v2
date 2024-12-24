export class FieldDTO {
    id: number;
    label: string;
    formId: number;
    constructor(
        id: number,
        label: string,
        formId: number,
    ) {
        this.id = id;
        this.label = label;
        this.formId = formId;
    }
}