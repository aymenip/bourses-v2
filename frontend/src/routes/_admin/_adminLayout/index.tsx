import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin/_adminLayout/')({
  component: () => <div>Hello /_admin/!</div>
})