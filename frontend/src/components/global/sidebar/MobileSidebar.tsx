import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Link } from "@tanstack/react-router"
import { useTranslation } from "react-i18next"
import { MenuIcon, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { routes } from "@/constants/routes"
import { RouteItem } from "./DesktopSidebar"
import { useActiveRoute } from "./sidebar-hooks"
import { SidebarProps } from "./sidebar-types"
import { ModeToggle } from "@/components/mode-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import PreferencesSettings from "@/components/preferences-settings"
import Logo from "../logo"
import { cn } from "@/lib/utils"

const mobileVariants = {
    closed: { width: 0, opacity: 0 },
    open: { width: "100%", opacity: 1 },
    transition: {
        type: "spring",
        damping: 20,
        duration: 0.3
    }
};

const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.5 }
};

function MobileSidebar({ role, is_active = true }: SidebarProps) {
    const [t] = useTranslation("translation");
    const [isOpen, setIsOpen] = useState(false);
    const { getExactMatch } = useActiveRoute(role);

    return (
        <>
            {/* Floating Toggle Button */}
            <motion.div
                className={cn("fixed bottom-6 left-6 z-50", { "hidden": isOpen })}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <Button
                    size="icon"
                    className="rounded-full shadow-lg h-12 w-12"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X /> : <MenuIcon />}
                </Button>
            </motion.div >

            {/* Overlay */}
            <AnimatePresence>
                {
                    isOpen && (
                        <motion.div
                            key="overlay"
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={overlayVariants}
                            className="fixed inset-0 bg-black z-30"
                            onClick={() => setIsOpen(false)}
                        />
                    )
                }
            </AnimatePresence >

            {/* Sidebar Content */}
            < motion.nav
                variants={mobileVariants}
                initial="closed"
                animate={isOpen ? "open" : "closed"}
                className="fixed h-screen flex flex-col border-r bg-background p-4 z-40 shadow-lg"
            >
                <div className="flex items-center justify-between mb-5">
                    <Logo showText={false} />
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                        <X />
                    </Button>
                </div>

                <div className="flex-1 overflow-y-auto">
                    <div className="flex flex-col gap-3">
                        {routes.map((route) => (
                            <RouteItem
                                key={route.name}
                                route={route}
                                role={role}
                                is_active={is_active}
                                isOpen={true}
                                exactMatch={getExactMatch(route.path)}
                                t={t}
                                onClick={() => setIsOpen(false)}
                            />
                        ))}
                    </div>
                </div>

                <div className="mt-auto pt-4 border-t flex justify-between items-center">
                    <div className="flex gap-3">
                        <ModeToggle />
                        <LanguageToggle />
                    </div>
                    <Link to="/users/settings" className="hover:bg-accent/50 rounded-full p-2">
                        <PreferencesSettings />
                    </Link>
                </div>
            </motion.nav >
        </>
    );
}

export default MobileSidebar;