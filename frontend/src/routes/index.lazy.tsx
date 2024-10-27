import { createLazyFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export const Route = createLazyFileRoute('/')({
  component: Index,
})

const Box = () => {
  const [t, i18n] = useTranslation("translation")
  return <div dir={i18n.dir()} className='bg-background p-2 shadow-sm border-2 border-primary'>
    {t("number-of-teachers")}
    <h2>30 {t("teacher")}</h2>
  </div>
}

function Index() {
  return (
    <div>
      <Box />
    </div>
  )
}
