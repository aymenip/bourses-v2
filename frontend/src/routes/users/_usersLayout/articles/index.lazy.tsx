import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/users/_usersLayout/articles/')({
  component: () => <div>Hello /users/_usersLayout/teachers/!</div>,
})
