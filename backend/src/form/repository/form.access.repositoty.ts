import { db } from "../../conference/db/setup";
import { formsAccess } from "../../conference/db/schema";
import { eq, inArray } from "drizzle-orm";
import { CreateFormAccessDTO } from "../dtos/form-access";
import { and } from "drizzle-orm";

export const changeFormAccess = async (
  createFormAccessDTO: CreateFormAccessDTO
): Promise<CreateFormAccessDTO> => {
  try {
    const dbInstance = await db;

    // Step 1: Fetch existing positions for the given formId
    let existedPositionIds = await dbInstance
      .select({ positionId: formsAccess.positionId })
      .from(formsAccess)
      .where(eq(formsAccess.formId, createFormAccessDTO.formId))
      .execute();

    let existedPositionIdsArray = existedPositionIds.map(
      (element) => element.positionId
    );

    // Step 2: Identify positions to delete
    const toDelete = existedPositionIdsArray.filter(
      (positionId) => !createFormAccessDTO.positionId.includes(positionId)
    );

    if (toDelete.length !== 0) {
      await dbInstance
        .delete(formsAccess)
        .where(
          and(
            inArray(formsAccess.positionId, toDelete),
            eq(formsAccess.formId, createFormAccessDTO.formId)
          )
        );
    }

    // Step 3: Insert only missing positions
    await dbInstance.transaction(async (tx) => {
      for (const positionId of createFormAccessDTO.positionId) {
        if (!existedPositionIdsArray.includes(positionId)) {
          await tx.insert(formsAccess).values({
            formId: createFormAccessDTO.formId,
            positionId: positionId,
          });
        }
      }
    });

    // Step 4: Fetch the updated positions after insertions
    const updatedPositions = await dbInstance
      .select({ positionId: formsAccess.positionId })
      .from(formsAccess)
      .where(eq(formsAccess.formId, createFormAccessDTO.formId))
      .execute();

    const updatedPositionIdsArray = updatedPositions.map(
      (item) => item.positionId
    );

    // Step 5: Return the updated DTO with all current positions
    return new CreateFormAccessDTO(
      createFormAccessDTO.formId,
      updatedPositionIdsArray
    );
  } catch (error) {
    console.error(error);
    throw new Error("ChangeFormAccessError"); // Handle errors appropriately
  }
};
