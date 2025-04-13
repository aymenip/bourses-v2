import express from "express";

import { handleError } from "../../utils/errors";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getAllBooksForUser,
  getBookById,
  updateBook,
} from "../repository/book.repository";
import { CreateBookDTO, UpdateBookDTO } from "../dtos";

export const CreateBook = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const createBookDTO: CreateBookDTO = req.body;

    const userId = req.user?.sub;
    if (!createBookDTO) {
      return res.sendStatus(400);
    }

    const createdBook = await createBook(createBookDTO, userId);

    return res.status(200).json(createdBook);
  } catch (error) {
    handleError(() => console.log(error));
    return res.sendStatus(400);
  }
};

export const UpdateBook = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const updateBookDTO: UpdateBookDTO = req.body;

    const userId = req.user?.sub;

    if (!updateBookDTO) return res.sendStatus(400);

    const book = await getBookById(updateBookDTO.id);

    if (!book) return res.sendStatus(400);

    if (book.userId !== userId) return res.sendStatus(404);

    const updatedBook = await updateBook(updateBookDTO);

    return res.status(200).json(updatedBook);
  } catch (error) {
    handleError(() => console.log(error));
    return res.sendStatus(400);
  }
};

export const GetAllBooksForUser = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const userId = req.user?.sub;

    const books = await getAllBooksForUser(userId);

    return res.status(200).json(books);
  } catch (error) {
    handleError(() => console.log(error));
    return res.sendStatus(400);
  }
};

export const GetBookById = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const userId = req.user?.sub;
    const { id } = req.params;
    const isAdmin = req.user.isAdmin;
    const book = await getBookById(parseInt(id));
    if (book.userId !== userId && !isAdmin) return res.status(401);
    return res.status(200).json(book);
  } catch (error) {
    handleError(() => console.log(error));
    return res.sendStatus(400);
  }
};

export const GetAllBooks = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const books = await getAllBooks();

    return res.status(200).json(books);
  } catch (error) {
    handleError(() => console.log(error));
    return res.sendStatus(400);
  }
};

export const DeleteBook = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const userId = req.user.sub;
    const book = await getBookById(Number(id));
    if (book.userId !== userId)
      return res.status(401).json({ message: "Unauthorized" });
    await deleteBook(Number(id));
    return res.status(204).json({ message: "Book deleted" });
  } catch (error) {
    console.error("GetBookById Error:", error);
    return res.status(500).json({ message: "Failed to fetch books" });
  }
};
