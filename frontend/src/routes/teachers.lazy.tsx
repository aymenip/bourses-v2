import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/teachers')({
  component: Teachers
})


function Teachers() {
  return (
    <div>
      hi
    </div>
  )
}