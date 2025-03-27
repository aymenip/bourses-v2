import { MatrialStatus } from "user/user.enums";

export class TeacherDTO {
  teacherId: number;
  highPostion: boolean;
  createdAt: Date;
  updatedAt: Date;
  constructor(
    teacherId: number,
    highPostion: boolean,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.teacherId = teacherId;
    this.highPostion = highPostion;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export class FullTeacherDTO {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  dob: Date;
  matrialStatus: MatrialStatus;
  highPostion: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    dob: Date,
    matrialStatus: MatrialStatus,
    highPostion: boolean,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.dob = dob;
    this.matrialStatus = matrialStatus;
    this.highPostion = highPostion;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}


