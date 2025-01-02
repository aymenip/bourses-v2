import { MatrialStatus } from "teacher/teacher.enums";

export class TeacherDTO {
  teacherId: number;
  highPostion: boolean;
  createdAt: Date;
  updatedAt: Date;
  positionId: number;
  constructor(
    teacherId: number,
    highPostion: boolean,
    createdAt: Date,
    updatedAt: Date,
    positionId: number
  ) {
    this.teacherId = teacherId;
    this.highPostion = highPostion;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.positionId = positionId;
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
  positionId: number;

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
    positionId: number
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
    this.positionId = positionId;
  }
}


