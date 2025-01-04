import { DashboardIcon, PersonIcon } from "@radix-ui/react-icons";
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
        path: "/users",
        roles: ["TEACHER", "STUDENT", "EMPLOYEE"]
    },
    {
        name: "usersConferences",
        icon: <PersonIcon />,
        path: "/users/conferences",
        roles: ["TEACHER", "STUDENT", "EMPLOYEE"]
    },
    {
        name: "usersArticles",
        icon: <PersonIcon />,
        path: "/users/articles",
        roles: ["TEACHER", "STUDENT", "EMPLOYEE"]
    },
    {
        name: "usersBooks",
        icon: <PersonIcon />,
        path: "/users/books",
        roles: ["TEACHER", "STUDENT", "EMPLOYEE"]
    },
]

