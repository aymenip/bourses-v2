import { MatrialStatus } from "teacher/teacher.enums";

export class TeacherExportDTO {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    dob: Date;
    matrialStatus: MatrialStatus;
    age: number;
    debt: number;
    highPostion: boolean;
    createdAt: Date;
    position: string;
    tier: string;
    constructor(
        id: number,
        firstname: string,
        lastname: string,
        email: string,
        dob: Date,
        matrialStatus: MatrialStatus,
        age: number,
        debt: number,
        highPostion: boolean,
        createdAt: Date,
        position: string,
        tier: string,
    ) {
        this.id = id,
            this.firstname = firstname,
            this.lastname = lastname,
            this.email = email,
            this.dob = dob,
            this.matrialStatus = matrialStatus,
            this.age = age,
            this.debt = debt,
            this.highPostion = highPostion,
            this.createdAt = createdAt,
            this.position = position,
            this.tier = tier
    }
}