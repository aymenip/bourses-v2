import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_admin/_adminLayout/students/')({
  component: Students,
})


function Students() {
  return (
    <div className='background-gradient border themed-border'>Hello /__admin/students/!</div>
  )
}