import { Loader } from '@/components/global/loader';
import { TopBar } from '@/components/global/topBar';
import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { useGetFormsForUser } from '@/api/forms/queries';
import { useUser } from '@/api/queries';
import { H3, H4, Muted } from '@/components/ui/typography';
import { ExternalLink, ReceiptText } from 'lucide-react';
import { format } from 'date-fns';
import { useGetSubmissionsForUser } from '@/api/submissions/queries';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const Route = createLazyFileRoute('/users/_usersLayout/')({
  component: Dashboard,
})


function Dashboard() {
  const [t] = useTranslation("translation");
  const positionId = useUser().data?.positionId;
  const { data: forms, isLoading, isFetching } = useGetFormsForUser(positionId!, {
    enabled: !!positionId,
  });
  const { data: submissions } = useGetSubmissionsForUser();
  if (isLoading || isFetching) return <Loader />
  return <div className='content-container'>
    <TopBar page_name='dashboard' />
    <div className='p-2 grid md:grid-cols-5 gap-6'>

      <div className='flex border dark:border-zinc-800 p-2 shadow-sm md:col-span-2 flex-col'>
        <div className='border-b-2 dark:border-b-zinc-800 py-2'>
          <H3>New forms</H3>
        </div>
        <div className='py-2 mb-5 mt-2 flex flex-col gap-y-2'>
          {
            forms?.map((form) => <Link key={form.id} to="/users/submissions/new/$id" params={{ id: form.id.toString() }}>
              <div className='flex justify-between bg-slate-100 dark:bg-zinc-800 p-2 rounded-sm border dark:border-zinc-800 cursor-pointer hover:bg-slate-200/50 dark:hover:bg-zinc-800/70 hover:ring-2 ring-slate-200 dark:ring-zinc-700 transition-all'>
                <div className='truncate ltr:pr-2 rtl:pl-2'>
                  <H4>{form.title}</H4>
                  <Muted>{format(new Date(form.createdAt), 'yyyy-MM-dd hh:mm b')}</Muted>
                </div>
                <ExternalLink className='text-slate-400 dark:text-zinc-400 w-5 h-5' />
              </div>
            </Link>)
          }
        </div>
      </div>

      <div className='flex border dark:border-zinc-800 p-2 shadow-sm md:col-start-3 md:col-span-3 flex-col '>
        <div className='border-b-2 dark:border-b-zinc-800 py-2'>
          <H3>Your submissions</H3>
        </div>
        <div className='py-2 mb-5 mt-2 flex flex-col gap-y-2'>
          {
            submissions?.map((submission) => <Link key={submission.id} to="/users/submissions/edit/$id" params={{ id: submission.id.toString() }}><div key={submission.id} className='flex justify-between bg-slate-100 dark:bg-zinc-800 p-2 rounded-sm border dark:border-zinc-800 cursor-pointer hover:bg-slate-200/50 dark:hover:bg-zinc-800/70 hover:ring-2 ring-slate-200 dark:ring-zinc-700 transition-all'>
              <div className='truncate ltr:pr-2 rtl:pl-2'>
                <H4>{submission.formTitle}</H4>
                <Muted>{format(new Date(submission.createdAt), 'yyyy-MM-dd hh:mm b')}</Muted>
              </div>
              <div className='flex flex-col gap-1'>
                <Badge variant={submission.status === "draft" ? "destructive" : "default"}>{t(submission.status)}</Badge>

                {
                  submission.status === "submitted" &&
                  <Button size={"sm"} variant={"outline"}>
                    <Link to='/users/submissions/receipt/$id' params={{ id: submission.id.toString() }} search={{
                      formTitle: submission.formTitle
                    }}>
                      <ReceiptText className='w-5 h-5 gap-x-2' />
                    </Link>
                  </Button>
                }
              </div>
            </div>
            </Link>)
          }
        </div>
      </div>


    </div>
  </div>
}