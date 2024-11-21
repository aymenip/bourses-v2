import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/__admin/students/')({
  component: Teachers,
})


function Teachers() {
  return (
    <div>Hello /__admin/students/!</div>
  )
}