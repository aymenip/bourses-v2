export function roleIdToRole(roleId: number | null) {
  switch (roleId) {
    case 1:
      return "ADMIN";
    case 2:
      return "USER";
    default:
      return "USER";
  }
}
export function positionIdToPermission(positionId: number | null) {
  switch (positionId) {
    case 1:
      return "mca";
    case 2:
      return "mcb";
    case 3:
      return "pro";
    case 4:
      return "phd";
    default:
      return "emp";
  }
}

export function roleToRoute(role: string | null) {
  switch (role) {
    case "ADMIN":
      return "/";
    case "USER":
      return "users";
    default:
      return "/login";
  }
}
