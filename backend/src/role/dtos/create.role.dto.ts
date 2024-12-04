export class CreateRoleDTO {
    code: string;
    title: string;
    constructor(
        code: string,
        title: string,
    ) {
        this.code = code;
        this.title = title;
    }
}