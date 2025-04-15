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
