export class BookDTO {
  id: number;
  documentId: number;
  userId: number;
  title: string;
  author: string;
  year: Date;
  isbn: string;
  publisher: string;
  createdAt: Date;
  updatedAt: Date;
  constructor(
    id: number,
    documentId: number,
    userId: number,
    title: string,
    author: string,
    year: Date,
    isbn: string,
    publisher: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.documentId = documentId;
    this.userId = userId;
    this.title = title;
    this.author = author;
    this.year = year;
    this.isbn = isbn;
    this.publisher = publisher;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
