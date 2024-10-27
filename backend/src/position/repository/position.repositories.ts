import { db } from '../../db/setup';
import { positions } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { CreatePositionDTO, UpdatePositionDTO } from 'position/dtos';

// CREATE ONE Position
export const createPosition = async (createPosition: CreatePositionDTO): Promise<CreatePositionDTO> => {
    try {
        const result = await (await db).insert(positions).values({ ...createPosition }).execute();
        return createPosition; // Assuming `insertId` is returned
    } catch (error) {
        throw new Error('Failed to create Position'); // Handle errors appropriately
    }
};

/// GET ALL PositionS
export const allPositions = async (): Promise<any[]> => {
    return (await db).select().from(positions);
}

/// GET ONE Position
export const position = async (id: number): Promise<any[]> => {
    return (await db).select().from(positions).where(eq(positions.id, id));
}


/// UPDATE ONE Position
export const updatePosition = async (updatePositionDTO: UpdatePositionDTO): Promise<any[]> => {
    return (await db).update(positions).set(updatePositionDTO).where(eq(positions.id, updatePositionDTO.id)).execute();
}


/// DELETE ONE Position
export const deletePosition = async (id: number): Promise<any[]> => {
    return (await db).delete(positions).where(eq(positions.id, id)).execute();
}

