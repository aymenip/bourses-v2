import { authenticationContext } from '@/api/services'
import Sidebar from '@/components/global/sidebar'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/users/_usersLayout')({
    beforeLoad: () => {

        const role = authenticationContext().role

        if (!authenticationContext().isAuthenticated) {
            throw redirect({ to: '/login' })
        }
        if (role === 'ADMIN') {
            throw redirect({ to: "/" })
        }
    },
    component: UsersLayout,
})

function UsersLayout() {
    const { role } = authenticationContext()

    return (
        <div className='flex w-screen h-screen'>
            <Sidebar role={role!} />
            <div className='flex-1 h-screen overflow-x-hidden'>
                <Outlet />
            </div>
        </div>
    )
}


