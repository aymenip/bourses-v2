import { useForm } from '@/api/queries';
import { useSubmissionsForAForm } from '@/api/submissions/queries';
import { Loader } from '@/components/global/loader';
import { TopBar } from '@/components/global/topBar'
import { createFileRoute } from '@tanstack/react-router'
import { columns } from '@/components/submissions/data-table-submissions/columns';
import { DataTable as SubmissionsDataTable } from '@/components/submissions/data-table-submissions/data-table';
export const Route = createFileRoute('/_admin/_adminLayout/forms/$id')({
  component: FormSubmissions,
})


function FormSubmissions() {
  const { id } = Route.useParams();
  const { data: form, isLoading, isFetching } = useForm(parseInt(id!));
  const { data: submissions } = useSubmissionsForAForm(parseInt(id!), { enabled: !!form?.id })
  if (isLoading || isFetching) return <Loader />
  return <div className='content-container'>
    <TopBar page_name={form?.title!} />
    <div className='p-2'>
      {
        (isLoading || isFetching) ? <Loader /> : <SubmissionsDataTable data={submissions || []} columns={columns} />
      }
    </div>
  </div>
}