import { TopBar } from '@/components/global/topBar'
import { createLazyFileRoute } from '@tanstack/react-router'
import { columns } from '@/components/certificates/data-table-certificates/columns'
import { DataTable as CertificatesDataTable } from '@/components/certificates/data-table-certificates/data-table'
import { Loader } from '@/components/global/loader'
import { useCertificatesForUser } from '@/api/queries'

export const Route = createLazyFileRoute('/users/_usersLayout/certificates/')({
  component: Certificates,
})

function Certificates() {
  const { data: certificates, isLoading, isFetching } = useCertificatesForUser()
  return (
    <div className="content-container">
      <TopBar page_name="usersCertificates" />
      <div className="p-2">
        {isLoading || isFetching ? (
          <Loader />
        ) : (
          <CertificatesDataTable data={certificates || []} columns={columns} />
        )}
      </div>
    </div>
  )
}
