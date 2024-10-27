import { db } from '../../db/setup';
import { positions, teachers, tiers } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { CreateTeacherDTO, TeacherDTO, TeacherExportDTO, UpdateTeacherDTO } from '../dtos';
import { createTeacherHistory } from '../../teacherHistory/repository/teacherHistory.repository';
import { CreateTeacherHistoryDTO } from '../../teacherHistory/dtos';
import { MatrialStatus } from '../teacher.enums';
import { handleError } from '../../utils/errors';

// CREATE ONE TEACHER
export const createTeacher = async (createTeacher: CreateTeacherDTO): Promise<CreateTeacherDTO> => {
    try {
        await (await db).transaction(async (tx) => {
            const result = await (await db).insert(teachers).values(createTeacher).execute();
            const { currentDegree, nextDegree, effectiveDate } = createTeacher;
            const teacherId = result[0].insertId
            const createTeacherHistoryDTO = new CreateTeacherHistoryDTO(teacherId, currentDegree, nextDegree, effectiveDate)
            await createTeacherHistory(createTeacherHistoryDTO);
        })
        return createTeacher; // Assuming `insertId` is returned
    } catch (error) {
        handleError((error) => console.log(error))
        throw new Error('Failed to create teacher'); // Handle errors appropriately
    }
};

/// GET ALL TEACHERS
export const allTeachers = async (): Promise<TeacherDTO[]> => {
    const results = await (await db).select().from(teachers);
    return results.map((result) => new TeacherDTO(
        result.id,
        result.firstname,
        result.lastname,
        result.email,
        result.dob,
        result.matrialStatus as MatrialStatus,
        result.age,
        result.debt,
        result.highPostion,
        result.createdAt,
        result.updatedAt,
        result.tierId,
        result.positionId,
    ));
}

// GET ALL TEACHERS WITH DETAILS (JOINING)
export const allTeachersWithDetails = async (): Promise<TeacherExportDTO[]> => {
    const results = await
        (await db).select()
            .from(teachers)
            .leftJoin(tiers, eq(teachers.tierId, tiers.id))
            .leftJoin(positions, eq(teachers.positionId, positions.id));
    return results.map((result) => new TeacherExportDTO(
        result["teachers"].id,
        result["teachers"].firstname,
        result["teachers"].lastname,
        result["teachers"].email,
        result["teachers"].dob,
        result["teachers"].matrialStatus as MatrialStatus,
        result["teachers"].age,
        result["teachers"].debt,
        result["teachers"].highPostion,
        result["teachers"].createdAt,
        result["positions"].name,
        result["tiers"].name
    ));
}

/// GET ONE TEACHER
export const teacher = async (id: number): Promise<TeacherDTO> => {
    const result = await (await db).select().from(teachers).where(eq(teachers.id, id));
    return new TeacherDTO(
        result[0].id,
        result[0].firstname,
        result[0].lastname,
        result[0].email,
        result[0].dob,
        result[0].matrialStatus as MatrialStatus,
        result[0].age,
        result[0].debt,
        result[0].highPostion,
        result[0].createdAt,
        result[0].updatedAt,
        result[0].tierId,
        result[0].positionId,
    );
}


/// UPDATE ONE TEACHER
export const updateTeacher = async (updateTeacherDTO: UpdateTeacherDTO): Promise<TeacherDTO> => {
    await (await db).update(teachers).set(updateTeacherDTO).where(eq(teachers.id, updateTeacherDTO.id)).execute()
    return await teacher(updateTeacherDTO.id);
}


/// DELETE ONE TEACHER
export const deleteTeacher = async (id: number): Promise<number> => {
    const resutl = (await (await db).delete(teachers).where(eq(teachers.id, id)).execute())[0].insertId;
    return resutl;
}

