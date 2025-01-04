import { TopBar } from '@/components/global/topBar'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/users/_usersLayout/conferences/')({
  component: Conferences,
})



function Conferences() {
  return <div className='content-container'>
    <TopBar page_name='usersConferences' />
  </div>
}