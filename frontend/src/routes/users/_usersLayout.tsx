import { authenticationContext } from '@/api'
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
        <>
            <Sidebar role={role!} />
            <Outlet />
        </>
    )
}


