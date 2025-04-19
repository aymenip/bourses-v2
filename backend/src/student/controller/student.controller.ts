import express from "express";

import {
  CreateStudentDTO,
  JwtStudentResponsePayload,
  UpdateStudentDTO,
} from "../dtos";
import {
  allStudents,
  createStudent,
  deleteStudent,
  student,
  updateStudent,
} from "../repository/student.repositories";
import { handleError } from "../../utils/errors";
import { CreateUserDTO, JwtResponsePayload } from "../../user/dtos";
import { Register } from "../../user/controller/user.controller";
import { generateToken } from "../../utils/auth";
import { mapCreateUserDTO, mapUpdateUserDTO } from "../../utils/mappers";

export const CreateStudent = async (
  req: express.Request,
  res: express.Response
): Promise<CreateStudentDTO | any> => {
  try {
    // Create an instance of UserDTO
    const createUserDTO: CreateUserDTO = mapCreateUserDTO(req);
    const createStudentDTO: CreateStudentDTO = new CreateStudentDTO();
    const createUserWithHashedPasswordDTO = await Register(createUserDTO);
    const createdUser = await createStudent(
      createStudentDTO,
      createUserWithHashedPasswordDTO
    );

    const rgisterResponsePayload: JwtResponsePayload &
      JwtStudentResponsePayload = {
      email: createdUser.email,
      firstname: createdUser.firstname,
      lastname: createdUser.lastname,
      studentId: createdUser.studentId,
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

export const AllStudents = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const resutl = await allStudents();
    return res.status(200).json(resutl);
  } catch (error) {
    handleError(() => console.log(error));
    return res.sendStatus(400);
  }
};

export const Student = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const resutl = await student(Number(id));
    return res.status(200).json(resutl);
  } catch (error) {
    handleError(() => console.log(error));
    return res.sendStatus(400);
  }
};

export const UpdateStudent = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { studentId, highPostion } = req.body;
    // Create an instance of UserDTO
    const updateStudentDTO = new UpdateStudentDTO(studentId);

    const updateUserDto = mapUpdateUserDTO(req);

    const result = await updateStudent(updateStudentDTO, updateUserDto);
    return res.status(200).json(result);
  } catch (error) {
    handleError(() => console.log(error));
    return res.sendStatus(400);
  }
};

export const DeleteStudent = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  const { id } = req.params;
  try {
    const result = await deleteStudent(Number(id));
    return res.status(200).json(result);
  } catch (error) {
    handleError(() => console.log(error));
    return res.sendStatus(400);
  }
};
