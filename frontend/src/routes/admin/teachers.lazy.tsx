import { createLazyFileRoute } from '@tanstack/react-router'


export const Route = createLazyFileRoute('/admin/teachers')({
  component: Teachers,
})

function Teachers() {
  return (
    <div>
      Teachers
    </div>
  )
}