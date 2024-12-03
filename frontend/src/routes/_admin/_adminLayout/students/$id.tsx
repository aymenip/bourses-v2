import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin/_adminLayout/students/$id')({
  component: Student
})


function Student() {
  const { id } = Route.useParams();
  return (
    <div>{`Hello /__admin/students/${id}!`}</div>
  )
}