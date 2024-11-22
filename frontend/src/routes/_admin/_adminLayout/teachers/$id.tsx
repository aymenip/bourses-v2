import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin/_adminLayout/teachers/$id')({
  component: Teacher
})


function Teacher() {
  const { id } = Route.useParams();
  return (
    <div>{`Hello /__admin/teachers/${id}!`}</div>
  )
}