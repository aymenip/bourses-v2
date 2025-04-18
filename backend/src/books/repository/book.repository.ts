import { db } from "../../db/setup";
import { documents, books } from "../../db/schema";
import { CreateBookDTO, BookDTO, UpdateBookDTO } from "../dtos";
import { eq } from "drizzle-orm";
import { deleteDocument } from "../../utils/uploads";

export const createBook = async (
  createBookDTO: CreateBookDTO,
  userId: number
): Promise<CreateBookDTO> => {
  try {
    const dbInstance = await db;
    const result = await dbInstance
      .insert(books)
      .values({ ...createBookDTO, userId })
      .execute();
    const book = await getBookById(result[0].insertId);
    return book;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create Book"); // Handle errors appropriately
  }
};

export const updateBook = async (
  updateBookDTO: UpdateBookDTO
): Promise<CreateBookDTO> => {
  try {
    const dbInstance = await db;
    const result = await dbInstance
      .update(books)
      .set(updateBookDTO)
      .where(eq(books.id, updateBookDTO.id))
      .execute();
    const thesis = await getBookById(result[0].insertId);
    return thesis;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create Book"); // Handle errors appropriately
  }
};

export const getAllBooksForUser = async (
  userId: number
): Promise<BookDTO[]> => {
  try {
    const dbInstance = await db;
    const result = await dbInstance
      .select()
      .from(books)
      .where(eq(books.userId, userId))
      .execute();
    const _books: BookDTO[] = result;
    // Return the first role or null if none found
    return result || [];
  } catch (error) {
    return null; // Handle errors appropriately
  }
};

export const getAllBooks = async (): Promise<BookDTO[]> => {
  try {
    const dbInstance = await db;
    const result = await dbInstance.select().from(books);

    // Return the first role or null if none found
    return result || [];
  } catch (error) {
    return null; // Handle errors appropriately
  }
};

export const getBookById = async (id: number): Promise<BookDTO | null> => {
  try {
    const dbInstance = await db;
    const result = await dbInstance
      .select()
      .from(books)
      .where(eq(books.id, id))
      .execute();
    // Return the first user or null if none found
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    throw new Error("Failed to get Book"); // Handle errors appropriately
  }
};
export const deleteBook = async (id: number): Promise<void> => {
  try {
    const dbInstance = await db;
    const deletedBook = await getBookById(id);
    await dbInstance.delete(books).where(eq(books.id, id)).execute();

    try {
      // delete the document from the documents table
      const document = await dbInstance
        .select({
          path: documents.path,
        })
        .from(documents)
        .where(eq(documents.id, deletedBook.documentId))
        .limit(1)
        .execute();

      await dbInstance
        .delete(documents)
        .where(eq(documents.id, deletedBook.documentId))
        .then(async () => {
          deleteDocument(document[0].path);
        });
    } catch (error) {
      throw new Error("Failed to delete Book"); // Handle errors appropriately
    }

    return;
  } catch (error) {
    throw new Error("Failed to delete Book"); // Handle errors appropriately
  }
};
