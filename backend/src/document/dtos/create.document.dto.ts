export class CreateDocumentDTO {
  type: string;
  path: string;
  userId: number;

  constructor(type: string, path: string, userId: number) {
    this.type = type;
    this.path = path;
    this.userId = userId;
  }
}
