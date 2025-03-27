export class RoleDTO {
  id: number;
  code: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  constructor(
    id: number,
    code: string,
    title: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.code = code;
    this.title = title;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
