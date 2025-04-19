import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Muted, P } from "../ui/typography";
import { logout, useUser } from "@/api/queries";
import { ExitIcon } from "@radix-ui/react-icons";

export const Profile = () => {
    const { data: user, isError, isLoading } = useUser();
    return <div>
        <div className='p-2 ltr:ml-auto rtl:mr-auto min-w-[300px] flex justify-between items-center space-x-5 bg-gray-100/50 rounded-lg dark:bg-foreground/5'>
            <div className="grid grid-cols-5">
                <div className='col-span-1 grid content-center'>
                    <Avatar>
                        <AvatarImage
                            src="https://github.com/shadcn.png"
                            alt="profile-picture" />
                        <AvatarFallback>{user?.firstname[0]}{user?.lastname[0]}</AvatarFallback>
                    </Avatar>
                </div>
                <div className='col-span-4 grid content-center justify-start mx-2'>
                    <div className='flex gap-x-1'>
                        <P className="truncate">{user?.firstname}</P>
                        <P className="truncate">{user?.lastname}</P>
                    </div>
                    <div className='flex items-center justify-center'>
                        <Muted className="truncate">{user?.email}</Muted>
                    </div>
                </div>
            </div>
            <div className='flex items-center '>
                <Button size={"icon"} variant={"ghost"} onClick={logout}>
                    <ExitIcon />
                </Button>
            </div>
        </div>
    </div>
}