import { MatrialStatus } from "teacher/teacher.enums";

export class TeacherExportDTO {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    dob: Date;
    matrialStatus: MatrialStatus;
    highPostion: boolean;
    createdAt: Date;
    position: string;
    constructor(
        id: number,
        firstname: string,
        lastname: string,
        email: string,
        dob: Date,
        matrialStatus: MatrialStatus,
        highPostion: boolean,
        createdAt: Date,
        position: string
    ) {
        this.id = id,
            this.firstname = firstname,
            this.lastname = lastname,
            this.email = email,
            this.dob = dob,
            this.matrialStatus = matrialStatus,
            this.highPostion = highPostion,
            this.createdAt = createdAt,
            this.position = position
    }
}