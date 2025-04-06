export class CertificateDTO {
  id: number;
  documentId: number;
  userId: number;
  title: string;
  issuer: string;
  issueDate: Date;
  expirationDate?: Date;
  certificateId?: string;
  createdAt: Date;
  updatedAt: Date;
  constructor(
    id: number,
    documentId: number,
    userId: number,
    title: string,
    issuer: string,
    issueDate: Date,
    expirationDate: Date,
    certificateId: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.documentId = documentId;
    this.userId = userId;
    this.title = title;
    this.issuer = issuer;
    this.issueDate = issueDate;
    this.expirationDate = expirationDate;
    this.expirationDate = expirationDate;
    this.certificateId = certificateId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
