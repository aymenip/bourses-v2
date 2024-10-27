export class LoginUserDTO {
    email: string;
    password: string;

    constructor(
        email: string,
        password: string,
    ) {
        this.email = email;
        this.password = password;
    }
}

export class LoginUserOutputDTO {
    token: string;
    constructor(
        token: string,
    ) {
        this.token = token
    }
}