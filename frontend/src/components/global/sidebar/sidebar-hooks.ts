import { useLocation } from "@tanstack/react-router";

export const useActiveRoute = (role: string) => {
  const location = useLocation();

  const getExactMatch = (path: string) => {
    const segments = location.pathname.split("/");
    const basePath = `/${segments[segments.length > 2 ? 2 : 1]}`;

    if (role === "ADMIN" || (role === "USER" && path === "/users")) {
      return basePath === path;
    }
    if (role === "USER") {
      return `/users${basePath}` === path;
    }
    return false;
  };

  return { getExactMatch };
};
