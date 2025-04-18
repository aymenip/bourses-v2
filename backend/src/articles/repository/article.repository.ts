import { db } from "../../db/setup";
import { documents, articles } from "../../db/schema";
import { CreateArticleDTO, ArticleDTO, UpdateArticleDTO } from "../dtos";
import { eq } from "drizzle-orm";
import { deleteDocument } from "../../utils/uploads";
import { Classification } from "articles/article.enums";

export const createArticle = async (
  createArticleDTO: CreateArticleDTO,
  userId: number
): Promise<CreateArticleDTO> => {
  try {
    const dbInstance = await db;
    const result = await dbInstance
      .insert(articles)
      .values({ ...createArticleDTO, userId })
      .execute();
    const book = await getArticleById(result[0].insertId);
    return book;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create Article"); // Handle errors appropriately
  }
};

export const updateArticle = async (
  updateArticleDTO: UpdateArticleDTO
): Promise<CreateArticleDTO> => {
  try {
    const dbInstance = await db;
    const result = await dbInstance
      .update(articles)
      .set(updateArticleDTO)
      .where(eq(articles.id, updateArticleDTO.id))
      .execute();
    const thesis = await getArticleById(result[0].insertId);
    return thesis;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update Article"); // Handle errors appropriately
  }
};

export const getAllArticlesForUser = async (
  userId: number
): Promise<ArticleDTO[]> => {
  try {
    const dbInstance = await db;
    const result = await dbInstance
      .select()
      .from(articles)
      .where(eq(articles.userId, userId))
      .execute();
    const _articles: ArticleDTO[] = result.map((article) => ({
      ...article,
      classification: article.classification as Classification,
    }));
    // Return the first role or null if none found
    return _articles || [];
  } catch (error) {
    return null; // Handle errors appropriately
  }
};

export const getAllArticles = async (): Promise<ArticleDTO[]> => {
  try {
    const dbInstance = await db;
    const result = await dbInstance.select().from(articles);
    const _articles: ArticleDTO[] = result.map((article) => ({
      ...article,
      classification: article.classification as Classification,
    }));
    // Return the first role or null if none found
    return _articles || [];
  } catch (error) {
    return null; // Handle errors appropriately
  }
};

export const getArticleById = async (
  id: number
): Promise<ArticleDTO | null> => {
  try {
    const dbInstance = await db;
    const result = await dbInstance
      .select()
      .from(articles)
      .where(eq(articles.id, id))
      .execute();
    // Return the first user or null if none found
    return result.length > 0
      ? {
          ...result[0],
          classification: result[0].classification as Classification,
        }
      : null;
  } catch (error) {
    throw new Error("Failed to get Article"); // Handle errors appropriately
  }
};
export const deleteArticle = async (id: number): Promise<void> => {
  try {
    const dbInstance = await db;
    const deletedArticle = await getArticleById(id);
    await dbInstance.delete(articles).where(eq(articles.id, id)).execute();

    try {
      // delete the document from the documents table
      const document = await dbInstance
        .select({
          path: documents.path,
        })
        .from(documents)
        .where(eq(documents.id, deletedArticle.documentId))
        .limit(1)
        .execute();

      await dbInstance
        .delete(documents)
        .where(eq(documents.id, deletedArticle.documentId))
        .then(async () => {
          deleteDocument(document[0].path);
        });
    } catch (error) {
      throw new Error("Failed to delete Article"); // Handle errors appropriately
    }

    return;
  } catch (error) {
    throw new Error("Failed to delete Article"); // Handle errors appropriately
  }
};
