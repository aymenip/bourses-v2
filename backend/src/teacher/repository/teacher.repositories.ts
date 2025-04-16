import { db } from "../../conference/db/setup";
import { teachers, users } from "../../conference/db/schema";
import { eq } from "drizzle-orm";
import { CreateTeacherDTO, TeacherDTO, UpdateTeacherDTO } from "../dtos";
import { MatrialStatus } from "../../user/user.enums";
import { handleError } from "../../utils/errors";
import { CreateUserDTO, UpdateUserDTO, UserDTO } from "../../user/dtos";
import { createUser } from "../../user/repository/user.repository";
import { CAE } from "../../utils/constants";
import { MySqlTransaction } from "drizzle-orm/mysql-core";

// CREATE ONE TEACHER
export const createTeacher = async (
  createTeacher: CreateTeacherDTO,
  createUserDTO: CreateUserDTO
): Promise<TeacherDTO & UserDTO> => {
  try {
    const dbInstance = await db;

    const teacherId = await dbInstance.transaction(
      async (tx: MySqlTransaction<any, any>) => {
        const userId = await createUser(createUserDTO, tx);
        const result = await tx
          .insert(teachers)
          .values({ ...createTeacher, userId: userId })
          .execute();
        return result[0].insertId;
      }
    );

    const createdTeacher = await teacher(teacherId);
    return createdTeacher; // Assuming `insertId` is returned
  } catch (error) {
    handleError((error) => console.log(error));
    throw new Error(CAE); // Handle errors appropriately
  }
};

/// GET ALL TEACHERS
export const allTeachers = async (): Promise<(TeacherDTO & UserDTO)[]> => {
  const dbInstance = await db;

  const results = await dbInstance
    .select()
    .from(teachers)
    .innerJoin(users, eq(teachers.userId, users.id));

  return results.map((result) => {
    const teacherData = result.teachers;
    const userData = result.users;

    const teacherDTO = new TeacherDTO(
      teacherData.id,
      teacherData.highPosition,
      teacherData.createdAt,
      teacherData.updatedAt
    );

    const userDTO = new UserDTO(
      userData.id,
      userData.firstname,
      userData.lastname,
      userData.dob,
      userData.matrialStatus as MatrialStatus,
      userData.email,
      null, // Ensure password is not returned
      userData.is_active,
      userData.password_changed,
      userData.createdAt,
      userData.updatedAt,
      userData.roleId,
      userData.positionId,
      userData.google_scholar,
      userData.research_gate
    );

    return { ...teacherDTO, ...userDTO };
  });
};

/// GET ONE TEACHER
export const teacher = async (id: number): Promise<TeacherDTO & UserDTO> => {
  const dbInstance = await db;

  const result = await dbInstance
    .select()
    .from(teachers)
    .innerJoin(users, eq(teachers.userId, users.id))
    .where(eq(teachers.id, id))
    .limit(1); // Ensures only one result is fetched

  if (result.length === 0) {
    throw new Error(`Teacher with ID ${id} not found`);
  }

  const teacherData = result[0].teachers;
  const userData = result[0].users;
  const teacherDTO = new TeacherDTO(
    teacherData.id,
    teacherData.highPosition,
    teacherData.createdAt,
    teacherData.updatedAt
  );
  const userDTO = new UserDTO(
    userData.id,
    userData.firstname,
    userData.lastname,
    userData.dob,
    userData.matrialStatus as MatrialStatus,
    userData.email,
    null, // Ensure password is not returned
    userData.is_active,
    userData.password_changed,
    userData.createdAt,
    userData.updatedAt,
    userData.roleId,
    userData.positionId,
    userData.google_scholar,
    userData.research_gate
  );

  return { ...teacherDTO, ...userDTO };
};

/// UPDATE ONE TEACHER
export const updateTeacher = async (
  updateTeacherDTO: UpdateTeacherDTO,
  updateUserDto: UpdateUserDTO
): Promise<TeacherDTO> => {
  const dbInstance = await db;
  await dbInstance.transaction(async (tx) => {
    const updatedUser = await dbInstance
      .update(users)
      .set(updateUserDto)
      .where(eq(users.id, updateUserDto.id))
      .execute();

    const updatedTeacher = await dbInstance
      .update(teachers)
      .set(updateTeacherDTO)
      .where(eq(teachers.id, updateTeacherDTO.id))
      .execute();
  });

  return await teacher(updateTeacherDTO.id);
};

/// DELETE ONE TEACHER
export const deleteTeacher = async (id: number): Promise<number> => {
  const dbInstance = await db;
  const resutl = await dbInstance
    .delete(teachers)
    .where(eq(teachers.id, id))
    .execute();
  return resutl[0].insertId;
};
