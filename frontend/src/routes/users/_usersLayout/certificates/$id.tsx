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
import { useCertificate } from '@/api/certificates/queries';
import { useDocument } from '@/api/documents/queries';
import { ReactNode } from 'react';
import Detail from '@/components/Detail';

export const Route = createFileRoute('/users/_usersLayout/certificates/$id')({
  component: Certificate,
})


function Certificate() {
  const { id } = Route.useParams();
  const { data: certificate, isLoading, isFetching } = useCertificate(parseInt(id), {
    enabled: !!id,
  });
  const { data: document } = useDocument(certificate?.documentId ?? 0, {
    enabled: !!certificate,
  });

  const [t] = useTranslation("translation");

  if (!certificate || isLoading || isFetching) return <Loader />;

  return (
    <div className="content-container">
      <TopBar page_name={certificate.title} />
      <div className="p-4 md:p-6">
        <div className="w-full max-w-6xl mx-auto bg-background border border-border dark:border-zinc-800 rounded-2xl shadow-xl p-6 md:p-10 space-y-6">

          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
            <H2 className="text-xl md:text-2xl font-semibold text-foreground">
              {certificate.title}
            </H2>
            <Link
              to="/users/certificates/edit/$id"
              params={{ id: certificate.id.toString() }}
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
              <span className="font-medium">{t("certificate-id")}:</span> {certificate.id}
            </div>
            <div className="flex items-center gap-1">
              <span className="font-medium">{t("issuer")}:</span>
              <Badge variant="outline">{certificate.issuer}</Badge>
            </div>
            <div>
              <span className="font-medium">{t("createdAt")}:</span>{" "}
              {format(new Date(certificate.createdAt), "PPP")}
            </div>
            <div>
              <span className="font-medium">{t("updatedAt")}:</span>{" "}
              {format(new Date(certificate.updatedAt), "PPP")}
            </div>
          </div>

          <Separator className="my-2" />

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Detail label={t("issuer")} value={certificate.issuer} />
              <Detail
                label={t("issueDate")}
                value={
                  certificate.issueDate
                    ? format(new Date(certificate.issueDate), "PPP")
                    : "—"
                }
              />
              <Detail label={t("expirationDate")} value={
                certificate.expirationDate
                  ? format(new Date(certificate.expirationDate), "PPP")
                  : "—"
              } />
            </div>

            <div className="space-y-4">
              <div>
                <Detail label={t("certificateId")} value={certificate.certificateId} />
              </div>
              <div>
                <Detail label={t("document")} value={<Link to={document?.path} target="_blank">
                  <Link to={document?.path}>
                  </Link>
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
