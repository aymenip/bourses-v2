import { MatrialStatus } from "user/user.enums";

export class TeacherExportDTO {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  dob: Date;
  matrialStatus: MatrialStatus;
  highPostion: boolean;
  createdAt: Date;
  constructor(
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    dob: Date,
    matrialStatus: MatrialStatus,
    highPostion: boolean,
    createdAt: Date
  ) {
    (this.id = id),
      (this.firstname = firstname),
      (this.lastname = lastname),
      (this.email = email),
      (this.dob = dob),
      (this.matrialStatus = matrialStatus),
      (this.highPostion = highPostion),
      (this.createdAt = createdAt);
  }
}
