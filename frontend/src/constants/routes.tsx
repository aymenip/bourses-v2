import { BookOpen, FileQuestion, LayoutDashboard } from "lucide-react"

export type Route = {
    name: string,
    path: string,
    icon: React.ReactNode,
}

export const routes: Route[] = [
    {
        name: "dashboard",
        icon: <LayoutDashboard />,
        path: "/"
    },
    {
        name: "teachers",
        icon: <BookOpen />,
        path: "/teachers"
    },
]