import { useTranslation } from "react-i18next";
import { H2 } from "../ui/typography";
import { Profile } from "./profile";

type TopBarProps = {
    page_name: string;
}


export const TopBar = (props: TopBarProps) => {
    const [t, _] = useTranslation("translation")

    return <div className='flex flex-col gap-y-6 pb-2'>
        <div className='h-20 shadow-md px-2 grid content-center grid-cols-2'>
            <div className='col-span-1 h-20' />
            <Profile />
        </div>
        <div className='p-2'>
            <H2>{t(props.page_name)}</H2>
        </div>
    </div>
}