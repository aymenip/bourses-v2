import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin/_adminLayout/employees/$id')({
  component: Employee
})


function Employee() {
  const { id } = Route.useParams();
  return (
    <div>{`Hello /__admin/employees/${id}!`}</div>
  )
}