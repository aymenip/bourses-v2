import { db } from '../../db/setup';
import { tiers } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { CreateTierDTO, TierDTO, UpdateTierDTO } from '../dtos';

// CREATE ONE Tier
export const createTier = async (createTier: CreateTierDTO): Promise<TierDTO> => {
    try {
        const id = (await (await db).insert(tiers).values(createTier).execute())[0].insertId;
        const result = await tier(id)
        return result; // Assuming `insertId` is returned
    } catch (error) {
        throw new Error('Failed to create Tiers'); // Handle errors appropriately
    }
};

/// GET ALL Tiers
export const allTiers = async (): Promise<TierDTO[]> => {
    const results = await (await db).select().from(tiers);
    return results.map((result) => new TierDTO(
        result.id,
        result.name,
        result.createdAt,
        result.updatedAt,
        result.durationId
    ))
}

/// GET ONE Tier
export const tier = async (id: number): Promise<TierDTO> => {
    const result = await (await db).select().from(tiers).where(eq(tiers.id, id)).execute();
    return new TierDTO(
        result[0].id,
        result[0].name,
        result[0].createdAt,
        result[0].updatedAt,
        result[0].durationId
    )
}

/// GET tier by name 
export const getTierByName = async (name: string): Promise<TierDTO> => {
    const result = await (await db).select().from(tiers).where(eq(tiers.name, name)).execute();
    return new TierDTO(
        result[0].id,
        result[0].name,
        result[0].createdAt,
        result[0].updatedAt,
        result[0].durationId
    )
}

/// UPDATE ONE Tier
export const updateTier = async (updateTierDTO: UpdateTierDTO): Promise<TierDTO> => {
    const result = await (await db).update(tiers).set(updateTierDTO).where(eq(tiers.id, updateTierDTO.id)).execute();
    const id = result[0].insertId;
    return await tier(id);
}


/// DELETE ONE Tier
export const deleteTier = async (id: number): Promise<number> => {
    return (await (await db).delete(tiers).where(eq(tiers.id, id)).execute())[0].insertId;
}



