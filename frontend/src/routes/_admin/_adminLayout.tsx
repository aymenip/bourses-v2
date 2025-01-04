import { authenticationContext } from '@/api'
import Sidebar from '@/components/global/sidebar'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin/_adminLayout')({
  beforeLoad: () => {
    console.log("hi [ADMIN]");
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
  return <>
    <Sidebar role={role!} />
    <Outlet />
  </>
}