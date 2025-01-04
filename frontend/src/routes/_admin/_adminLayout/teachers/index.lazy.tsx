import { TopBar } from '@/components/global/topBar'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_admin/_adminLayout/teachers/')({
  component: Teachers,
})


function Teachers() {
  return <div className='content-container'>
    <TopBar page_name='teachers' />
  </div>
}


