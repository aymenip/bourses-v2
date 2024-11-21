import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_admin/_adminLayout/employees/')({
  component: Teachers,
})


function Teachers() {
  return (
    <div>Hello /__admin/employees/!</div>
  )
}