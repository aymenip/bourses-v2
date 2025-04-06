import { useConferencesForUser } from '@/api/queries'
import { TopBar } from '@/components/global/topBar'
import { createLazyFileRoute } from '@tanstack/react-router'
import { columns } from '@/components/conferences/data-table-conferences/columns'
import { DataTable as ConferencesDataTable } from '@/components/conferences/data-table-conferences/data-table'
import { Loader } from '@/components/global/loader'

export const Route = createLazyFileRoute('/users/_usersLayout/conferences/')({
  component: Conferences,
})



function Conferences() {
  const { data: conferences, isLoading, isFetching } = useConferencesForUser()
  return <div className="content-container">
    <TopBar page_name="usersConferences" />
    <div className="p-2">
      {isLoading || isFetching ? (
        <Loader />
      ) : (
        <ConferencesDataTable data={conferences || []} columns={columns} />
      )}
    </div>
  </div>
}