import { TopBar } from '@/components/global/topBar'
import { createLazyFileRoute } from '@tanstack/react-router'
import { columns } from '@/components/books/data-table-books/columns'
import { DataTable as BooksDataTable } from '@/components/books/data-table-books/data-table'
import { Loader } from '@/components/global/loader'
import { useBooksForUser } from '@/api/queries'

export const Route = createLazyFileRoute('/users/_usersLayout/books/')({
  component: Books,
})

function Books() {
  const { data: books, isLoading, isFetching } = useBooksForUser()
  return (
    <div className="content-container">
      <TopBar page_name="usersBooks" />
      <div className="p-2">
        {isLoading || isFetching ? (
          <Loader />
        ) : (
          <BooksDataTable data={books || []} columns={columns} />
        )}
      </div>
    </div>
  )
}
