import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/__admin/employees/')({
  component: Teachers,
})


function Teachers() {
  return (
    <div>Hello /__admin/employees/!</div>
  )
}