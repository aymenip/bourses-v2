export class CreateSourceabledFieldDTO {
    source: string;
    fieldId: number;
    constructor(
        source: string,
        fieldId: number,
    ) {
        this.source = source;
        this.fieldId = fieldId;
    }
}