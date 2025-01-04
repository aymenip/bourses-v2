export function roleIdToRole(roleId: number | null) {
  switch (roleId) {
    case 1:
      return "ADMIN";
    case 2:
      return "TEACHER";
    case 3:
      return "EMPLOYER";
    case 4:
      return "STUDENT";
    default:
      return "STUDENT";
  }
}

export function roleToRoute(role: string | null) {
  switch (role) {
    case "ADMIN":
      return "/";
    case "TEACHER":
      return "/teachers";
    case "EMPLOYER":
      return "/employees";
    case "STUDENT":
      return "/students";
    default:
      return "/login";
  }
}
