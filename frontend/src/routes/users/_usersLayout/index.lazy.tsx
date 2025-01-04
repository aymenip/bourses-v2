import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/users/_usersLayout/')({
  component: () => <div>Hello /_users/!</div>,
})
