import { db } from '../../db/setup';
import { fields, typedFields } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { CAE } from '../../utils/constants';
import { and } from 'drizzle-orm';
import { CreateTypedFieldDTO, TypedFieldDTO } from 'field/dtos/typedField';
import { UpdateTypedFieldDTO } from 'field/dtos/typedField/update.typedField.dto';


export const createTypedField = async (CreateTypedFieldDTO: CreateTypedFieldDTO): Promise<TypedFieldDTO> => {

    try {
        const dbInstance = await db;
        const result = await dbInstance.insert(typedFields).values(CreateTypedFieldDTO).execute();
        const typedField = await getTypedFieldById(result[0].insertId);
        return typedField;
    } catch (error) {
        console.log(error)
        throw new Error(CAE); // Handle errors appropriately
    }
}

export const updateTypedField = async (updateTypedFieldDTO: UpdateTypedFieldDTO): Promise<TypedFieldDTO> => {
    try {
        const dbInstance = await db;
        const result = await dbInstance
            .update(typedFields)
            .set(updateTypedFieldDTO)
            .where(and(eq(typedFields.id, updateTypedFieldDTO.id), eq(typedFields.fieldId, updateTypedFieldDTO.fieldId)))
            .execute();
        const typedField = await getTypedFieldById(result[0].insertId);
        return typedField;
    } catch (error) {
        console.log(error)
        throw new Error(CAE); // Handle errors appropriately
    }
}


/// GET FIELD BY ID
export const getTypedFieldById = async (id: number): Promise<TypedFieldDTO | null> => {
    try {
        const dbInstance = await db; // Ensure db instance is awaited once
        const result = await dbInstance
            .select()
            .from(typedFields)
            .where(eq(typedFields.id, id))
            .limit(1); // Fetch only one result

        if (result.length === 0) {
            return null; // No user found
        }

        const typedField = result[0];

        return new TypedFieldDTO(
            typedField.id,
            typedField.type,
            typedField.value,
            typedField.fieldId
        );

    } catch (error) {
        console.error("Error fetching typedField by id:", error); // Log the error for debugging
        return null; // Handle errors appropriately
    }
};

