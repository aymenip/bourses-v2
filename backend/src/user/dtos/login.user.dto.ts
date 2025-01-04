export class LoginUserDTO {
  email: string;
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

export class LoginUserOutputDTO {
  token: string;
  id: number;
  roleId: number;
  constructor(token: string, id: number, roleId: number) {
    this.token = token;
    this.id = id;
    this.roleId = roleId;
  }
}
