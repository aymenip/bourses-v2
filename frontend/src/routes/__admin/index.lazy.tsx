import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/__admin/')({
  component: Dashboard,
})


function Dashboard() {
  return (
    <div>
      Hello /admin/!
    </div>
  );
}