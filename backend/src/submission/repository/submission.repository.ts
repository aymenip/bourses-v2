import { db } from "../../conference/db/setup";
import {
  forms,
  formSubmissions,
  positions,
  users,
} from "../../conference/db/schema";
import {
  CreateSubmissionDTO,
  SubmissionDTO,
  UpdateSubmissionDTO,
} from "../dtos";
import { eq } from "drizzle-orm";
import { SubmissionStatus } from "submission/submission.enums";
import { UserDTO } from "user/dtos";
import { MatrialStatus } from "user/user.enums";
import { SubmissionWithUserInfoDTO } from "submission/dtos/submission";
import { and } from "drizzle-orm";

export const createSubmission = async (
  createformSubmissionDTO: CreateSubmissionDTO
): Promise<CreateSubmissionDTO> => {
  try {
    const dbInstance = await db;
    const result = await dbInstance
      .insert(formSubmissions)
      .values(createformSubmissionDTO)
      .execute();
    const Submission = await getSubmissionById(result[0].insertId);
    return Submission;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create Submission"); // Handle errors appropriately
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
): Promise<(SubmissionDTO & { formTitle: string })[]> => {
  try {
    const dbInstance = await db;
    const result = await dbInstance
      .select()
      .from(formSubmissions)
      .where(eq(formSubmissions.userId, userId))
      .execute();
    const _submissions: (SubmissionDTO & { formTitle: string })[] =
      await Promise.all(
        result.map(async (submission) => {
          let formTitleResult = await dbInstance
            .select({ title: forms.title })
            .from(forms)
            .where(eq(forms.id, submission.formId))
            .execute();
          let formTitle =
            formTitleResult.length > 0 ? formTitleResult[0].title : "";
          return {
            ...submission,
            status: submission.status as SubmissionStatus,
            formTitle: formTitle,
          };
        })
      );
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

export const getAllSubmissionsWithUserInfo = async (
  formId: number
): Promise<SubmissionWithUserInfoDTO[]> => {
  try {
    const dbInstance = await db;
    const result = await dbInstance
      .select()
      .from(formSubmissions)
      .innerJoin(users, eq(formSubmissions.userId, users.id))
      .leftJoin(positions, eq(users.positionId, positions.id)) // Assuming positions table exists and has `id` and `name`
      .where(eq(formSubmissions.formId, formId)); // No need for and() here as you already join formSubmissions to users

    const _submissions = result.map((submission) => ({
      id: submission.formSubmissions.id,
      formId: submission.formSubmissions.formId,
      userId: submission.formSubmissions.userId,
      createdAt: submission.formSubmissions.createdAt,
      updatedAt: submission.formSubmissions.updatedAt,
      status: submission.formSubmissions.status as SubmissionStatus,
      firstname: submission.users.firstname,
      lastname: submission.users.lastname,
      position: submission.positions?.name || "", // Position name or empty string if not available
    }));

    return _submissions;
  } catch (error) {
    console.error("Error fetching submissions with user info:", error);
    throw new Error("Failed to fetch submissions"); // Optional: Throw an error or handle it accordingly
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
    throw new Error("Failed to get formSubmission"); // Handle errors appropriately
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
