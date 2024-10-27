import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next"

function Logo({showText = true}: {showText: boolean}) {
    const [t, _] = useTranslation("translation");    
    return (
        <Link to="/">
        <div className="grid place-content-center h-full">
            <div className="flex flex-col items-center justify-center cairo-play-logo gap-2">
                <img className="dark:bg-neutral-300 dark:rounded-full" alt="المركز الجامعي الشريف بوشوشة أفلو" src="/logo.jpg" />
                <div className={cn("flex flex-col items-center justify-center", {"hidden": showText})}>
                    <p className="text-sm">{t("cu")}</p>
                    <h2 className="text-lg font-bold">{t("cherif") +" "+ t("aflou")}</h2>
                </div>
            </div>
        </div>
        </Link>
    )
}

export default Logo