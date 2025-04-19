import { CircleAlert } from "lucide-react";
import { useTranslation } from "react-i18next";

function Note() {
    const [t] = useTranslation("translation")
    return <div className='bg-blue-50 dark:bg-blue-900/10 p-1 rounded  border-2 border-blue-300 text-blue-900 dark:text-blue-300'>
        <div className='flex items-center gap-1'>
            <CircleAlert className='w-4 h-4  ' />
            <span>{t("important-note")}</span>
        </div>
        <div>
            <span>{t("enter-all-important-files")}</span>
            <br />
            <span className='font-light italic'>{t("important-note-example")}</span>
        </div>
    </div>
}

export default Note;