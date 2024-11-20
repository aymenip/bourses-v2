import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/users/')({
  component: Index,
})


function Index() {
  return (
    <div className='p-5 space-x-5 space-y-5'>
      Non Admin
    </div>
  )
}
