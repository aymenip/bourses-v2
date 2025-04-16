import { db } from "../../conference/db/setup";
import { admins, users } from "../../conference/db/schema";
import { eq } from "drizzle-orm";
import { CreateAdminDTO, AdminDTO, UpdateAdminDTO } from "../dtos";
import { MatrialStatus } from "../../user/user.enums";
import { handleError } from "../../utils/errors";
import { CreateUserDTO, UpdateUserDTO, UserDTO } from "../../user/dtos";
import { createUser } from "../../user/repository/user.repository";
import { CAE } from "../../utils/constants";
import { MySqlTransaction } from "drizzle-orm/mysql-core";

// CREATE ONE TEACHER
export const createAdmin = async (
  createAdmin: CreateAdminDTO,
  createUserDTO: CreateUserDTO
): Promise<AdminDTO & UserDTO> => {
  try {
    const dbInstance = await db;
    const adminId = await dbInstance.transaction(
      async (tx: MySqlTransaction<any, any>) => {
        const userId = await createUser(createUserDTO, tx);
        const result = await tx
          .insert(admins)
          .values({ ...createAdmin, userId: userId })
          .execute();
        return result[0].insertId;
      }
    );

    const createdAdmin = await admin(adminId);
    return createdAdmin; // Assuming `insertId` is returned
  } catch (error) {
    handleError((error) => console.log(error));
    throw new Error(CAE); // Handle errors appropriately
  }
};

/// GET ALL TEACHERS
export const allAdmins = async (): Promise<(AdminDTO & UserDTO)[]> => {
  const dbInstance = await db;

  const results = await dbInstance
    .select()
    .from(admins)
    .innerJoin(users, eq(admins.userId, users.id));

  return results.map((result) => {
    const adminData = result.admins;
    const userData = result.users;

    const adminDTO = new AdminDTO(adminData.id, adminData.permissionId);

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
      userData.positionId
    );

    return { ...adminDTO, ...userDTO };
  });
};

/// GET ONE TEACHER
export const admin = async (id: number): Promise<AdminDTO & UserDTO> => {
  const dbInstance = await db;

  const result = await dbInstance
    .select()
    .from(admins)
    .innerJoin(users, eq(admins.userId, users.id))
    .where(eq(admins.id, id))
    .limit(1); // Ensures only one result is fetched

  if (result.length === 0) {
    throw new Error(`Admin with ID ${id} not found`);
  }

  const adminData = result[0].admins;
  const userData = result[0].users;
  const adminDTO = new AdminDTO(adminData.id, adminData.permissionId);
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
    userData.positionId
  );

  return { ...adminDTO, ...userDTO };
};

/// UPDATE ONE TEACHER
export const updateAdmin = async (
  updateAdminDTO: UpdateAdminDTO,
  updateUserDto: UpdateUserDTO
): Promise<AdminDTO> => {
  const dbInstance = await db;
  await dbInstance.transaction(async (tx) => {
    const updatedUser = await dbInstance
      .update(users)
      .set(updateUserDto)
      .where(eq(users.id, updateUserDto.id))
      .execute();
    const updatedAdmin = await dbInstance
      .update(admins)
      .set(updateAdminDTO)
      .where(eq(admins.id, updateAdminDTO.id))
      .execute();
  });

  return await admin(updateAdminDTO.id);
};

/// DELETE ONE TEACHER
export const deleteAdmin = async (id: number): Promise<number> => {
  const dbInstance = await db;
  const resutl = await dbInstance
    .delete(admins)
    .where(eq(admins.id, id))
    .execute();
  return resutl[0].insertId;
};
