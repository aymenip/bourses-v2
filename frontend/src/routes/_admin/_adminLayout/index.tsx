import { H3, H4, Muted } from '@/components/ui/typography'
import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/_admin/_adminLayout/')({
  component: Dashboard,
})


interface StatsCardCardProps {
  title: string;
  count: number
}

export const StatsCard = ({ title, count }: StatsCardCardProps) => {
  const [t, _] = useTranslation("translation")
  return <div className='background-gradient h-32 border themed-border'>
    <H4>{t(title)}</H4>
    <h5 className='text-muted-foreground text-5xl'>{count}</h5>
  </div>
}

function Dashboard() {
  const [t, _] = useTranslation("translation")
  return (
    <div className='h-60 p-2 w-screen space-y-6 border themed-border'>
      <H3>{t("stats")}</H3>
      <div className='grid grid-cols-3 gap-4'>
        <StatsCard title='teachers' count={50} />
        <StatsCard title='students' count={9} />
        <StatsCard title='employees' count={100} />
      </div>
    </div>
  )
}