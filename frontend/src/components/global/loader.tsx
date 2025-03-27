import Logo from "./logo"

export const Loader = () => {
    return <div className=" flex flex-1 h-screen  items-center justify-center bg-zinc-100 dark:bg-zinc-900">
        <p className="animate-pulse">
            <Logo showText={false} />
        </p>
    </div>
}