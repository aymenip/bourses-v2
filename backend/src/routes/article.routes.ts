import express from "express";
import {
  CreateArticle,
  DeleteArticle,
  GetAllArticles,
  GetAllArticlesForUser,
  GetArticleById,
  UpdateArticle,
} from "../articles/controller/article.controller";
import { isAdmin, verifyToken } from "../middlewares/auth.middleware";

export default (router: express.Router) => {
  router.post("/article/create", verifyToken, CreateArticle);
  router.put("/article/update", verifyToken, UpdateArticle);
  router.get("/article/user", verifyToken, GetAllArticlesForUser);
  router.delete("/article/:id", verifyToken, DeleteArticle);
  router.get("/article/all", verifyToken, isAdmin, GetAllArticles);
  router.get("/article/:id", verifyToken, GetArticleById);
};
