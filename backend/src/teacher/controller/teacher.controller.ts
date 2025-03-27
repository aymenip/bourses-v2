import express from "express";
// import xlsx from "xlsx";
// import fs from 'fs';
// import moment from "moment";
// import { createTeacherFromRow } from "../utils";
import {
  CreateTeacherDTO,
  JwtTeacherResponsePayload,
  UpdateTeacherDTO,
} from "../dtos";
import {
  allTeachers,
  createTeacher,
  deleteTeacher,
  teacher,
  updateTeacher,
} from "../repository/teacher.repositories";
import { handleError } from "../../utils/errors";
import { CreateUserDTO, JwtResponsePayload } from "../../user/dtos";
import { Register } from "../../user/controller/user.controller";
import { generateToken } from "../../utils/auth";
import { mapCreateUserDTO, mapUpdateUserDTO } from "../../utils/mappers";

export const CreateTeacher = async (
  req: express.Request,
  res: express.Response
): Promise<CreateTeacherDTO | any> => {
  try {
    // Create an instance of UserDTO
    const createUserDTO: CreateUserDTO = mapCreateUserDTO(req);
    const createTeacherDTO: CreateTeacherDTO = new CreateTeacherDTO(
      Boolean(req.body.highPosition)
    );
    const createUserWithHashedPasswordDTO = await Register(createUserDTO);
    const createdUser = await createTeacher(
      createTeacherDTO,
      createUserWithHashedPasswordDTO
    );

    const rgisterResponsePayload: JwtResponsePayload &
      JwtTeacherResponsePayload = {
      email: createdUser.email,
      firstname: createdUser.firstname,
      lastname: createdUser.lastname,
      teacherId: createdUser.teacherId,
      sub: createdUser.id,
      positionId: createdUser.positionId,
    };

    const token = await generateToken(rgisterResponsePayload);

    return res.status(200).json({ token: token });
  } catch (error) {
    handleError((msg) => console.log(msg), "An error occurred");
    return res.sendStatus(400);
  }
};

export const AllTeachers = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const resutl = await allTeachers();
    return res.status(200).json(resutl);
  } catch (error) {
    handleError(() => console.log(error));
    return res.sendStatus(400);
  }
};

export const Teacher = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const resutl = await teacher(Number(id));
    return res.status(200).json(resutl);
  } catch (error) {
    handleError(() => console.log(error));
    return res.sendStatus(400);
  }
};

export const UpdateTeacher = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { teacherId, highPostion } = req.body;
    // Create an instance of UserDTO
    const updateTeacherDTO = new UpdateTeacherDTO(
      teacherId,
      Boolean(highPostion)
    );

    const updateUserDto = mapUpdateUserDTO(req);

    const result = await updateTeacher(updateTeacherDTO, updateUserDto);
    return res.status(200).json(result);
  } catch (error) {
    handleError(() => console.log(error));
    return res.sendStatus(400);
  }
};

export const DeleteTeacher = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  const { id } = req.params;
  try {
    const result = await deleteTeacher(Number(id));
    return res.status(200).json(result);
  } catch (error) {
    handleError(() => console.log(error));
    return res.sendStatus(400);
  }
};
