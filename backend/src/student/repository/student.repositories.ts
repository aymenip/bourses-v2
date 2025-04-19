import { db } from "../../db/setup";
import { students, users } from "../../db/schema";
import { eq } from "drizzle-orm";
import { CreateStudentDTO, StudentDTO, UpdateStudentDTO } from "../dtos";
import { MatrialStatus } from "../../user/user.enums";
import { handleError } from "../../utils/errors";
import { CreateUserDTO, UpdateUserDTO, UserDTO } from "../../user/dtos";
import { createUser } from "../../user/repository/user.repository";
import { CAE } from "../../utils/constants";
import { MySqlTransaction } from "drizzle-orm/mysql-core";

// CREATE ONE TEACHER
export const createStudent = async (
  createStudent: CreateStudentDTO,
  createUserDTO: CreateUserDTO
): Promise<StudentDTO & UserDTO> => {
  try {
    const dbInstance = await db;

    const studentId = await dbInstance.transaction(
      async (tx: MySqlTransaction<any, any>) => {
        const userId = await createUser(createUserDTO, tx);
        const result = await tx
          .insert(students)
          .values({ ...createStudent, userId: userId })
          .execute();
        return result[0].insertId;
      }
    );

    const createdStudent = await student(studentId);
    return createdStudent; // Assuming `insertId` is returned
  } catch (error) {
    handleError((error) => console.log(error));
    throw new Error(CAE); // Handle errors appropriately
  }
};

/// GET ALL TEACHERS
export const allStudents = async (): Promise<(StudentDTO & UserDTO)[]> => {
  const dbInstance = await db;

  const results = await dbInstance
    .select()
    .from(students)
    .innerJoin(users, eq(students.userId, users.id));

  return results.map((result) => {
    const studentData = result.students;
    const userData = result.users;

    const studentDTO = new StudentDTO(
      studentData.id,
      studentData.createdAt,
      studentData.updatedAt
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

    return { ...studentDTO, ...userDTO };
  });
};

/// GET ONE TEACHER
export const student = async (id: number): Promise<StudentDTO & UserDTO> => {
  const dbInstance = await db;

  const result = await dbInstance
    .select()
    .from(students)
    .innerJoin(users, eq(students.userId, users.id))
    .where(eq(students.id, id))
    .limit(1); // Ensures only one result is fetched

  if (result.length === 0) {
    throw new Error(`Student with ID ${id} not found`);
  }

  const studentData = result[0].students;
  const userData = result[0].users;
  const studentDTO = new StudentDTO(
    studentData.id,
    studentData.createdAt,
    studentData.updatedAt
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

  return { ...studentDTO, ...userDTO };
};

/// UPDATE ONE TEACHER
export const updateStudent = async (
  updateStudentDTO: UpdateStudentDTO,
  updateUserDto: UpdateUserDTO
): Promise<StudentDTO> => {
  const dbInstance = await db;
  await dbInstance.transaction(async (tx) => {
    await tx
      .update(users)
      .set(updateUserDto)
      .where(eq(users.id, updateUserDto.id))
      .execute();

    await tx
      .update(students)
      .set(updateStudentDTO)
      .where(eq(students.id, updateStudentDTO.id))
      .execute();
  });

  return await student(updateStudentDTO.id);
};

/// DELETE ONE TEACHER
export const deleteStudent = async (id: number): Promise<number> => {
  const dbInstance = await db;
  const resutl = await dbInstance
    .delete(students)
    .where(eq(students.id, id))
    .execute();
  return resutl[0].insertId;
};
