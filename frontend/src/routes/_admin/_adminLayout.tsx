import { authenticationContext } from '@/api/services'
import Sidebar from '@/components/global/sidebar'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin/_adminLayout')({
  beforeLoad: () => {
    const role = authenticationContext().role;
    if (!authenticationContext().isAuthenticated) {
      throw redirect({ to: "/login" })
    }
    if (role != "ADMIN") {
      throw redirect({ to: "/users" })
    }
  },
  component: AdminLayout,
})


function AdminLayout() {
  const role = authenticationContext().role;
  return <div className='flex w-screen h-screen'>
    <Sidebar role={role!} />
    <div className='flex-1 h-screen overflow-y-auto overflow-x-hidden'>
      <Outlet />
    </div>
  </div>
}