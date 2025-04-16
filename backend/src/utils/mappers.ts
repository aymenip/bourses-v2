import express from "express";
import { CreateUserDTO, UpdateUserDTO } from "../user/dtos";
import { MatrialStatus } from "../user/user.enums";
export const mapCreateUserDTO = (req: express.Request): CreateUserDTO => {
  return new CreateUserDTO(
    req.body.firstname,
    req.body.lastname,
    new Date(req.body.dob),
    req.body.matrialStatus as MatrialStatus,
    req.body.email,
    req.body.password,
    req.body.positionId,
    req.body.roleId,
    undefined,
    undefined,
    undefined,
    undefined,
    req.body.notify_user
  );
};

export const mapUpdateUserDTO = (req: express.Request): UpdateUserDTO => {
  return new UpdateUserDTO(
    req.body.userId,
    req.body.firstname,
    req.body.lastname,
    new Date(req.body.dob),
    req.body.matrialStatus as MatrialStatus,
    req.body.email
  );
};
