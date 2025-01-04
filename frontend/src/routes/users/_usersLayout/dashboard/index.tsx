import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/users/_usersLayout/dashboard/')({
  component: () => <div>Hello /_users/!</div>,
})
