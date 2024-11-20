import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/admin/dashboard')({
  component: () => <div>Hello /admin/!</div>
})