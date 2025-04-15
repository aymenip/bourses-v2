import { PersonIcon } from "@radix-ui/react-icons";
import { LayoutDashboard, PencilRuler, GraduationCap, BriefcaseBusiness, Notebook, Newspaper, BookOpenText, Library, Shield } from "lucide-react";
export type Route = {
    name: string,
    path: string,
    icon: React.ReactNode,
    roles: string[],
}

export const routes: Route[] = [
    {
        name: "dashboard",
        icon: <LayoutDashboard className="w-4 h-4" />,
        path: "/",
        roles: ["ADMIN"]
    },
    {
        name: "forms",
        icon: <PencilRuler className="w-4 h-4" />,
        path: "/forms",
        roles: ["ADMIN"]
    },
    {
        name: "teachers",
        icon: <Notebook className="w-4 h-4" />,
        path: "/teachers",
        roles: ["ADMIN"]
    },
    {
        name: "students",
        icon: <GraduationCap className="w-4 h-4" />,
        path: "/students",
        roles: ["ADMIN"]
    },
    {
        name: "employees",
        icon: <BriefcaseBusiness className="w-4 h-4" />,
        path: "/employees",
        roles: ["ADMIN"]
    },
    {
        name: "usersDashboard",
        icon: <LayoutDashboard className="w-4 h-4" />,
        path: "/users",
        roles: ["USER"]
    },
    {
        name: "usersConferences",
        icon: <PersonIcon className="w-4 h-4" />,
        path: "/users/conferences",
        roles: ["USER"]
    },
    {
        name: "usersArticles",
        icon: <Newspaper className="w-4 h-4" />,
        path: "/users/articles",
        roles: ["USER"]
    },
    {
        name: "usersBooks",
        icon: <BookOpenText className="w-4 h-4" />,
        path: "/users/books",
        roles: ["USER"]
    },
    {
        name: "usersTheses",
        icon: <Library className="w-4 h-4" />,
        path: "/users/theses",
        roles: ["USER"]
    },
    {
        name: "usersCertificates",
        icon: <Shield className="w-4 h-4" />,
        path: "/users/certificates",
        roles: ["USER"]
    },
]

