import { db } from "../../db/setup";
import { users } from "../../db/schema";
import { CreateUserDTO, UpdateUserDTO, UserDTO } from "../dtos";
import { eq } from "drizzle-orm";
import { CAE } from "../../utils/constants";
import { MatrialStatus } from "teacher/teacher.enums";
import { MySqlTransaction } from "drizzle-orm/mysql-core";

export const createUser = async (
  createUserDto: CreateUserDTO,
  tx: MySqlTransaction<any, any>
): Promise<number> => {
  try {
    const result = await tx.insert(users).values(createUserDto).execute();
    return result[0].insertId;
  } catch (error) {
    console.log(error);
    throw new Error(CAE); // Handle errors appropriately
  }
};

/// GET USER BY EMAIL
export const getUserByEmail = async (
  email: string
): Promise<UserDTO | null> => {
  try {
    const dbInstance = await db; // Ensure db instance is awaited once
    const result = await dbInstance
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1); // Fetch only one result

    if (result.length === 0) {
      return null; // No user found
    }

    const user = result[0];
    return new UserDTO(
      user.id,
      user.firstname,
      user.lastname,
      user.dob,
      user.matrialStatus as MatrialStatus, // Ensure proper enum casting
      user.email,
      user.password,
      user.createdAt,
      user.updatedAt,
      user.roleId
    );
  } catch (error) {
    console.error("Error fetching user by email:", error); // Log the error for debugging
    return null; // Handle errors appropriately
  }
};

export const getUserById = async (id: number): Promise<UserDTO | null> => {
  try {
    const dbInstance = await db; // Ensure db instance is awaited once
    const result = await dbInstance
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1); // Fetch only one result

    if (result.length === 0) {
      return null; // No user found
    }

    const user = result[0];
    return new UserDTO(
      user.id,
      user.firstname,
      user.lastname,
      user.dob,
      user.matrialStatus as MatrialStatus, // Ensure proper enum casting
      user.email,
      user.password,
      user.createdAt,
      user.updatedAt,
      user.roleId
    );
  } catch (error) {
    console.error("Error fetching user by email:", error); // Log the error for debugging
    return null; // Handle errors appropriately
  }
};

export const updateMe = async (
  updateUserDTO: UpdateUserDTO,
  id: number
): Promise<UpdateUserDTO | null> => {
  try {
    const dbInstance = await db; // Ensure db is awaited once
    const result = await dbInstance
      .update(users)
      .set(updateUserDTO)
      .where(eq(users.id, id));

    if (result[0].affectedRows === 0) {
      return null; // No rows were updated
    }

    // Fetch the updated user to ensure the update was successful
    const updatedUser = await getUserById(id);
    if (!updatedUser) {
      return null; // User no longer exists
    }

    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update User"); // Handle errors appropriately
  }
};
