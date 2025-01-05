import VerticalTiles from "../vertical-tiles"
import Logo from "./logo"

export const Loader = () => {
    return <VerticalTiles
        animationDelay={0.5}
        animationDuration={0.5}
        minTileWidth={32}
        stagger={0.05}
        tileClassName="bg-gradient-to-r from-zinc-100 to-zinc-300 dark:from-zinc-800 dark:to-zinc-900"
    >
        <div className=" flex h-screen w-screen items-center justify-center bg-zinc-100 dark:bg-zinc-900">
            <p className="animate-pulse">
                <Logo showText={false} />
            </p>
        </div>
    </VerticalTiles>
}