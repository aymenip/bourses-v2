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
  return <div className="content-container">
    <TopBar page_name="dashboard" />

    <div className="p-4 grid gap-6 md:grid-cols-12 max-h-[700px] overflow-hidden">
      {/* New Forms Panel */}
      <div className="md:col-span-5 bg-card shadow-md rounded-xl border border-border max-h-[600px] overflow-hidden pb-4">
        <div className="px-4 py-3 border-b border-border max-h-[700px] overflow-y-auto">
          <H3>📝 {t("New Forms")}</H3>
        </div>
        <div className="p-4 space-y-3 overflow-auto">
          {forms?.length ? (
            forms.map((form) => (
              <Link
                key={form.id}
                to="/users/submissions/new/$id"
                params={{ id: form.id.toString() }}
                className="group block rounded-lg bg-muted/50 hover:bg-muted transition-colors border border-transparent hover:border-primary"
              >
                <div className="p-3 flex items-center justify-between gap-2">
                  <div className="truncate">
                    <H4 className="truncate group-hover:text-primary">{form.title}</H4>
                    <Muted>{format(new Date(form.createdAt), "yyyy-MM-dd hh:mm b")}</Muted>
                  </div>
                  <ExternalLink className="text-muted-foreground group-hover:text-primary h-5 w-5" />
                </div>
              </Link>
            ))
          ) : (
            <Muted>{t("no-new-forms")}</Muted>
          )}
        </div>
      </div>

      {/* Submissions Panel */}
      <div className=" md:col-span-7 bg-card shadow-md rounded-xl border border-border max-h-[600px] overflow-hidden pb-4">
        <div className="px-4 py-3 border-b border-border">
          <H3>📁 {t("your-submissions")}</H3>
        </div>
        <div className="p-4 space-y-3 max-h-[700px] overflow-y-auto">
          {submissions?.length ? (
            submissions.map((submission) => (
              <Link
                key={submission.id}
                to="/users/submissions/edit/$id"
                params={{ id: submission.id.toString() }}
                className="group block rounded-lg bg-muted/50 hover:bg-muted transition-colors border border-transparent hover:border-primary"
              >
                <div className="p-3 flex items-center justify-between gap-2">
                  <div className="truncate">
                    <H4 className="truncate group-hover:text-primary">{submission.formTitle}</H4>
                    <Muted>{format(new Date(submission.createdAt), "yyyy-MM-dd hh:mm b")}</Muted>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge variant={submission.status === "draft" ? "destructive" : "default"}>
                      {t(submission.status)}
                    </Badge>
                    {submission.status === "submitted" && (
                      <Button size="sm" variant="outline" className="gap-1">
                        <Link
                          to="/users/submissions/receipt/$id"
                          params={{ id: submission.id.toString() }}
                          search={{ formTitle: submission.formTitle }}
                          className="flex items-center gap-1"
                        >
                          <ReceiptText className="h-4 w-4" />
                          <span className="text-xs">{t("Receipt")}</span>
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <Muted>{t("no-submissions")}</Muted>
          )}
        </div>
      </div>
    </div>
  </div>

}