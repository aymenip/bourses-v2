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
        path: "/"
    },
    {
        name: "teachers",
        icon: <PersonIcon />,
        path: "/teachers"
    },
    {
        name: "students",
        icon: <PersonIcon />,
        path: "/students"
    },
    {
        name: "employees",
        icon: <PersonIcon />,
        path: "/employees"
    },
]

