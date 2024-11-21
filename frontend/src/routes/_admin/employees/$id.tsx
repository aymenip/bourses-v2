import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin/employees/$id')({
  component: Teacher
})


function Teacher() {
  const { id } = Route.useParams();
  return (
    <div>{`Hello /__admin/employees/${id}!`}</div>
  )
}