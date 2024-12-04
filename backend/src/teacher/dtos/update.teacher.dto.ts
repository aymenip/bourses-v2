import { MatrialStatus } from "teacher/teacher.enums";

export class UpdateTeacherDTO {
    id: number;
    firstname?: string;
    lastname?: string;
    email?: string;
    dob?: Date;
    matrialStatus?: MatrialStatus;
    highPostion?: boolean;
    positionId?: number;
    constructor(
        id: number,
        firstname?: string,
        lastname?: string,
        email?: string,
        dob?: Date,
        matrialStatus?: MatrialStatus,
        highPostion?: boolean,
        positionId?: number,
    ) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.dob = dob;
        this.matrialStatus = matrialStatus;
        this.highPostion = highPostion;
        this.positionId = positionId;
    }
}
