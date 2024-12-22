import { MatrialStatus } from "../../teacher/teacher.enums";

export class UpdateUserDTO {
    id: number;
    firstname?: string;
    lastname?: string;
    dob?: Date;
    matrialStatus?: MatrialStatus;
    email?: string;
    constructor(
        id: number,
        firstname: string,
        lastname: string,
        dob: Date,
        matrialStatus: MatrialStatus,
        email: string,
    ) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.dob = dob;
        this.matrialStatus = matrialStatus;
        this.email = email;
    }
}