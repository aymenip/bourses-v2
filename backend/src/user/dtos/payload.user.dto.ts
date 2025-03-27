export class JwtResponsePayload {
  sub: number;
  email: string;
  positionId: number;
  firstname: string;
  lastname: string;
  constructor(
    sub: number,
    email: string,
    positionId: number,
    firstname: string,
    lastname: string
  ) {
    this.sub = sub;
    this.email = email;
    this.positionId = positionId;
    this.firstname = firstname;
    this.lastname = lastname;
  }
}
