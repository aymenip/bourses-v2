export class TypedFieldDTO {
    id: number;
    type: string;
    value: string;
    fieldId: number;
    constructor(
        id: number,
        type: string,
        value: string,
        fieldId: number,
    ) {
        this.id = id;
        this.type = type;
        this.value = value;
        this.fieldId = fieldId;
    }
}