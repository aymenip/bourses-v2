import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin/_adminLayout/forms/$id')({
  component: () => <div>Hello /_admin/_adminLayout/forms/$id!</div>,
})
