import Sidebar from '@/components/global/sidebar'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { useTranslation } from 'react-i18next'

export const Route = createRootRoute({
    component: Root,
})

function Root() {
    const [_, i18n] = useTranslation("translation")
    return (
        <div dir={i18n.dir()} className='flex overflow-x-hidden'>
            <Sidebar />
            <div className='p-2'>
                <Outlet />
                <TanStackRouterDevtools />
            </div>
        </div>
    )
}



