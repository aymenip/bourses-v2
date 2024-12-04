export class RoleDTO {
    id: number;
    code: string;
    title: string;
    constructor(
        id: number,
        code: string,
        title: string,
    ) {
        this.id = id;
        this.code = code;
        this.title = title;
    }
}