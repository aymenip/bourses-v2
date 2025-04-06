import { db } from "../../db/setup";
import {
  fields,
  forms,
  formsAccess,
  sourceableFields,
  typedFields,
} from "../../db/schema";
import { CreateFormDTO, FormDTO, UpdateFormDTO } from "../dtos";
import { eq } from "drizzle-orm";
import { CAE } from "../../utils/constants";
import { and } from "drizzle-orm";
import { FullFormDTO } from "../dtos/form.dto";
import { FullFormBlockDTO } from "../../field/dtos/field.dto";
import { TypedFieldDTO } from "../../field/dtos/typedField";
import { SourceabledFieldDTO } from "../../field/dtos/sourceableField";

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

    await dbInstance.delete(forms).where(eq(forms.id, id));
  } catch (error) {
    console.error("Error fetching form by id:", error); // Log the error for debugging
    return null; // Handle errors appropriately
  }
};

export const getFormsForUser = async (
  positionId: number
): Promise<FormDTO[]> => {
  try {
    const dbInstance = await db; // Ensure db instance is awaited once

    const result = await dbInstance
      .select({
        id: forms.id,
        title: forms.title,
        creator: forms.creator,
        createdAt: forms.createdAt,
        updatedAt: forms.updatedAt,
      })
      .from(forms)
      .innerJoin(formsAccess, eq(forms.id, formsAccess.formId))
      .where(eq(formsAccess.positionId, positionId));

    return result;
  } catch (error) {
    console.error("Error fetching forms by position:", error); // Log the error for debugging
    return null; // Handle errors appropriately
  }
};

export const getFullFormById = async (
  id: number
): Promise<FullFormDTO | null> => {
  try {
    const dbInstance = await db;

    // 1. Fetch the form
    const form = await dbInstance
      .select()
      .from(forms)
      .where(eq(forms.id, id))
      .limit(1)
      .then((res) => res[0]);

    if (!form) return null;

    // 2. Fetch fields (form blocks) for this form
    const formBlocks = await dbInstance
      .select()
      .from(fields)
      .where(eq(fields.formId, id));

    // 3. Build DTOs for blocks and their fields
    const blockDTOs: FullFormBlockDTO[] = [];

    for (const block of formBlocks) {
      const typed = await dbInstance
        .select()
        .from(typedFields)
        .where(eq(typedFields.fieldId, block.id));

      const sourceable = await dbInstance
        .select()
        .from(sourceableFields)
        .where(eq(sourceableFields.fieldId, block.id));

      const fieldsDTO: (TypedFieldDTO | SourceabledFieldDTO)[] = [];

      for (const tf of typed) {
        fieldsDTO.push(
          new TypedFieldDTO(
            tf.id,
            tf.type,
            block.label,
            tf.points,
            tf.required,
            tf.fieldId
          )
        );
      }

      for (const sf of sourceable) {
        fieldsDTO.push(
          new SourceabledFieldDTO(
            sf.id,
            sf.type,
            sf.points,
            block.label,
            sf.required,
            sf.fieldId
          )
        );
      }

      blockDTOs.push(
        new FullFormBlockDTO(block.id, block.label, block.formId, fieldsDTO.map(field => [field]))
      );
    }

    // 4. Construct FullFormDTO
    const fullForm = new FullFormDTO(
      form.id,
      form.title,
      form.creator,
      blockDTOs
    );

    return fullForm;
  } catch (error) {
    console.error("Error fetching the full form by id:", error);
    return null;
  }
};
