import { db } from "../../conference/db/setup";
import { documents, theses } from "../../conference/db/schema";
import { CreateThesisDTO, ThesisDTO, UpdateThesisDTO } from "../dtos";
import { eq } from "drizzle-orm";
import { deleteDocument } from "../../utils/uploads";

export const createThesis = async (
  createThesisDTO: CreateThesisDTO,
  userId: number
): Promise<CreateThesisDTO> => {
  try {
    const dbInstance = await db;
    const result = await dbInstance
      .insert(theses)
      .values({ ...createThesisDTO, userId })
      .execute();
    const thesis = await getThesisById(result[0].insertId);
    return thesis;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create Role"); // Handle errors appropriately
  }
};

export const updateThesis = async (
  updateThesisDTO: UpdateThesisDTO
): Promise<CreateThesisDTO> => {
  try {
    const dbInstance = await db;
    const result = await dbInstance
      .update(theses)
      .set(updateThesisDTO)
      .where(eq(theses.id, updateThesisDTO.id))
      .execute();
    const thesis = await getThesisById(result[0].insertId);
    return thesis;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create Role"); // Handle errors appropriately
  }
};

export const getAllThesesForUser = async (
  userId: number
): Promise<ThesisDTO[]> => {
  try {
    const dbInstance = await db;
    const result = await dbInstance
      .select()
      .from(theses)
      .where(eq(theses.userId, userId))
      .execute();

    // Return the first role or null if none found
    return (
      result?.map(
        (thesis) =>
          new ThesisDTO(
            thesis.id,
            thesis.documentId,
            userId,
            thesis.title,
            thesis.isSupervisor,
            thesis.year,
            thesis.type
          )
      ) || []
    );
  } catch (error) {
    return null; // Handle errors appropriately
  }
};

export const getAllTheses = async (): Promise<ThesisDTO[]> => {
  try {
    const dbInstance = await db;
    const result = await dbInstance.select().from(theses);

    // Return the first role or null if none found
    return (
      result?.map(
        (thesis) =>
          new ThesisDTO(
            thesis.id,
            thesis.documentId,
            thesis.userId,
            thesis.title,
            thesis.isSupervisor,
            thesis.year,
            thesis.type
          )
      ) || []
    );
  } catch (error) {
    return null; // Handle errors appropriately
  }
};

export const getThesisById = async (id: number): Promise<ThesisDTO | null> => {
  try {
    const dbInstance = await db;
    const result = await dbInstance
      .select()
      .from(theses)
      .where(eq(theses.id, id))
      .execute();
    // Return the first user or null if none found
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    throw new Error("Failed to get Thesis"); // Handle errors appropriately
  }
};
export const deleteThesis = async (id: number): Promise<void> => {
  try {
    const dbInstance = await db;
    const deletedThesis = await getThesisById(id);
    const result = await dbInstance
      .delete(theses)
      .where(eq(theses.id, id))
      .execute();

    try {
      // delete the document from the documents table
      const document = await dbInstance
        .select({
          path: documents.path,
        })
        .from(documents)
        .where(eq(documents.id, deletedThesis.documentId))
        .limit(1)
        .execute();

      await dbInstance
        .delete(documents)
        .where(eq(documents.id, deletedThesis.documentId))
        .then(async () => {
          deleteDocument(document[0].path);
        });
    } catch (error) {
      throw new Error("Failed to delete thesis"); // Handle errors appropriately
    }

    return;
  } catch (error) {
    throw new Error("Failed to delete thesis"); // Handle errors appropriately
  }
};
