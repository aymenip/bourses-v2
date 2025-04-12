import express from "express";
import {
  CreateUserDTO,
  LoginUserDTO,
  LoginUserOutputDTO,
  UpdateUserDTO,
} from "../dtos";
import {
  getUserByEmail,
  getUserById,
  updateMe,
} from "../repository/user.repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { handleError } from "../../utils/errors";
import dotenv from "dotenv";

dotenv.config();

export const Me = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const id = req.user.sub;
    const me = await getUserById(Number(id));
    return res.status(200).json(me);
  } catch (error) {
    handleError(() => console.log(error));
    return res.sendStatus(400);
  }
};

export const UpdateMe = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const id = req.user.sub;
    const updateUserDTO: UpdateUserDTO = req.body;
    const me = await updateMe(updateUserDTO, id);
    return res.status(200).json(me);
  } catch (error) {
    handleError(() => console.log(error));
    return res.sendStatus(400);
  }
};

export const Login = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {

  try {
    const loginUserDto: LoginUserDTO = req.body;

    if (!loginUserDto) {
      return res.sendStatus(400);
    }

    let user = await getUserByEmail(loginUserDto.email);

    if (!user) {
      return res.sendStatus(400);
    }

    if (!(await bcrypt.compare(loginUserDto.password, user.password))) {
      return res.sendStatus(400);
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.roleId,
      fullname: `${user.firstname} ${user.lastname}`,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: process.env.EXPIRES_IN,
    });

    const response: LoginUserOutputDTO = new LoginUserOutputDTO(
      token,
      user.id,
      user.roleId,
      user.positionId
    ); // Create the response object

    return res.status(200).json(response); // Send response as JSON
  } catch (error) {
    handleError(() => console.log(error));
    return res.sendStatus(400);
  }
};

export const Register = async (createUserDTO: CreateUserDTO): Promise<any> => {
  try {
 
    if (!createUserDTO) {
      throw new Error();
    }
    const user = await getUserByEmail(createUserDTO.email);
    if (user) {
      throw new Error();
    }
    const hashedPassword = await bcrypt.hash(createUserDTO.password, 10);
    return { ...createUserDTO, password: hashedPassword };
  } catch (error) {
    handleError(() => console.log(error));
    throw new Error();
  }
};
