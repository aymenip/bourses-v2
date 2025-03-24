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


const containerVariants = {
    close: {
        width: "5rem",
        transition: {
            type: "spring",
            damping: 15,
            duration: 0.5
        }
    },
    open: {
        width: "16rem",
        transition: {
            type: "spring",
            damping: 15,
            duration: 0.5
        }
    }
}

type SidebarProps = {
    role: string;
}

function Sidebar({ role }: SidebarProps) {
    const [t, _] = useTranslation("translation")
    const [isOpen, setIsOpen] = useState(false);
    const containerControls = useAnimationControls();
    const location = useLocation();
    useEffect(() => {
        if (isOpen) {
            containerControls.start("open")
        } else {
            containerControls.start("close")
        }
    }, [isOpen])

    const handleOpenClose = () => {
        setIsOpen(!isOpen)
    }
    return (
        <motion.nav
            variants={containerVariants}
            initial={"close"}
            animate={containerControls}
            className={
                cn("header-background overflow-hidden",
                    { "header-collapsed": !isOpen },
                )
            }>

            <div className="w-full mb-5">
                <Logo showText={!isOpen} />
            </div>
            <div className="flex flex-col w-full gap-3 h-full">
                {
                    routes.map((route: Route) => {
                        const exactMatch = `/${location.pathname.split("/")[1]}` === route.path;
                        if (route.roles.includes(role)) return <Link key={route.name} to={route.path} className={cn("header-item", { "header-item-active": exactMatch })}>
                            {
                                () => <div className={cn("flex gap-2 items-center", { "justify-center": !isOpen })}>
                                    {
                                        !isOpen ? (
                                            <TooltipProvider delayDuration={1}>
                                                <Tooltip >
                                                    <TooltipTrigger className="flex items-center gap-x-1">
                                                        {exactMatch && <span className="block w-1 h-3 rounded-full bg-primary/90  neon-shadow" />}
                                                        {route.icon}
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>{t(route.name)}</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        ) : (
                                            <>
                                                {exactMatch && <span className="block w-1 h-3 rounded-full bg-primary/90 neon-shadow" />}
                                                {route.icon}
                                                {isOpen && t(route.name)}
                                            </>
                                        )
                                    }

                                </div>
                            }
                        </Link>
                    })
                }
            </div>

            <div className={cn("flex gap-3 w-full items-center justify-around", { "flex-col": !isOpen })}>
                <Button onClick={handleOpenClose} variant={"secondary"} size={"icon"}><MenuIcon /></Button>
                <ModeToggle />
                <LanguageToggle />
                <PreferencesSettings />
            </div>

        </motion.nav>
    )
}

export default Sidebar