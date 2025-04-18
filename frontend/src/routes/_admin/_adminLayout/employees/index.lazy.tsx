import { TopBar } from '@/components/global/topBar'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_admin/_adminLayout/employees/')({
  component: Employees,
})


function Employees() {
  return <div className='content-container'>
    <TopBar page_name='employees' />
  </div>
}