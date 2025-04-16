import { db } from "../../conference/db/setup";
import { sourceableFields } from "../../conference/db/schema";
import { eq } from "drizzle-orm";
import { CAE } from "../../utils/constants";
import { and } from "drizzle-orm";
import {
  CreateSourceabledFieldDTO,
  SourceabledFieldDTO,
  UpdateSourceabledFieldDTO,
} from "../../field/dtos/sourceableField";

export const createSourceableField = async (
  createSourceableFieldDTO: CreateSourceabledFieldDTO
): Promise<SourceabledFieldDTO> => {
  try {
    const dbInstance = await db;
    const result = await dbInstance
      .insert(sourceableFields)
      .values(createSourceableFieldDTO)
      .execute();
    const sourceableField = await getSourceableFieldById(result[0].insertId);
    return sourceableField;
  } catch (error) {
    console.log(error);
    throw new Error(CAE); // Handle errors appropriately
  }
};

export const updateSourceableField = async (
  updateSourceableFieldDTO: UpdateSourceabledFieldDTO
): Promise<SourceabledFieldDTO> => {
  try {
    const dbInstance = await db;
    const result = await dbInstance
      .update(sourceableFields)
      .set(updateSourceableFieldDTO)
      .where(
        and(
          eq(sourceableFields.id, updateSourceableFieldDTO.id),
          eq(sourceableFields.blockId, updateSourceableFieldDTO.blockId)
        )
      )
      .execute();
    const sourceableField = await getSourceableFieldById(result[0].insertId);
    return sourceableField;
  } catch (error) {
    console.log(error);
    throw new Error(CAE); // Handle errors appropriately
  }
};

/// GET sourceabledField BY ID
export const getSourceableFieldById = async (
  id: number
): Promise<SourceabledFieldDTO | null> => {
  try {
    const dbInstance = await db; // Ensure db instance is awaited once
    const result = await dbInstance
      .select()
      .from(sourceableFields)
      .where(eq(sourceableFields.id, id))
      .limit(1); // Fetch only one result

    if (result.length === 0) {
      return null; // No sourceabledField found
    }

    const sourceableFieldData = result[0];

    return new SourceabledFieldDTO(
      sourceableFieldData.id,
      sourceableFieldData.type,
      sourceableFieldData.points,
      sourceableFieldData.label,
      sourceableFieldData.required,
      sourceableFieldData.blockId
    );
  } catch (error) {
    console.error("Error fetching sourceabledField by id:", error); // Log the error for debugging
    return null; // Handle errors appropriately
  }
};

export const deleteSourceableField = async (id: number): Promise<void> => {
  try {
    const dbInstance = await db;
    await dbInstance
      .delete(sourceableFields)
      .where(eq(sourceableFields.id, id))
      .execute();
  } catch (error) {
    console.log(error);
    throw new Error(CAE); // Handle errors appropriately
  }
};
