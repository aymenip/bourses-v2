import { db } from "../../db/setup"; // Database instance
import { eq } from "drizzle-orm";
import { CreateDocumentDTO, DocumentDTO } from "../dtos";
import { documents } from "../../db/schema";

export const createDocument = async (
  createDocumentDTO: CreateDocumentDTO
): Promise<DocumentDTO> => {
  try {
    const dbInstance = await db;
    const result = await dbInstance
      .insert(documents)
      .values(createDocumentDTO)
      .execute();

    const insertedId = result[0].insertId;

    return getDocumentById(insertedId);
  } catch (error) {
    console.error("Error creating document:", error);
    throw new Error("Failed to create document");
  }
};

export const getDocumentById = async (
  id: number
): Promise<DocumentDTO | null> => {
  try {
    const dbInstance = await db;
    const result = await dbInstance
      .select()
      .from(documents)
      .where(eq(documents.id, id))
      .execute();

    if (result.length === 0) return null;

    const doc = result[0];
    return new DocumentDTO(
      doc.id,
      doc.type,
      doc.path,
      doc.userId,
      doc.createdAt,
      doc.updatedAt
    );
  } catch (error) {
    console.error("Error fetching document:", error);
    throw new Error("Failed to fetch document");
  }
};

export const deleteDocument = async (id: number): Promise<void> => {
  try {
    const dbInstance = await db;
    await dbInstance.delete(documents).where(eq(documents.id, id));
  } catch (error) {
    console.error("Error deleting document:", error);
    throw new Error("Failed to delete document");
  }
};
