export class CreateTypedFieldDTO {
    type: string;
    fieldId: number;
    constructor(
        type: string,
        fieldId: number,
    ) {
        this.type = type;
        this.fieldId = fieldId;
    }
}