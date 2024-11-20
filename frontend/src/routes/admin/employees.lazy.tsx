import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/admin/employees')({
  component: () => <div>Hello /employees!</div>
})