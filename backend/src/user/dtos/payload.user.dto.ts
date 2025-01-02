export class JwtPayloadResponse {
  sub: number;
  email: string;
  roleId: number;
  firstname: string;
  lastname: string;
  constructor(
    sub: number,
    email: string,
    roleId: number,
    firstname: string,
    lastname: string
  ) {
    this.sub = sub;
    this.email = email;
    this.roleId = roleId;
    this.firstname = firstname;
    this.lastname = lastname;
  }
}
