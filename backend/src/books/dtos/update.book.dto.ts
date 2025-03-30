export class UpdateBookDTO {
  id: number;
  title?: string;
  author?: string;
  year?: Date;
  isbn?: string;
  publisher?: string;

  constructor(
    id: number,
    title: string,
    author: string,
    year: Date,
    isbn: string,
    publisher: string
  ) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.year = year;
    this.isbn = isbn;
    this.publisher = publisher;
  }
}
