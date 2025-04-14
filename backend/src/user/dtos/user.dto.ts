import { MatrialStatus } from "user/user.enums";

export class UserDTO {
  id: number;
  firstname: string;
  lastname: string;
  dob: Date;
  matrialStatus: MatrialStatus;
  email: string;
  password: string;
  is_active: boolean;
  password_changed: boolean;
  createdAt: Date;
  updatedAt: Date;
  positionId: number;
  roleId: number;
  research_gate?: string;
  google_scholar?: string;
  constructor(
    id: number,
    firstname: string,
    lastname: string,
    dob: Date,
    matrialStatus: MatrialStatus,
    email: string,
    password: string,
    is_active: boolean,
    password_changed: boolean,
    createdAt: Date,
    updatedAt: Date,
    positionId: number,
    roleId: number,
    research_gate?: string,
    google_scholar?: string
  ) {
    this.password = password;
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.dob = dob;
    this.matrialStatus = matrialStatus;
    this.email = email;
    this.is_active = is_active;
    this.password_changed = password_changed;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.positionId = positionId;
    this.roleId = roleId;
    this.research_gate = research_gate;
    this.google_scholar = google_scholar;
  }
}
