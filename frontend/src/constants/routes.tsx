import { DashboardIcon, PersonIcon } from "@radix-ui/react-icons";

export type Route = {
    name: string,
    path: string,
    icon: React.ReactNode,
}

export const routes: Route[] = [
    {
        name: "dashboard",
        icon: <DashboardIcon />,
        path: "/admin/dashboard"
    },
    {
        name: "teachers",
        icon: <PersonIcon />,
        path: "/admin/teachers"
    },
    {
        name: "students",
        icon: <PersonIcon />,
        path: "/admin/students"
    },
    {
        name: "employees",
        icon: <PersonIcon />,
        path: "/admin/employees"
    },
]