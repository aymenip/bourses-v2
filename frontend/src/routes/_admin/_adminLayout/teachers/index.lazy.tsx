import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_admin/_adminLayout/teachers/')({
  component: Teachers,
})


function Teachers() {
  return (
    <div className='background-gradient border themed-border'>Hello /__admin/teachers/!</div>
  )
}