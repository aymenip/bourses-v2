import { DashboardIcon, PersonIcon, RulerSquareIcon } from "@radix-ui/react-icons";
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
        name: "forms",
        icon: <RulerSquareIcon />,
        path: "/forms",
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
        roles: ["USER"]
    },
    {
        name: "usersConferences",
        icon: <PersonIcon />,
        path: "/users/conferences",
        roles: ["USER"]
    },
    {
        name: "usersArticles",
        icon: <PersonIcon />,
        path: "/users/articles",
        roles: ["USER"]
    },
    {
        name: "usersBooks",
        icon: <PersonIcon />,
        path: "/users/books",
        roles: ["USER"]
    },
    {
        name: "usersTheses",
        icon: <PersonIcon />,
        path: "/users/theses",
        roles: ["USER"]
    },
]

