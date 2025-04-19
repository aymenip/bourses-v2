import { Route, routes } from "@/constants/routes"
import { cn } from "@/lib/utils"
import { Link, useLocation } from "@tanstack/react-router"
import { useTranslation } from "react-i18next"
import { ModeToggle } from "../mode-toggle"
import { LanguageToggle } from "../language-toggle"
import { MenuIcon, X } from "lucide-react"
import PreferencesSettings from "../preferences-settings"
import Logo from "./logo"
import { Button } from "../ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { useMediaQuery } from "../../hooks/use-media-query"

const containerVariants = {
    close: {
        width: "5.1rem",
        transition: {
            type: "spring",
            damping: 15,
            duration: 0.3
        }
    },
    open: {
        width: "16rem",
        transition: {
            type: "spring",
            damping: 15,
            duration: 0.3
        }
    },
    mobileClose: {
        x: "-100%",
        opacity: 0,
        transition: {
            type: "spring",
            damping: 20,
            duration: 0.3
        }
    },
    mobileOpen: {
        x: 0,
        opacity: 1,
        transition: {
            type: "spring",
            damping: 20,
            duration: 0.3
        }
    }
}

const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.5 }
}

type SidebarProps = {
    role: string;
    is_active?: boolean
}

function MobileSidebar({ role, is_active = true }: SidebarProps) {
    const [t] = useTranslation("translation")
    const [isOpen, setIsOpen] = useState(false)
    const isMobile = useMediaQuery("(max-width: 768px)")
    const location = useLocation()

    // Auto-close on mobile when route changes
    useEffect(() => {
        if (isMobile) {
            setIsOpen(false)
        }
    }, [location.pathname])

    // Toggle sidebar state
    const toggleSidebar = () => {
        setIsOpen(!isOpen)
    }

    // Get active route
    const getExactMatch = (path: string) => {
        const segments = location.pathname.split("/")
        const basePath = `/${segments[segments.length > 2 ? 2 : 1]}`
        if (role === "ADMIN" || (role === "USER" && path === "/users")) return basePath === path
        if (role === "USER") return `/users${basePath}` === path
        return false
    }

    return (
        <>
            {/* Floating Mobile Button */}
            {isMobile && (
                <motion.div
                    className="fixed bottom-6 left-6 z-40 md:hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <Button
                        size="icon"
                        className="rounded-full shadow-lg h-12 w-12"
                        onClick={toggleSidebar}
                    >
                        {isOpen ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
                    </Button>
                </motion.div>
            )}

            {/* Mobile Overlay */}
            <AnimatePresence>
                {isMobile && isOpen && (
                    <motion.div
                        key="overlay"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={overlayVariants}
                        className="fixed inset-0 bg-black z-30 md:hidden"
                        onClick={toggleSidebar}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.nav
                variants={containerVariants}
                initial={isMobile ? "mobileClose" : "close"}
                animate={
                    isMobile
                        ? isOpen ? "mobileOpen" : "mobileClose"
                        : isOpen ? "open" : "close"
                }
                className={cn(
                    "fixed md:relative h-screen flex flex-col border-r bg-background p-4 z-40 ",
                    "shadow-lg md:shadow-none"
                )}
            >
                {/* Desktop Logo */}
                <div className="w-full mb-5 hidden md:block">
                    <Logo showText={!isOpen} />
                </div>

                {/* Mobile Header */}
                {isMobile && (
                    <div className="flex items-center justify-between mb-5 md:hidden">
                        <Logo showText={true} />
                        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                            <X className="h-5 w-5" />
                        </Button>
                    </div>
                )}

                {/* Navigation Links */}
                <div className="flex-1 overflow-y-auto">
                    <div className="flex flex-col gap-3">
                        {routes.map((route: Route) => {
                            if (!route.roles.includes(role)) return null

                            const exactMatch = getExactMatch(route.path)
                            return (
                                <Link
                                    key={route.name}
                                    to={route.path}
                                    className={cn(
                                        "header-item hover:bg-accent/50 transition-colors",
                                        { "header-item-active bg-accent": exactMatch }
                                    )}
                                >
                                    <div className={cn("flex gap-2 items-center", {
                                        "justify-center": !isOpen && !isMobile
                                    })}>
                                        {(!isOpen && !isMobile) ? (
                                            <TooltipProvider delayDuration={100}>
                                                <Tooltip>
                                                    <TooltipTrigger className="flex items-center">
                                                        {route.icon}
                                                    </TooltipTrigger>
                                                    <TooltipContent side="right">
                                                        <p>{t(route.name)}</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        ) : (
                                            <>
                                                {route.icon}
                                                <motion.span
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: isOpen ? 1 : 0 }}
                                                    className="whitespace-nowrap"
                                                >
                                                    {t(route.name)}
                                                </motion.span>
                                            </>
                                        )}
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>

                {/* Bottom Controls */}
                <div className={cn(
                    "border-t",
                    "flex gap-3 items-center",
                    isOpen || isMobile ? "justify-between" : "justify-center"
                )}>
                    {(!isMobile || isOpen) && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isOpen ? 1 : 0 }}
                            className="flex gap-3"
                        >
                            <ModeToggle />
                            <LanguageToggle />
                        </motion.div>
                    )}

                    <Link
                        to="/users/settings"
                        className={cn(
                            "hover:bg-accent/50 rounded-full p-2 transition-colors",
                            { "justify-center": !isOpen && !isMobile }
                        )}
                    >
                        <PreferencesSettings />
                    </Link>
                </div>
            </motion.nav>
        </>
    )
}

export default MobileSidebar