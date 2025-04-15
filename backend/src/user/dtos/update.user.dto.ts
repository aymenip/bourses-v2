import { MatrialStatus } from "user/user.enums";

export class UpdateUserDTO {
  id: number;
  firstname?: string;
  lastname?: string;
  dob?: Date;
  matrialStatus?: MatrialStatus;
  email?: string;
  is_active?: boolean;
  password_changed?: boolean;
  research_gate?: string;
  google_scholar?: string;
  new_password?: string;
  constructor(
    id: number,
    firstname?: string,
    lastname?: string,
    dob?: Date,
    matrialStatus?: MatrialStatus,
    email?: string,
    is_active?: boolean,
    password_changed?: boolean,
    research_gate?: string,
    google_scholar?: string,
    new_password?: string
  ) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.dob = dob;
    this.matrialStatus = matrialStatus;
    this.email = email;
    this.is_active = is_active;
    this.password_changed = password_changed;
    this.research_gate = research_gate;
    this.google_scholar = google_scholar;
    this.new_password = new_password;
  }
}
