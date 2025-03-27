import { TopBar } from '@/components/global/topBar'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute(
  '/users/_usersLayout/theses/',
)({
  component: Theses,
})

function Theses() {
  return (
    <div className="content-container">
      <TopBar page_name="usersTheses" />
    </div>
  )
}
