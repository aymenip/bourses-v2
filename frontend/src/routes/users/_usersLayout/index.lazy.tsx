import { Loader } from '@/components/global/loader';
import { TopBar } from '@/components/global/topBar';
import { createLazyFileRoute } from '@tanstack/react-router';
import { columns } from '@/components/forms/data-table-forms/columns';
import { DataTable as FormDataTable } from '@/components/forms/data-table-forms/data-table';
import { useGetFormsForUser } from '@/api/forms/queries';
import { useUser } from '@/api/queries';

export const Route = createLazyFileRoute('/users/_usersLayout/')({
  component: Dashboard,
})


function Dashboard() {
  const positionId = useUser().data?.positionId;
  const { data: forms, isLoading, isFetching } = useGetFormsForUser(positionId!, {
    enabled: !!positionId,
  });
  if (isLoading || isFetching) return <Loader />
  return <div className='content-container'>
    <TopBar page_name='dashboard' />
    <div className='p-2'>
      {
        (isLoading || isFetching) ? <Loader /> : <FormDataTable canCreate={false} data={forms || []} columns={columns} />
      }

    </div>
  </div>
}





