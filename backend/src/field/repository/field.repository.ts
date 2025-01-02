import { db } from "../../db/setup";
import { fields } from "../../db/schema";
import { eq } from "drizzle-orm";
import { CAE } from "../../utils/constants";
import { and } from "drizzle-orm";
import { FieldDTO, CreateFieldDTO, UpdateFieldDTO } from "../dtos";

export const createField = async (
  createFieldDTO: CreateFieldDTO
): Promise<FieldDTO> => {
  try {
    const result = await (await db)
      .insert(fields)
      .values(createFieldDTO)
      .execute();
    const field = await getFieldById(result[0].insertId);
    return field;
  } catch (error) {
    console.log(error);
    throw new Error(CAE); // Handle errors appropriately
  }
};

export const updateField = async (
  updateFieldDTO: UpdateFieldDTO
): Promise<FieldDTO> => {
  try {
    const dbInstance = await db;
    const result = await dbInstance
      .update(fields)
      .set({})
      .where(
        and(
          eq(fields.id, updateFieldDTO.id),
          eq(fields.formId, updateFieldDTO.formId)
        )
      )
      .execute();
    const field = await getFieldById(result[0].insertId);
    return field;
  } catch (error) {
    console.log(error);
    throw new Error(CAE); // Handle errors appropriately
  }
};

/// GET FIELD BY ID
export const getFieldById = async (id: number): Promise<FieldDTO | null> => {
  try {
    const dbInstance = await db; // Ensure db instance is awaited once
    const result = await dbInstance
      .select()
      .from(fields)
      .where(eq(fields.id, id))
      .limit(1); // Fetch only one result

    if (result.length === 0) {
      return null; // No user found
    }

    const field = result[0];
    return new FieldDTO(field.id, field.label, field.formId);
  } catch (error) {
    console.error("Error fetching field by id:", error); // Log the error for debugging
    return null; // Handle errors appropriately
  }
};
