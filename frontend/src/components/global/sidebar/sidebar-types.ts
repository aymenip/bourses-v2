import { Route } from "@/constants/routes";

export type SidebarProps = {
  role: string;
  is_active?: boolean;
};

export type RouteItemProps = {
  route: Route;
  role: string;
  is_active: boolean;
  isOpen: boolean;
  exactMatch: boolean;
  t: (key: string) => string;
  onClick?: () => void;
};
