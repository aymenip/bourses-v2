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
  positionId: number;
  position: string;
  is_active: boolean;
  password_changed: boolean;
  google_scholar?: string;
  research_gate?: string;
  constructor(
    token: string,
    id: number,
    roleId: number,
    positionId: number,
    position: string,
    is_active: boolean,
    password_changed: boolean,
    google_scholar?: string,
    research_gate?: string
  ) {
    this.token = token;
    this.id = id;
    this.roleId = roleId;
    this.positionId = positionId;
    this.position = position;
    this.is_active = is_active;
    this.password_changed = password_changed;
    this.google_scholar = google_scholar;
    this.research_gate = research_gate;
  }
}
