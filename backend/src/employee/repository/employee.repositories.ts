import { db } from "../../db/setup";
import { employees, users } from "../../db/schema";
import { eq } from "drizzle-orm";
import { CreateEmployeeDTO, EmployeeDTO, UpdateEmployeeDTO } from "../dtos";
import { MatrialStatus } from "../../user/user.enums";
import { handleError } from "../../utils/errors";
import { CreateUserDTO, UpdateUserDTO, UserDTO } from "../../user/dtos";
import { createUser } from "../../user/repository/user.repository";
import { CAE } from "../../utils/constants";
import { MySqlTransaction } from "drizzle-orm/mysql-core";

// CREATE ONE TEACHER
export const createEmployee = async (
  createEmployee: CreateEmployeeDTO,
  createUserDTO: CreateUserDTO
): Promise<EmployeeDTO & UserDTO> => {
  try {
    const dbInstance = await db;

    const employeeId = await dbInstance.transaction(
      async (tx: MySqlTransaction<any, any>) => {
        const userId = await createUser(createUserDTO, tx);
        const result = await tx
          .insert(employees)
          .values({ ...createEmployee, userId: userId })
          .execute();
        return result[0].insertId;
      }
    );

    const createdEmployee = await employee(employeeId);
    return createdEmployee; // Assuming `insertId` is returned
  } catch (error) {
    handleError((error) => console.log(error));
    throw new Error(CAE); // Handle errors appropriately
  }
};

/// GET ALL TEACHERS
export const allEmployees = async (): Promise<(EmployeeDTO & UserDTO)[]> => {
  const dbInstance = await db;

  const results = await dbInstance
    .select()
    .from(employees)
    .innerJoin(users, eq(employees.userId, users.id));

  return results.map((result) => {
    const employeeData = result.employees;
    const userData = result.users;

    const employeeDTO = new EmployeeDTO(
      employeeData.id,
      employeeData.createdAt,
      employeeData.updatedAt
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

    return { ...employeeDTO, ...userDTO };
  });
};

/// GET ONE TEACHER
export const employee = async (id: number): Promise<EmployeeDTO & UserDTO> => {
  const dbInstance = await db;

  const result = await dbInstance
    .select()
    .from(employees)
    .innerJoin(users, eq(employees.userId, users.id))
    .where(eq(employees.id, id))
    .limit(1); // Ensures only one result is fetched

  if (result.length === 0) {
    throw new Error(`Employee with ID ${id} not found`);
  }

  const employeeData = result[0].employees;
  const userData = result[0].users;
  const employeeDTO = new EmployeeDTO(
    employeeData.id,
    employeeData.createdAt,
    employeeData.updatedAt
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

  return { ...employeeDTO, ...userDTO };
};

/// UPDATE ONE TEACHER
export const updateEmployee = async (
  updateEmployeeDTO: UpdateEmployeeDTO,
  updateUserDto: UpdateUserDTO
): Promise<EmployeeDTO> => {
  const dbInstance = await db;
  await dbInstance.transaction(async (tx) => {
    await tx
      .update(users)
      .set(updateUserDto)
      .where(eq(users.id, updateUserDto.id))
      .execute();

    await tx
      .update(employees)
      .set(updateEmployeeDTO)
      .where(eq(employees.id, updateEmployeeDTO.id))
      .execute();
  });

  return await employee(updateEmployeeDTO.id);
};

/// DELETE ONE TEACHER
export const deleteEmployee = async (id: number): Promise<number> => {
  const dbInstance = await db;
  const resutl = await dbInstance
    .delete(employees)
    .where(eq(employees.id, id))
    .execute();
  return resutl[0].insertId;
};
