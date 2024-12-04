import { MatrialStatus } from "teacher/teacher.enums";

export class CreateUserDTO {
    firstname: string;
    lastname: string;
    dob: Date;
    matrialStatus: MatrialStatus;
    email: string;
    password: string;
    roleId: number;
    constructor(
        firstname: string,
        lastname: string,
        dob: Date,
        matrialStatus: MatrialStatus,
        email: string,
        password: string,
        roleId: number,
    ) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.dob = dob;
        this.matrialStatus = matrialStatus;
        this.email = email;
        this.password = password;
        this.roleId = roleId;
    }
}