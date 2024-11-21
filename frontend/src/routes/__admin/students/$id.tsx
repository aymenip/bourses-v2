import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/__admin/students/$id')({
  component: Teacher
})


function Teacher() {
  const { id } = Route.useParams();
  return (
    <div>{`Hello /__admin/students/${id}!`}</div>
  )
}