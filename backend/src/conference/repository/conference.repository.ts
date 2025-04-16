import { db } from "../db/setup";
import { documents, conferences } from "../db/schema";
import {
  CreateConferenceDTO,
  ConferenceDTO,
  UpdateConferenceDTO,
} from "../dtos";
import { eq } from "drizzle-orm";
import { deleteDocument } from "../../utils/uploads";
import { Classification } from "../../articles/article.enums";

export const createConference = async (
  createConferenceDTO: CreateConferenceDTO,
  userId: number
): Promise<CreateConferenceDTO> => {
  try {
    const dbInstance = await db;
    const result = await dbInstance
      .insert(conferences)
      .values({ ...createConferenceDTO, userId })
      .execute();
    const book = await getConferenceById(result[0].insertId);
    return book;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create Conference"); // Handle errors appropriately
  }
};

export const updateConference = async (
  updateConferenceDTO: UpdateConferenceDTO
): Promise<CreateConferenceDTO> => {
  try {
    const dbInstance = await db;
    const result = await dbInstance
      .update(conferences)
      .set(updateConferenceDTO)
      .where(eq(conferences.id, updateConferenceDTO.id))
      .execute();
    const thesis = await getConferenceById(result[0].insertId);
    return thesis;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create Conference"); // Handle errors appropriately
  }
};

export const getAllConferencesForUser = async (
  userId: number
): Promise<ConferenceDTO[]> => {
  try {
    const dbInstance = await db;
    const result = await dbInstance
      .select()
      .from(conferences)
      .where(eq(conferences.userId, userId))
      .execute();
    const _conferences: ConferenceDTO[] = result.map((conference) => ({
      ...conference,
      classification: conference.classification as Classification,
    }));
    // Return the first role or null if none found
    return _conferences || [];
  } catch (error) {
    return null; // Handle errors appropriately
  }
};

export const getAllConferences = async (): Promise<ConferenceDTO[]> => {
  try {
    const dbInstance = await db;
    const result = await dbInstance.select().from(conferences);
    const _conferences: ConferenceDTO[] = result.map((conference) => ({
      ...conference,
      classification: conference.classification as Classification,
    }));
    // Return the first role or null if none found
    return _conferences || [];
  } catch (error) {
    return null; // Handle errors appropriately
  }
};

export const getConferenceById = async (
  id: number
): Promise<ConferenceDTO | null> => {
  try {
    const dbInstance = await db;
    const result = await dbInstance
      .select()
      .from(conferences)
      .where(eq(conferences.id, id))
      .execute();
    // Return the first user or null if none found
    return result.length > 0
      ? {
          ...result[0],
          classification: result[0].classification as Classification,
        }
      : null;
  } catch (error) {
    throw new Error("Failed to get Conference"); // Handle errors appropriately
  }
};
export const deleteConference = async (id: number): Promise<void> => {
  try {
    const dbInstance = await db;
    const deletedConference = await getConferenceById(id);
    await dbInstance
      .delete(conferences)
      .where(eq(conferences.id, id))
      .execute();

    try {
      // delete the document from the documents table
      const document = await dbInstance
        .select({
          path: documents.path,
        })
        .from(documents)
        .where(eq(documents.id, deletedConference.documentId))
        .limit(1)
        .execute();

      await dbInstance
        .delete(documents)
        .where(eq(documents.id, deletedConference.documentId))
        .then(async () => {
          deleteDocument(document[0].path);
        });
    } catch (error) {
      throw new Error("Failed to delete Conference"); // Handle errors appropriately
    }

    return;
  } catch (error) {
    throw new Error("Failed to delete Conference"); // Handle errors appropriately
  }
};
