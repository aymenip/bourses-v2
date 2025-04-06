export class CreateCertificateDTO {
  id: number;
  documentId: number;
  title: string;
  issuer: string;
  issueDate: Date;
  expirationDate?: Date;
  certificateId?: string;
  constructor(
    id: number,
    documentId: number,
    title: string,
    issuer: string,
    issueDate: Date,
    expirationDate: Date,
    certificateId: string
  ) {
    this.id = id;
    this.documentId = documentId;
    this.title = title;
    this.issuer = issuer;
    this.issueDate = issueDate;
    this.expirationDate = expirationDate;
    this.expirationDate = expirationDate;
    this.certificateId = certificateId;
  }
}
