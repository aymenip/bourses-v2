import { TRole } from "@/types/roles";
import { create } from "zustand";

interface RoleState {
  roles: TRole[];
  setRoles: (roles: TRole[]) => void;
}

export const useRoleStore = create<RoleState>((set) => ({
  roles: [],
  setRoles: (roles) => set({ roles: roles }),
}));
