import { MatrialStatus } from "teacher/teacher.enums";

export class TeacherDTO {
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
    updatedAt: Date;
    positionId: number;
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
        updatedAt: Date,
        positionId: number,
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
            this.updatedAt = updatedAt,
            this.positionId = positionId
    }
}