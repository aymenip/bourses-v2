import { createFileRoute, Link } from '@tanstack/react-router';
import { Badge } from '@/components/ui/badge'; // Optional
import { format } from 'date-fns';
import { Loader } from '@/components/global/loader';
import { Button } from '@/components/ui/button';
import { Edit, Eye } from 'lucide-react';
import { TopBar } from '@/components/global/topBar';
import { useTranslation } from 'react-i18next';
import { H2 } from '@/components/ui/typography';
import { Separator } from '@/components/ui/separator';
import { useDocument } from '@/api/documents/queries';
import Detail from '@/components/Detail';
import { useConference } from '@/api/conferences/queries';

export const Route = createFileRoute('/users/_usersLayout/conferences/$id')({
  component: Conference,
})


function Conference() {
  const { id } = Route.useParams();
  const { data: conference, isLoading, isFetching } = useConference(parseInt(id), {
    enabled: !!id,
  });
  const { data: document } = useDocument(conference?.documentId ?? 0, {
    enabled: !!conference,
  });

  const [t] = useTranslation("translation");

  if (!conference || isLoading || isFetching) return <Loader />;

  return (
    <div className="content-container">
      <TopBar page_name={conference.title} />
      <div className="p-4 md:p-6">
        <div className="w-full max-w-6xl mx-auto bg-background border border-border dark:border-zinc-800 rounded-2xl shadow-xl p-6 md:p-10 space-y-6">

          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
            <H2 className="text-xl md:text-2xl font-semibold text-foreground">
              {conference.title}
            </H2>
            <Link
              to="/users/conferences/edit/$id"
              params={{ id: conference.id.toString() }}
            >
              <Button variant="outline" className="gap-2">
                <Edit className="w-5 h-5" />
                {t("edit")}
              </Button>
            </Link>
          </div>

          {/* Metadata Badges */}
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div>
              <span className="font-medium">{t("id")}:</span> {conference.id}
            </div>
            <div className="flex items-center gap-1">
              <span className="font-medium">{t("classification")}:</span>
              <Badge variant="outline">{conference.classification}</Badge>
            </div>
            <div>
              <span className="font-medium">{t("createdAt")}:</span>{" "}
              {format(new Date(conference.createdAt), "PPP")}
            </div>
            <div>
              <span className="font-medium">{t("updatedAt")}:</span>{" "}
              {format(new Date(conference.updatedAt), "PPP")}
            </div>
          </div>

          <Separator className="my-2" />

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Detail label={t("location")} value={conference.location} />
            </div>

            <div>
              <div>
                <Detail label={t("document")} value={<Link to={document?.path} target="_blank">
                  <Button size="sm" variant="secondary" className="mt-2">
                    <Eye className="w-4 h-4 mr-2" />
                    {t("view-document")}
                  </Button>
                </Link>} />

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

