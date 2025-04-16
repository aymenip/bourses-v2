import { MatrialStatus } from "user/user.enums";

export class CreateUserDTO {
  firstname: string;
  lastname: string;
  dob: Date;
  matrialStatus: MatrialStatus;
  email: string;
  password: string;
  positionId: number;
  roleId: number;
  is_active?: boolean;
  password_changed?: boolean;
  research_gate?: string;
  google_scholar?: string;
  notify_user?: boolean;
  constructor(
    firstname: string,
    lastname: string,
    dob: Date,
    matrialStatus: MatrialStatus,
    email: string,
    password: string,
    positionId: number,
    roleId: number,
    is_active?: boolean,
    password_changed?: boolean,
    research_gate?: string,
    google_scholar?: string,
    notify_user?: boolean
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.dob = dob;
    this.matrialStatus = matrialStatus;
    this.email = email;
    this.password = password;
    this.positionId = positionId;
    this.roleId = roleId;
    this.is_active = is_active;
    this.password_changed = password_changed;
    this.research_gate = research_gate;
    this.google_scholar = google_scholar;
    this.notify_user = notify_user;
  }
}
