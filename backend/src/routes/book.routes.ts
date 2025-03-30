import express from "express";
import {
  CreateBook,
  DeleteBook,
  GetAllBooks,
  GetAllBooksForUser,
  UpdateBook,
} from "../books/controller/book.controller";
import { isAdmin, verifyToken } from "../middlewares/auth.middleware";

export default (router: express.Router) => {
  router.post("/book/create", verifyToken, CreateBook);
  router.put("/book/update", verifyToken, UpdateBook);
  router.get("/book/user", verifyToken, GetAllBooksForUser);
  router.delete("/book/:id", verifyToken, DeleteBook);
  router.get("/book/all", verifyToken, isAdmin, GetAllBooks);
};
