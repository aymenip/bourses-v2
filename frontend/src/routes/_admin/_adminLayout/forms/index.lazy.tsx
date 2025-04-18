import { useForms } from '@/api/queries'
import { columns } from '@/components/forms/data-table-forms/columns';
import { DataTable as FormDataTable } from '@/components/forms/data-table-forms/data-table';
import { Loader } from '@/components/global/loader';
import { TopBar } from '@/components/global/topBar'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_admin/_adminLayout/forms/')({
  component: Forms,
})


function Forms() {
  const { data: forms, isLoading, isFetching } = useForms();
  if (isLoading || isFetching) return <Loader />
  return <div className='content-container'>
    <TopBar page_name='forms' />
    <div className='p-2'>
      {
        (isLoading || isFetching) ? <Loader /> : <FormDataTable data={forms || []} columns={columns} />
      }
    </div>
  </div>
}