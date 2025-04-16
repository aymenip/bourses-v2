import { createRootRoute, Outlet } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Toaster } from 'sonner';
export const Route = createRootRoute({
    component: Root,
})

function Root() {
    const [_, i18n] = useTranslation("translation")
    return (
        <div dir={i18n.dir()} className='flex overflow-x-hidden'>
            <Toaster richColors position="bottom-right" expand={true} />
            <Outlet />
        </div>
    )
}



