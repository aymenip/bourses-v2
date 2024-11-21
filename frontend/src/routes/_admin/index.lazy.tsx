import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_admin/')({
  component: Dashboard,
})


function Dashboard() {
  return (
    <div>
      Hello /admin/!
    </div>
  );
}