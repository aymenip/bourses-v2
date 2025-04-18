import { useTranslation } from "react-i18next";
import { H2 } from "../ui/typography";
import { Profile } from "./profile";
import { MenuIcon } from "lucide-react";
import { Button } from "../ui/button";

type TopBarProps = {
    page_name: string;
}


export const TopBar = (props: TopBarProps) => {
    const [t] = useTranslation("translation")

    return (
        <div className="flex flex-col gap-y-6 mb-4">
            {/* Top Section */}
            <div className="h-20 px-4 shadow-sm dark:shadow-none backdrop-blur-md bg-background/70 dark:bg-background/80  border border-foreground/5 flex items-center justify-between rounded-xl">
                <Button size={"icon"} variant={"outline"} className="border bg-foreground/5">
                    <MenuIcon />
                </Button>
                <Profile />
            </div>

            {/* Page Title */}
            <div className="px-4">
                <H2 className="text-foreground/90 tracking-tight">{t(props.page_name)}</H2>
            </div>
        </div>
    )
}