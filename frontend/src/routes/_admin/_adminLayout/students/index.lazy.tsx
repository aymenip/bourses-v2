import { TopBar } from '@/components/global/topBar'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_admin/_adminLayout/students/')({
  component: Students,
})


function Students() {
  return <div className='content-container'>
    <TopBar page_name='students' />
  </div>
}