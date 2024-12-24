export class CreateTypedFieldDTO {
    type: string;
    value: string;
    fieldId: number;
    constructor(
        type: string,
        value: string,
        fieldId: number,
    ) {
        this.type = type;
        this.value = value;
        this.fieldId = fieldId;
    }
}