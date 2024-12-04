import { MatrialStatus } from "teacher/teacher.enums";

export class UpdateUserDTO {
    firstname?: string;
    lastname?: string;
    dob?: Date;
    matrialStatus?: MatrialStatus;
    email?: string;
    constructor(
        firstname: string,
        lastname: string,
        dob: Date,
        matrialStatus: MatrialStatus,
        email: string,
    ) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.dob = dob;
        this.matrialStatus = matrialStatus;
        this.email = email;
    }
}