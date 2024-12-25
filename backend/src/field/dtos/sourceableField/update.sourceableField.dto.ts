export class UpdateSourceabledFieldDTO {
    id: number;
    source?: string;
    documentId?: number;
    fieldId?: number;
    constructor(
        id: number,
        source?: string,
        documentId?: number,
        fieldId?: number,
    ) {
        this.id = id;
        this.source = source;
        this.documentId = documentId;
        this.fieldId = fieldId;
    }
}