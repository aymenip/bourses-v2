import { useThesesForUser } from '@/api/queries'
import { TopBar } from '@/components/global/topBar'
import { createLazyFileRoute } from '@tanstack/react-router'
import { columns } from '@/components/theses/data-table-theses/columns';
import { DataTable as ThesisDataTable } from '@/components/theses/data-table-theses/data-table';
import { Loader } from '@/components/global/loader';

export const Route = createLazyFileRoute(
  '/users/_usersLayout/theses/',
)({
  component: Theses,
})

function Theses() {
  const { data: theses, isLoading, isFetching } = useThesesForUser();

  return (
    <div className="content-container">
      <TopBar page_name="usersTheses" />
      <div className='p-2'>
        {
          (isLoading || isFetching) ? <Loader /> : <ThesisDataTable data={theses || []} columns={columns} />
        }
      </div>
    </div>
  )
}
