import { useArticlesForUser } from '@/api/queries'
import { TopBar } from '@/components/global/topBar'
import { createLazyFileRoute } from '@tanstack/react-router'
import { columns } from '@/components/articles/data-table-articles/columns'
import { DataTable as ArticlesDataTable } from '@/components/articles/data-table-articles/data-table'
import { Loader } from '@/components/global/loader'

export const Route = createLazyFileRoute('/users/_usersLayout/articles/')({
  component: Articles,
})



function Articles() {
  const { data: articles, isLoading, isFetching } = useArticlesForUser()
  return <div className="content-container">
    <TopBar page_name="usersArticles" />
    <div className="p-2">
      {isLoading || isFetching ? (
        <Loader />
      ) : (
        <ArticlesDataTable data={articles || []} columns={columns} />
      )}
    </div>
  </div>
}