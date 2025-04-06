import { Loader } from '@/components/global/loader';
import { TopBar } from '@/components/global/topBar';
import { createLazyFileRoute } from '@tanstack/react-router';
import { columns } from '@/components/forms/data-table-forms/columns';
import { DataTable as FormDataTable } from '@/components/forms/data-table-forms/data-table';
import { useGetFormsForUser } from '@/api/forms/queries';
import { useUser } from '@/api/queries';
import { H3, H4, Muted } from '@/components/ui/typography';
import { ExternalLink } from 'lucide-react';
import { format } from 'date-fns';

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
    <div className='p-2 grid grid-cols-5 gap-6'>

      <div className='flex border p-2 shadow-sm col-span-2 flex-col'>
        <div className='border-b-2 py-2'>
          <H3>New forms</H3>
        </div>
        <div className='py-2 space-y-2 mb-5 mt-2'>
          {
            forms?.map((form) => <div className='flex justify-between bg-slate-100 p-2 rounded-sm border cursor-pointer hover:bg-slate-200/50 hover:ring-2 ring-slate-200 transition-all'>
              <div className='truncate ltr:pr-2 rtl:pl-2'>
                <H4>{form.title}</H4>
                <Muted>{format(form.createdAt, 'yyyy-MM-dd, hh:mm b')}</Muted>
              </div>
              <ExternalLink className='text-slate-400 w-5 h-5' />
            </div>)
          }
        </div>
      </div>

      <div className='flex border p-2 shadow-sm col-start-3 col-span-3 flex-col'>
        <div className='border-b-2 py-2'>
          <H3>Your submissions</H3>
        </div>
        <div className='py-2 space-y-2 mb-5 mt-2'>
          {
            forms?.map((form) => <div className='flex justify-between bg-slate-100 p-2 rounded-sm border cursor-pointer hover:bg-slate-200/50 hover:ring-2 ring-slate-200 transition-all'>
              <div className='truncate ltr:pr-2 rtl:pl-2'>
                <H4>{form.title}</H4>
                <Muted>{format(form.createdAt, 'yyyy-MM-dd hh:mm b')}</Muted>
              </div>
              <ExternalLink className='text-slate-400 w-5 h-5' />
            </div>)
          }
        </div>
      </div>


    </div>
  </div>
}





