import { authenticationContext } from '@/api'
import { roleToRoute } from '@/api/utils'
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
  component: Dashboard,
})


function Dashboard() {
  const role = authenticationContext().role;
  return <>
    <Sidebar role={role!} />
    <Outlet />
  </>
}