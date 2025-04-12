import { useSubmission } from '@/api/submissions/queries';
import { Loader } from '@/components/global/loader';
import { TopBar } from '@/components/global/topBar';
import { H3 } from '@/components/ui/typography';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_admin/_adminLayout/forms/consult/$submissionId',
)({
  component: ConsultSubmission,
})


function ConsultSubmission() {
  const { submissionId } = Route.useParams();
  const { data, isLoading, isFetching } = useSubmission(parseInt(submissionId!))
  if (isLoading || isFetching) return <Loader />
  const submission = JSON.parse(JSON.stringify(data));
  return <div className='content-container'>
    <TopBar page_name={"user-submission-consult"} />
    <div className='p-2'>
      <div className='border shadow-sm py-2'>
          {
            console.log('JSON.parse(submission.data)', JSON.parse(submission.data))
          }
      </div>
    </div>
  </div>
}
