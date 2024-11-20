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
    <div className='p-5 space-x-5 space-y-5'>
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow-md">
        Browse items
      </button>
      <Box />
    </div>
  )
}
