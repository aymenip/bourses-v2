import express from "express";

import { handleError } from "../../utils/errors";
import {
  createArticle,
  deleteArticle,
  getAllArticles,
  getAllArticlesForUser,
  getArticleById,
  updateArticle,
} from "../repository/article.repository";
import { CreateArticleDTO, UpdateArticleDTO } from "../dtos";

export const CreateArticle = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const createArticleDTO: CreateArticleDTO = req.body;
    const userId = req.user?.sub;
    if (!createArticleDTO) {
      return res.sendStatus(400);
    }

    const createdArticle = await createArticle(createArticleDTO, userId);

    return res.status(200).json(createdArticle);
  } catch (error) {
    handleError(() => console.log(error));
    return res.sendStatus(400);
  }
};

export const UpdateArticle = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const updateArticleDTO: UpdateArticleDTO = req.body;

    const userId = req.user?.sub;

    if (!updateArticleDTO) return res.sendStatus(400);

    const book = await getArticleById(updateArticleDTO.id);

    if (!book) return res.sendStatus(400);

    if (book.userId !== userId) return res.sendStatus(404);

    const updatedArticle = await updateArticle(updateArticleDTO);

    return res.status(200).json(updatedArticle);
  } catch (error) {
    handleError(() => console.log(error));
    return res.sendStatus(400);
  }
};

export const GetAllArticlesForUser = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const userId = req.user?.sub;

    const articles = await getAllArticlesForUser(userId);

    return res.status(200).json(articles);
  } catch (error) {
    handleError(() => console.log(error));
    return res.sendStatus(400);
  }
};

export const GetAllArticles = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const articles = await getAllArticles();

    return res.status(200).json(articles);
  } catch (error) {
    handleError(() => console.log(error));
    return res.sendStatus(400);
  }
};

export const DeleteArticle = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const userId = req.user.sub;
    
    const book = await getArticleById(Number(id));
    if (book.userId !== userId)
      return res.status(401).json({ message: "Unauthorized" });
    await deleteArticle(Number(id));
    return res.status(204).json({ message: "Article deleted" });
  } catch (error) {
    console.error("GetArticleById Error:", error);
    return res.status(500).json({ message: "Failed to fetch articles" });
  }
};
