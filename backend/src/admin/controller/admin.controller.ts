import express from "express";
import {
  CreateAdminDTO,
  JwtAdminResponsePayload,
  UpdateAdminDTO,
} from "../dtos";
import {
  allAdmins,
  createAdmin,
  deleteAdmin,
  admin,
  updateAdmin,
} from "../repository/admin.repositories";
import { handleError } from "../../utils/errors";
import { CreateUserDTO, JwtResponsePayload } from "../../user/dtos";
import { Register } from "../../user/controller/user.controller";
import { generateToken } from "../../utils/auth";
import { mapCreateUserDTO, mapUpdateUserDTO } from "../../utils/mappers";

export const CreateAdmin = async (
  req: express.Request,
  res: express.Response
): Promise<CreateAdminDTO | any> => {
  try {
    const createUserDTO: CreateUserDTO = mapCreateUserDTO(req);
    const createAdminDTO: CreateAdminDTO = new CreateAdminDTO(
      req.body.permissionId
    );

    const createUserWithHashedPasswordDTO = await Register(createUserDTO);
    const createdUser = await createAdmin(
      createAdminDTO,
      createUserWithHashedPasswordDTO
    );
    const rgisterResponsePayload: JwtResponsePayload & JwtAdminResponsePayload =
      {
        email: createdUser.email,
        firstname: createdUser.firstname,
        lastname: createdUser.lastname,
        adminId: createdUser.adminId,
        permissionId: createdUser.permissionId,
        sub: createdUser.id,
        positionId: createUserDTO.positionId,
      };

    const token = await generateToken(rgisterResponsePayload);

    return res.status(200).json({ token: token });
  } catch (error) {
    handleError((msg) => console.log(msg), "An error occurred");
    return res.sendStatus(400);
  }
};

export const AllAdmins = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const resutl = await allAdmins();
    return res.status(200).json(resutl);
  } catch (error) {
    handleError(() => console.log(error));
    return res.sendStatus(400);
  }
};

export const Admin = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const resutl = await admin(Number(id));
    return res.status(200).json(resutl);
  } catch (error) {
    handleError(() => console.log(error));
    return res.sendStatus(400);
  }
};

export const UpdateAdmin = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { userId, adminId, permissionId } = req.body;
    // Create an instance of UserDTO
    const updateAdminDTO = new UpdateAdminDTO(userId, adminId, permissionId);

    const updateUserDto = mapUpdateUserDTO(req);

    const result = await updateAdmin(updateAdminDTO, updateUserDto);
    return res.status(200).json(result);
  } catch (error) {
    handleError(() => console.log(error));
    return res.sendStatus(400);
  }
};

export const DeleteAdmin = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  const { id } = req.params;
  try {
    const result = await deleteAdmin(Number(id));
    return res.status(200).json(result);
  } catch (error) {
    handleError(() => console.log(error));
    return res.sendStatus(400);
  }
};
