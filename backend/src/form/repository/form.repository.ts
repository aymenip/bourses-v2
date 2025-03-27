import { db } from "../../db/setup";
import { forms } from "../../db/schema";
import { CreateFormDTO, FormDTO, UpdateFormDTO } from "../dtos";
import { eq } from "drizzle-orm";
import { CAE } from "../../utils/constants";
import { and } from "drizzle-orm";

export const createForm = async (
  createFormDTO: CreateFormDTO,
  creator: number
): Promise<FormDTO> => {
  try {
    const dbInstance = await db;
    if (createFormDTO.id) {
      const updateFormDTO: UpdateFormDTO = {
        ...createFormDTO,
        id: createFormDTO.id,
      };

      return await updateForm(updateFormDTO, creator);
    }
    const result = await dbInstance
      .insert(forms)
      .values({ ...createFormDTO, creator })
      .execute();
    const form = await getFormById(result[0].insertId);
    return form;
  } catch (error) {
    console.log(error);
    throw new Error(CAE); // Handle errors appropriately
  }
};

export const updateForm = async (
  updateFormDTO: UpdateFormDTO,
  creator: number
): Promise<FormDTO> => {
  try {
    const dbInstance = await db;
    const result = await dbInstance
      .update(forms)
      .set({ title: updateFormDTO.title })
      .where(and(eq(forms.id, updateFormDTO.id), eq(forms.creator, creator)))
      .execute();

    const form = await getFormById(updateFormDTO.id);
    
    return form;
  } catch (error) {
    console.log(error);
    throw new Error(CAE); // Handle errors appropriately
  }
};

/// GET FORM BY ID
export const getFormById = async (id: number): Promise<FormDTO | null> => {
  try {

    const dbInstance = await db; // Ensure db instance is awaited once
    const result = await dbInstance
      .select()
      .from(forms)
      .where(eq(forms.id, id))
      .limit(1); // Fetch only one result

    if (result.length === 0) {
      return null; // No user found
    }

    const form = result[0];
    return new FormDTO(form.id, form.title, form.creator);
  } catch (error) {
    console.error("Error fetching form by id:", error); // Log the error for debugging
    return null; // Handle errors appropriately
  }
};

/// GET FORM BY TITLE
export const getFormByTitle = async (
  title: string,
  creator: number
): Promise<FormDTO | null> => {
  try {
    const dbInstance = await db; // Ensure db instance is awaited once
    const result = await dbInstance
      .select()
      .from(forms)
      .where(and(eq(forms.creator, creator), eq(forms.title, title)))
      .limit(1); // Fetch only one result

    if (result.length === 0) {
      return null; // No user found
    }

    const form = result[0];
    return new FormDTO(form.id, form.title, form.creator);
  } catch (error) {
    console.error("Error fetching form by title:", error); // Log the error for debugging
    return null; // Handle errors appropriately
  }
};

export const getFormsById = async (creator: number): Promise<FormDTO[]> => {
  try {
    const dbInstance = await db; // Ensure db instance is awaited once
    const result = await dbInstance
      .select()
      .from(forms)
      .where(eq(forms.creator, creator));

    if (result.length === 0) {
      return null; // No user found
    }
    return result?.map(
      (form) => new FormDTO(form.id, form.title, form.creator)
    );
  } catch (error) {
    console.error("Error fetching form by id:", error); // Log the error for debugging
    return null; // Handle errors appropriately
  }
};
export const deleteForm = async (id: number): Promise<void> => {
  try {
    const dbInstance = await db; // Ensure db instance is awaited once

    const result = await dbInstance.delete(forms).where(eq(forms.id, id));
  } catch (error) {
    console.error("Error fetching form by id:", error); // Log the error for debugging
    return null; // Handle errors appropriately
  }
};
