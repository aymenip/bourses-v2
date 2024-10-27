export class UserDTO {
    password: string;
    id: number;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    roleId: number;
    constructor(
        password: string,
        id: number,
        name: string,
        email: string,
        createdAt: Date,
        updatedAt: Date,
        roleId: number,
    ) {
        this.password = password;
        this.id = id;
        this.name = name;
        this.email = email;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.roleId = roleId;
    }
}