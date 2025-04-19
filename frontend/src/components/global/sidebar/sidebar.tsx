import { useMediaQuery } from "@/hooks/use-media-query"
import MobileSidebar from "./MobileSidebar"
import DesktopSidebar from "./DesktopSidebar"
import { SidebarProps } from "./sidebar-types";


function Sidebar({ role, is_active = true }: SidebarProps) {
    const isMobile = useMediaQuery("(max-width: 768px)");

    return isMobile ? (
        <MobileSidebar role={role} is_active={is_active} />
    ) : (
        <DesktopSidebar role={role} is_active={is_active} />
    );
}

export default Sidebar;