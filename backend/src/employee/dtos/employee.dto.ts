import { MatrialStatus } from "user/user.enums";

export class EmployeeDTO {
  employeeId: number;
  createdAt: Date;
  updatedAt: Date;
  constructor(employeeId: number, createdAt: Date, updatedAt: Date) {
    this.employeeId = employeeId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export class FullEmployeeDTO {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  dob: Date;
  matrialStatus: MatrialStatus;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    dob: Date,
    matrialStatus: MatrialStatus,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.dob = dob;
    this.matrialStatus = matrialStatus;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
