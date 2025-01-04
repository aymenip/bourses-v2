import { TopBar } from '@/components/global/topBar'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin/_adminLayout/')({
  component: Dashboard
})

function Dashboard() {
  return <div className='content-container'>
    <TopBar page_name='dashboard' />
  </div>
}


