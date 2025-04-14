import { useTranslation } from "react-i18next"
import Logo from "./logo"
import { Loader2 } from "lucide-react";

export const Loader = () => {
    const [t] = useTranslation("translation");
    return <div className=" flex flex-1 flex-col  items-center justify-center bg-transparent dark:bg-zinc-900">
        <p className="animate-pulse text-center">
            <Logo showText={false} />
        </p>
        <span className="flex justify-center gap-2">
            <Loader2 className="animate-spin" />
            {t("loading")}
        </span>
    </div>
}