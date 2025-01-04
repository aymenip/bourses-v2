export class UpdateAdminDTO {
  id: number;
  adminId: number;
  permissionId?: number;
  constructor(id: number, adminId: number, permissionId?: number) {
    this.id = id;
    this.adminId = adminId;
    this.permissionId = permissionId;
  }
}
