import { db } from "../../db/setup";
import { formSubmissions } from "../../db/schema";
import {
  CreateSubmissionDTO,
  SubmissionDTO,
  UpdateSubmissionDTO,
} from "../dtos";
import { eq } from "drizzle-orm";
import { SubmissionStatus } from "submission/submission.enums";

export const createSubmission = async (
  createformSubmissionDTO: CreateSubmissionDTO,
  userId: number
): Promise<CreateSubmissionDTO> => {
  try {
    const dbInstance = await db;
    const result = await dbInstance
      .insert(formSubmissions)
      .values({ ...createformSubmissionDTO, userId })
      .execute();
    const book = await getSubmissionById(result[0].insertId);
    return book;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create formformSubmission"); // Handle errors appropriately
  }
};

export const updateSubmission = async (
  updateformSubmissionDTO: UpdateSubmissionDTO
): Promise<CreateSubmissionDTO> => {
  try {
    const dbInstance = await db;
    const result = await dbInstance
      .update(formSubmissions)
      .set(updateformSubmissionDTO)
      .where(eq(formSubmissions.id, updateformSubmissionDTO.id))
      .execute();
    const thesis = await getSubmissionById(result[0].insertId);
    return thesis;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create formformSubmission"); // Handle errors appropriately
  }
};

export const getAllSubmissionsForUser = async (
  userId: number
): Promise<SubmissionDTO[]> => {
  try {
    const dbInstance = await db;
    const result = await dbInstance
      .select()
      .from(formSubmissions)
      .where(eq(formSubmissions.userId, userId))
      .execute();
    const _submissions: SubmissionDTO[] = result.map((submission) => ({
      ...submission,
      status: submission.status as SubmissionStatus,
    }));
    // Return the first role or null if none found
    return _submissions || [];
  } catch (error) {
    return null; // Handle errors appropriately
  }
};

export const getAllSubmissions = async (): Promise<SubmissionDTO[]> => {
  try {
    const dbInstance = await db;
    const result = await dbInstance.select().from(formSubmissions);
    const _submissions: SubmissionDTO[] = result.map((submission) => ({
      ...submission,
      status: submission.status as SubmissionStatus,
    }));
    // Return the first role or null if none found
    return _submissions || [];
  } catch (error) {
    return null; // Handle errors appropriately
  }
};

export const getSubmissionById = async (
  id: number
): Promise<SubmissionDTO | null> => {
  try {
    const dbInstance = await db;
    const result = await dbInstance
      .select()
      .from(formSubmissions)
      .where(eq(formSubmissions.id, id))
      .execute();
    // Return the first user or null if none found
    return result.length > 0
      ? {
          ...result[0],
          status: result[0].status as SubmissionStatus,
        }
      : null;
  } catch (error) {
    throw new Error("Failed to get formformSubmission"); // Handle errors appropriately
  }
};
export const deleteSubmission = async (id: number): Promise<void> => {
  try {
    const dbInstance = await db;
    await dbInstance
      .delete(formSubmissions)
      .where(eq(formSubmissions.id, id))
      .execute();
    return;
  } catch (error) {
    throw new Error("Failed to delete formformSubmission"); // Handle errors appropriately
  }
};
