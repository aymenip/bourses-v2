import { motion } from "framer-motion"
import { useState } from "react"
import { Link } from "@tanstack/react-router"
import { useTranslation } from "react-i18next"
import { MenuIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { routes } from "@/constants/routes"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"
import PreferencesSettings from "@/components/preferences-settings"
import { LanguageToggle } from "@/components/language-toggle"
import { useActiveRoute } from "./sidebar-hooks"
import { RouteItemProps, SidebarProps } from "./sidebar-types"
import Logo from "../logo"

const containerVariants = {
    close: { width: "5.1rem" },
    open: { width: "16rem" },
    transition: {
        type: "spring",
        damping: 18,
        duration: 0.2
    }
};

function DesktopSidebar({ role, is_active = true }: SidebarProps) {
    const [t] = useTranslation("translation");
    const [isOpen, setIsOpen] = useState(false);
    const { getExactMatch } = useActiveRoute(role);

    return (
        <motion.nav
            variants={containerVariants}
            initial="close"
            animate={isOpen ? "open" : "close"}
            className={cn("header-background overflow-hidden", {
                "header-collapsed": !isOpen,
            })}
        >
            <div className="w-full mb-5">
                <Logo showText={!isOpen} />
            </div>

            <div className="flex flex-col w-full gap-3 h-full">
                {routes.map((route) => (
                    <RouteItem
                        key={route.name}
                        route={route}
                        role={role}
                        is_active={is_active}
                        isOpen={isOpen}
                        exactMatch={getExactMatch(route.path)}
                        t={t}
                    />
                ))}
            </div>

            <div className={cn(
                "flex gap-3 w-full items-center justify-around",
                { "flex-col": !isOpen }
            )}>
                <Button
                    onClick={() => setIsOpen(!isOpen)}
                    variant="secondary"
                    size="icon"
                >
                    <MenuIcon />
                </Button>
                <ModeToggle />
                <LanguageToggle />
                <Link to="/users/settings">
                    <PreferencesSettings />
                </Link>
            </div>
        </motion.nav>
    );
}

export const RouteItem = ({ route, role, is_active, isOpen, exactMatch, t }: RouteItemProps) => {
    if (!route.roles.includes(role)) return null;

    return (
        <Link
            to={route.path}
            className={cn("header-item", {
                "header-item-active": exactMatch
            })}
        >
            <div className={cn("flex gap-2 items-center", {
                "justify-center": !isOpen
            })}>
                {!isOpen ? (
                    <TooltipProvider delayDuration={100}>
                        <Tooltip>
                            <TooltipTrigger className="flex items-center">
                                {route.icon}
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{t(route.name)}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                ) : (
                    <>
                        {route.icon}
                        {t(route.name)}
                    </>
                )}
            </div>
        </Link>
    );
};

export default DesktopSidebar;