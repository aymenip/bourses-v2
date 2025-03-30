export class CreateBookDTO {
  documentId: number;
  title: string;
  author: string;
  year: Date;
  isbn: string;
  publisher: string;
  constructor(
    documentId: number,
    title: string,
    author: string,
    year: Date,
    isbn: string,
    publisher: string,
  ) {
    this.documentId = documentId;
    this.title = title;
    this.author = author;
    this.year = year;
    this.isbn = isbn;
    this.publisher = publisher;
  }
}
