import { TopBar } from '@/components/global/topBar'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/users/_usersLayout/books/')({
  component: Books,
})


function Books() {
  return <div className='content-container'>
    <TopBar page_name='usersBooks' />
  </div>
}