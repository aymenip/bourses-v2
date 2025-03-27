import { MatrialStatus } from "user/user.enums";

export class UserDTO {
  id: number;
  firstname: string;
  lastname: string;
  dob: Date;
  matrialStatus: MatrialStatus;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  positionId: number;
  roleId: number;
  constructor(
    id: number,
    firstname: string,
    lastname: string,
    dob: Date,
    matrialStatus: MatrialStatus,
    email: string,
    password: string,
    createdAt: Date,
    updatedAt: Date,
    positionId: number,
    roleId: number
  ) {
    this.password = password;
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.dob = dob;
    this.matrialStatus = matrialStatus;
    this.email = email;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.positionId = positionId;
    this.roleId = roleId;
  }
}
