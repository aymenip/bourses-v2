import { db } from '../../db/setup';
import { teachers, users } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { CreateTeacherDTO, FullTeacherDTO, TeacherDTO, UpdateTeacherDTO } from '../dtos';
import { MatrialStatus } from '../teacher.enums';
import { handleError } from '../../utils/errors';
import { CreateUserDTO, UpdateUserDTO } from '../../user/dtos';
import { createUser } from '../../user/repository/user.repository';
import { CAE } from '../../utils/constants';

// CREATE ONE TEACHER
export const createTeacher = async (createTeacher: CreateTeacherDTO, createUserDTO: CreateUserDTO): Promise<CreateTeacherDTO> => {
    try {
        await (await db).transaction(async (tx) => {
            const user = await createUser(createUserDTO);
            const result = await (await db).insert(teachers).values({ ...createTeacher, userId: user.id }).execute();
        })
        return createTeacher; // Assuming `insertId` is returned
    } catch (error) {
        handleError((error) => console.log(error))
        throw new Error(CAE); // Handle errors appropriately
    }
};

/// GET ALL TEACHERS
export const allTeachers = async (): Promise<FullTeacherDTO[]> => {
    const dbInstance = await db;
    const results = await dbInstance
        .select({
            teacherId: teachers.id,
            highPosition: teachers.highPostion,
            createdAt: teachers.createdAt,
            updatedAt: teachers.updatedAt,
            positionId: teachers.positionId,
            firstname: users.firstname,
            lastname: users.lastname,
            email: users.email,
            dob: users.dob,
            matrialStatus: users.matrialStatus,
        })
        .from(teachers)
        .innerJoin(users, eq(teachers.userId, users.id));

    return results.map((result) =>
        new FullTeacherDTO(
            result.teacherId,
            result.firstname,
            result.lastname,
            result.email,
            result.dob,
            result.matrialStatus as MatrialStatus,
            result.highPosition,
            result.createdAt,
            result.updatedAt,
            result.positionId
        )
    );
};




/// GET ONE TEACHER
export const teacher = async (id: number): Promise<FullTeacherDTO> => {
    const dbInstance = await db;
    const result = await dbInstance
        .select({
            teacherId: teachers.id,
            highPosition: teachers.highPostion,
            createdAt: teachers.createdAt,
            updatedAt: teachers.updatedAt,
            positionId: teachers.positionId,
            firstname: users.firstname,
            lastname: users.lastname,
            email: users.email,
            dob: users.dob,
            matrialStatus: users.matrialStatus,
        })
        .from(teachers)
        .innerJoin(users, eq(teachers.userId, users.id))
        .where(eq(teachers.id, id))
        .limit(1); // Ensures only one result is fetched

    if (result.length === 0) {
        throw new Error(`Teacher with ID ${id} not found`);
    }

    const teacher = result[0];
    return new FullTeacherDTO(
        teacher.teacherId,
        teacher.firstname,
        teacher.lastname,
        teacher.email,
        teacher.dob,
        teacher.matrialStatus as MatrialStatus,
        teacher.highPosition,
        teacher.createdAt,
        teacher.updatedAt,
        teacher.positionId
    );
};


/// UPDATE ONE TEACHER
export const updateTeacher = async (updateTeacherDTO: UpdateTeacherDTO, updateUserDto: UpdateUserDTO): Promise<TeacherDTO> => {
    const dbInstance = await db;
    await dbInstance.transaction(async (tx) => {
        const updatedUser = await dbInstance.update(users).set(updateUserDto).where(eq(users.id, updateUserDto.id)).execute();
        const updatedTeacher = await dbInstance.update(teachers).set(updateTeacherDTO).where(eq(teachers.id, updateTeacherDTO.id)).execute()
    })

    return await teacher(updateTeacherDTO.id);
}


/// DELETE ONE TEACHER
export const deleteTeacher = async (id: number): Promise<number> => {
    const dbInstance = await db;
    const resutl = await dbInstance.delete(teachers).where(eq(teachers.id, id)).execute();
    return resutl[0].insertId;
}

