import Sidebar from '@/components/global/sidebar'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin/_adminLayout')({
  beforeLoad: () => {
    if (false) {
      throw redirect({ to: "/login" })
    }
  },
  component: Dashboard,
})


function Dashboard() {
  return <div className='flex'>
    <Sidebar />
    <div className='m-2'>
      <Outlet />
    </div>
  </div>
}