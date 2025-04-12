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
      <div className='p-2'>
        <div className="w-full md:w-fit md:min-w-[900px] max-h-screen overflow-y-auto bg-white dark:bg-zinc-900 shadow-lg rounded-sm p-8 border border-zinc-200 dark:border-zinc-800">
          <div className='flex justify-between'>
            <H2 className="font-bold text-zinc-800 dark:text-zinc-100 mb-4">
              {data.title}
            </H2>
            <Link to='/users/articles/edit/$id' params={{
              id: data.id.toString()
            }}>
              <Button variant={"outline"} className='gap-x-2'>
                <Edit className='w-5 h-5' />
                {t("edit")}
              </Button>
            </Link>
          </div>

          <div className="text-zinc-500 dark:text-zinc-400 text-sm mb-6 flex flex-wrap gap-4">
            <div>
              <span className="font-medium">{t("article-id")}:</span> {data.id}
            </div>
            <div>
              <span className="font-medium">{t("classification")}:</span>{" "}
              <Badge variant="outline" className="ml-1">{data.classification}</Badge>
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

          <hr className="border-zinc-300 dark:border-zinc-700 my-6" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Detail label={t("authors")} value={data.authors} />
              <Detail label={t("journal")} value={data.journal || "N/A"} />
              <Detail label={t("doi")} value={data.doi || "N/A"} />
              <Detail label={t("pages")} value={data.pages || "N/A"} />
            </div>

            <div className="space-y-4">
              <Detail label={t("volume")} value={data.volume || "N/A"} />
              <Detail label={t("issue")} value={data.issue || "N/A"} />
              <Detail
                label={t("publicationDate")}
                value={
                  data.publicationDate
                    ? format(new Date(data.publicationDate), "PPP")
                    : "N/A"
                }
              />
              <div>
                <Detail label={t("document")} value={""} />
                <Link to={document?.path} target='_blank'>
                  <Button variant={"outline"}>
                    <Eye />
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
  return (
    <div>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">{label}</p>
      <p className="text-base font-medium text-zinc-800 dark:text-zinc-100">{value}</p>
    </div>
  );
}
