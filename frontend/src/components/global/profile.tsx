import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Muted, P } from "../ui/typography";
import { logout, useUser } from "@/api/queries";
import { ExitIcon } from "@radix-ui/react-icons";

export const Profile = () => {
    const { data: user, isError, isLoading } = useUser();
    return <div className='col-span-1 h-20 grid content-center'>
        <div className='cursor-pointer border dark:border-zinc-800 rounded-lg p-2 ltr:ml-auto rtl:mr-auto min-w-[300px] grid grid-cols-5 content-center'>
            <div className='col-span-1 grid content-center'>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>{user?.firstname[0]}{user?.lastname[0]}</AvatarFallback>
                </Avatar>
            </div>
            <div className='col-span-3 grid content-center justify-start'>
                <div className='flex gap-x-1'>
                    <P>{user?.firstname}</P>
                    <P>{user?.lastname}</P>
                </div>
                <div className='flex items-center justify-center'>
                    <Muted>{user?.email}</Muted>
                </div>
            </div>
            <div className='col-span-1 flex items-center flex-row-reverse'>
                <Button variant={"ghost"} onClick={logout}>
                    <ExitIcon />
                </Button>
            </div>
        </div>
    </div>
}