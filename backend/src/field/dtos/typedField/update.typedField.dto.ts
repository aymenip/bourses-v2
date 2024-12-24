export class UpdateTypedFieldDTO {
    id: number;
    fieldId: number;
    type?: string;
    value?: string;
    constructor(
        id: number,
        fieldId: number,
        type?: string,
        value?: string,
    ) {
        this.id = id;
        this.fieldId = fieldId;
        this.type = type;
        this.value = value;
    }
}