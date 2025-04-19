import { Route, routes } from "@/constants/routes"
import { cn } from "@/lib/utils"
import { Link, useLocation } from "@tanstack/react-router"
import { useTranslation } from "react-i18next"
import { ModeToggle } from "../mode-toggle"
import { LanguageToggle } from "../language-toggle"
import { MenuIcon } from "lucide-react"
import PreferencesSettings from "../preferences-settings"
import Logo from "./logo"
import { Button } from "../ui/button"
import { motion, useAnimationControls } from "framer-motion"
import { useEffect, useState } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { useMediaQuery } from "../../hooks/use-media-query"
import MobileSidebar from "./MobilerSidebar"
import DesktopSidebar from "./DesktopSideBar"


const containerVariants = {
    close: {
        width: "5.1rem",
        transition: {
            type: "spring",
            damping: 18,
            duration: 0.2
        }
    },
    open: {
        width: "16rem",
        transition: {
            type: "spring",
            damping: 18,
            duration: 0.2
        }
    },
}

type SidebarProps = {
    role: string;
    is_active?: boolean
}

function Sidebar({ role, is_active = true }: SidebarProps) {
    const [t, _] = useTranslation("translation")
    const [isOpen, setIsOpen] = useState(false);
    const isMobile = useMediaQuery("(max-width: 768px)");
    const containerControls = useAnimationControls();
    const location = useLocation();
    useEffect(() => {
        if (isOpen) {
            containerControls.start("open")
        } else {
            containerControls.start("close")
        }
    }, [isOpen])

    useEffect(() => {
        if (isMobile) {
            setIsOpen(false);
        }
    }, [isMobile]);


    const handleOpenClose = () => {
        setIsOpen(!isOpen);
    };


    const getExactMatch = (path: string) => {
        const segments = location.pathname.split("/");
        const basePath = `/${segments[segments.length > 2 ? 2 : 1]}`;
        if (role === "ADMIN" || (role === "USER" && path === "/users")) return basePath === path;
        if (role === "USER") return `/users${basePath}` === path;

        return false;
    };

    return isMobile ? <MobileSidebar role={role} is_active/> : <DesktopSidebar role={role} is_active/>
}

export default Sidebar