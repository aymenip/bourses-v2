import { authenticationContext } from '@/api'
import { roleToRoute } from '@/api/utils'
import Sidebar from '@/components/global/sidebar'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin/_adminLayout')({
  beforeLoad: () => {
    const role = authenticationContext().role;
    if (authenticationContext().isAuthenticated) {
      throw redirect({ to: "/login" })
    } else if (role !== "ADMIN") {
      throw redirect({ to: roleToRoute(role) })
    }
  },
  component: Dashboard,
})


function Dashboard() {
  return <>
    <Sidebar />
    <Outlet />
  </>
}