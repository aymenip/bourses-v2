import { TopBar } from '@/components/global/topBar'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_admin/_adminLayout/forms/')({
  component: Forms,
})


function Forms() {
  return <div className='content-container'>
    <TopBar page_name='forms' />
  </div>
}