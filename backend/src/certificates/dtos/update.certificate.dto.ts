export class UpdateCertificateDTO {
  id: number;
  title?: string;
  issuer?: string;
  issueDate?: Date;
  expirationDate?: Date;
  certificateId?: string;
  constructor(
    id: number,
    title: string,
    issuer: string,
    issueDate: Date,
    expirationDate: Date,
    certificateId: string
  ) {
    this.id = id;
    this.title = title;
    this.issuer = issuer;
    this.issueDate = issueDate;
    this.expirationDate = expirationDate;
    this.certificateId = certificateId;
  }
}
