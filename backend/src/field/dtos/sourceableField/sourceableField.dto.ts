export class SourceabledFieldDTO {
    id: number;
    source: string;
    fieldId: number;
    constructor(
        id: number,
        source: string,
        fieldId: number,
    ) {
        this.id = id;
        this.source = source;
        this.fieldId = fieldId;
    }
}