export class JwtAdminResponsePayload {
  adminId: number;
  permissionId: number;
  constructor(adminId: number, permissionId: number) {
    this.adminId = adminId;
    this.permissionId = permissionId;
  }
}
