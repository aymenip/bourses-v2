import { authenticationContext } from '@/api/services'
import Sidebar from '@/components/global/sidebar'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/users/_usersLayout')({
    beforeLoad: () => {

        const { role, is_active, isAuthenticated } = authenticationContext()

        if (!isAuthenticated) {
            throw redirect({ to: '/login' })
        }
        if (role === 'ADMIN') {
            throw redirect({ to: "/" })
        }

        if (!is_active) {
            throw redirect({ to: "/users/settings" })
        }


    },
    component: UsersLayout,
})

function UsersLayout() {
    const { role, is_active } = authenticationContext()

    return (
        <div className='flex w-screen h-screen'>
            <Sidebar role={role!} is_active={is_active ?? undefined} />
            <div className='flex-1 h-screen overflow-x-hidden'>
                <Outlet />
            </div>
        </div>
    )
}


