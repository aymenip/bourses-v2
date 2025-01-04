import { TopBar } from '@/components/global/topBar'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/users/_usersLayout/articles/')({
  component: Articles,
})

function Articles() {
  return <div className='content-container'>
    <TopBar page_name='usersArticles' />
  </div>
}