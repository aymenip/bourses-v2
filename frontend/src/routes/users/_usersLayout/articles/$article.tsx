import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge'; // Optional
import { format } from 'date-fns';
import { TArticle } from '@/types/articles';
import { useDocument } from '@/api/documents/queries';
import { Loader } from '@/components/global/loader';
import { Button } from '@/components/ui/button';
import { Edit, Eye } from 'lucide-react';
import { TopBar } from '@/components/global/topBar';
import { useTranslation } from 'react-i18next';
import { H1, H2 } from '@/components/ui/typography';
import { Separator } from '@/components/ui/separator';

export const Route = createFileRoute('/users/_usersLayout/articles/$article')({
  component: Article,
});

function Article() {
  const { article } = Route.useSearch();
  const [data, setData] = useState<TArticle | null>(null);
  const [t] = useTranslation("translation");
  useEffect(() => {
    try {
      const parsed = typeof article === 'string' ? JSON.parse(article) : article;
      setData(parsed[0]);
    } catch (error) {
      console.error('Failed to parse article:', error);
    }
  }, [article]);

  const { data: document, isLoading, isFetching } = useDocument(article[0]!.documentId, {
    enabled: !!data?.documentId
  })

  if (!data || isLoading || isFetching) return <Loader />;

  return (
    <div className="content-container">
      <TopBar page_name={data.title} />

      <div className="p-4 md:p-6">
        <div className="w-full max-w-6xl mx-auto bg-background border border-border dark:border-zinc-800 rounded-2xl shadow-xl p-6 md:p-10 space-y-6">

          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
            <H2 className="text-xl md:text-2xl font-semibold text-foreground">
              {data.title}
            </H2>
            <Link
              to="/users/articles/edit/$id"
              params={{ id: data.id.toString() }}
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
              <span className="font-medium">{t("article-id")}:</span> {data.id}
            </div>
            <div className="flex items-center gap-1">
              <span className="font-medium">{t("classification")}:</span>
              <Badge variant="outline">{data.classification}</Badge>
            </div>
            <div>
              <span className="font-medium">{t("createdAt")}:</span>{" "}
              {format(new Date(data.createdAt), "PPP")}
            </div>
            <div>
              <span className="font-medium">{t("updatedAt")}:</span>{" "}
              {format(new Date(data.updatedAt), "PPP")}
            </div>
          </div>

          <Separator className="my-2" />

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Detail label={t("authors")} value={data.authors} />
              <Detail label={t("journal")} value={data.journal || "—"} />
              <Detail label={t("doi")} value={data.doi || "—"} />
              <Detail label={t("pages")} value={data.pages || "—"} />
            </div>

            <div className="space-y-4">
              <Detail label={t("volume")} value={data.volume || "—"} />
              <Detail label={t("issue")} value={data.issue || "—"} />
              <Detail
                label={t("publicationDate")}
                value={
                  data.publicationDate
                    ? format(new Date(data.publicationDate), "PPP")
                    : "—"
                }
              />
              <div>
                <Detail label={t("document")} value="" />
                <Link to={document?.path} target="_blank">
                  <Button size="sm" variant="secondary" className="mt-2">
                    <Eye className="w-4 h-4 mr-2" />
                    {t("view-document")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string | number }) {
  const isEmpty = value === "—" || value === "N/A" || value === "" || value === null;

  return (
    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p
        className={`text-base font-medium ${isEmpty ? "text-zinc-400 italic" : "text-foreground"
          } break-words`}
      >
        {value || "—"}
      </p>
    </div>
  );
}
