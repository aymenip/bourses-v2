export class CreateSourceabledFieldDTO {
    source: string;
    documentId: number;
    fieldId: number;
    constructor(
        source: string,
        documentId: number,
        fieldId: number,
    ) {
        this.source = source;
        this.documentId = documentId;
        this.fieldId = fieldId;
    }
}