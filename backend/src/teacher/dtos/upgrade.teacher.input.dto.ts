export class UpgradeTeacherInputDTO {
    id: number;
    southernPrivilege: number;
    professionalExperience: number;
    constructor(
        id: number,
        southernPrivilege: number,
        professionalExperience: number,
    ) {
        this.id = id;
        this.southernPrivilege = southernPrivilege;
        this.professionalExperience = professionalExperience;
    }
}