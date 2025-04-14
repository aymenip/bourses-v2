import { authenticationContext } from '@/api/services'
import Sidebar from '@/components/global/sidebar'
import { TopBar } from '@/components/global/topBar'
import { H4 } from '@/components/ui/typography'
import { createLazyFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export const Route = createLazyFileRoute('/users/settings/')({
  component: Settings,
})

function Settings() {
  const { role, is_active, position } = authenticationContext()
  const [t] = useTranslation("translation")
  return <div className='flex w-screen h-screen'>
    <Sidebar role={role!} is_active={is_active ?? undefined} />
    <div className='flex-1 h-screen overflow-x-hidden'>
      <div className="content-container">
        <TopBar page_name="settings" />
        <div className='p-2'>
          {
            !is_active && (
              <>
                <div className='p-4 rounded-sm shadow-sm min-h-16 space-y-4 border-2 border-red-700 bg-red-200 text-red-950'>
                  <div>
                    <H4>⚠️ {t("uncompelted-account")}</H4>
                  </div>
                  <div>
                    <div>1️⃣ {t("uncompelted-account-message")}</div>
                    <div>2️⃣ {t("ins1-change-password")}</div>
                    {position !== "emp" && (<div>3️⃣ {t("ins2-add-google-scholar")}</div>)}
                  </div>
                </div>
              </>
            )
          }
        </div>
      </div>
    </div>
  </div>
}
