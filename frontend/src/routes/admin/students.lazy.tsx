import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/admin/students')({
  component: () => <div>Hello /students!</div>
})