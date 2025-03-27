export class DocumentDTO {
  id: number;
  type: string;
  path: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number,
    type: string,
    path: string,
    userId: number,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.type = type;
    this.path = path;
    this.userId = userId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
