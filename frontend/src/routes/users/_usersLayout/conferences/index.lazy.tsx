import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/users/_usersLayout/conferences/')({
  component: () => <div>Hello /users/_usersLayout/conferences/!</div>,
})
