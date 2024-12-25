export class TypedFieldDTO {
    id: number;
    type: string;
    fieldId: number;
    constructor(
        id: number,
        type: string,
        fieldId: number,
    ) {
        this.id = id;
        this.type = type;
        this.fieldId = fieldId;
    }
}