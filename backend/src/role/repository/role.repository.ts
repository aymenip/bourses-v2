import { db } from '../../db/setup';
import { roles } from '../../db/schema';
import { CreateRoleDTO, RoleDTO } from 'role/dtos';
import { eq } from 'drizzle-orm';


export const createRole = async (createRoleDTO: CreateRoleDTO): Promise<RoleDTO> => {

    try {
        const result = await (await db).insert(roles).values(createRoleDTO).execute();
        const user = await getRoleById(result[0].insertId);
        return user;
    } catch (error) {
        console.log(error)
        throw new Error('Failed to create Role'); // Handle errors appropriately
    }
}

export const getRoleByCode = async (code: string): Promise<RoleDTO | null> => {
    try {
        const result = await (await db).select().from(roles).where(eq(roles.code, code)).execute();
        // Return the first role or null if none found
        return result.length > 0 ? result[0] : null;
    } catch (error) {
        return null // Handle errors appropriately
    }
}

export const getRoleById = async (id: number): Promise<RoleDTO | null> => {
    try {
        const result = await (await db).select().from(roles).where(eq(roles.id, id)).execute();
        // Return the first user or null if none found
        return result.length > 0 ? result[0] : null;
    } catch (error) {
        throw new Error('Failed to get Role'); // Handle errors appropriately
    }
}