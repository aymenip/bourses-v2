import { DashboardIcon, PersonIcon, ReloadIcon } from "@radix-ui/react-icons";

export type Route = {
    name: string,
    path: string,
    icon: React.ReactNode,
    roles: string[],
}

export const routes: Route[] = [
    {
        name: "dashboard",
        icon: <DashboardIcon />,
        path: "/",
        roles: ["ADMIN"]
    },
    {
        name: "teachers",
        icon: <PersonIcon />,
        path: "/teachers",
        roles: ["ADMIN"]
    },
    {
        name: "students",
        icon: <PersonIcon />,
        path: "/students",
        roles: ["ADMIN"]
    },
    {
        name: "employees",
        icon: <PersonIcon />,
        path: "/employees",
        roles: ["ADMIN"]
    },
    {
        name: "usersDashboard",
        icon: <DashboardIcon />,
        path: "/users/dashboard",
        roles: ["TEACHER", "STUDENT", "EMPLOYEE"]
    },
    {
        name: "usersTeachers",
        icon: <PersonIcon />,
        path: "/users/teachers",
        roles: ["TEACHER", "STUDENT", "EMPLOYEE"]
    },
    {
        name: "usersEmployees",
        icon: <PersonIcon />,
        path: "/users/employees",
        roles: ["TEACHER", "STUDENT", "EMPLOYEE"]
    },
]

