import express from "express";

import {
  CreateEmployeeDTO,
  JwtEmployeeResponsePayload,
  UpdateEmployeeDTO,
} from "../dtos";
import {
  allEmployees,
  createEmployee,
  deleteEmployee,
  employee,
  updateEmployee,
} from "../repository/employee.repositories";
import { handleError } from "../../utils/errors";
import { CreateUserDTO, JwtResponsePayload } from "../../user/dtos";
import { Register } from "../../user/controller/user.controller";
import { generateToken } from "../../utils/auth";
import { mapCreateUserDTO, mapUpdateUserDTO } from "../../utils/mappers";

export const CreateEmployee = async (
  req: express.Request,
  res: express.Response
): Promise<CreateEmployeeDTO | any> => {
  try {
    // Create an instance of UserDTO
    const createUserDTO: CreateUserDTO = mapCreateUserDTO(req);
    const createEmployeeDTO: CreateEmployeeDTO = new CreateEmployeeDTO();
    const createUserWithHashedPasswordDTO = await Register(createUserDTO);
    const createdUser = await createEmployee(
      createEmployeeDTO,
      createUserWithHashedPasswordDTO
    );

    const rgisterResponsePayload: JwtResponsePayload &
      JwtEmployeeResponsePayload = {
      email: createdUser.email,
      firstname: createdUser.firstname,
      lastname: createdUser.lastname,
      employeeId: createdUser.employeeId,
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

export const AllEmployees = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const resutl = await allEmployees();
    return res.status(200).json(resutl);
  } catch (error) {
    handleError(() => console.log(error));
    return res.sendStatus(400);
  }
};

export const Employee = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const resutl = await employee(Number(id));
    return res.status(200).json(resutl);
  } catch (error) {
    handleError(() => console.log(error));
    return res.sendStatus(400);
  }
};

export const UpdateEmployee = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { employeeId, highPostion } = req.body;
    // Create an instance of UserDTO
    const updateEmployeeDTO = new UpdateEmployeeDTO(employeeId);

    const updateUserDto = mapUpdateUserDTO(req);

    const result = await updateEmployee(updateEmployeeDTO, updateUserDto);
    return res.status(200).json(result);
  } catch (error) {
    handleError(() => console.log(error));
    return res.sendStatus(400);
  }
};

export const DeleteEmployee = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  const { id } = req.params;
  try {
    const result = await deleteEmployee(Number(id));
    return res.status(200).json(result);
  } catch (error) {
    handleError(() => console.log(error));
    return res.sendStatus(400);
  }
};
