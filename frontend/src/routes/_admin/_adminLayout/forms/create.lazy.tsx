import { TopBar } from '@/components/global/topBar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ReloadIcon } from '@radix-ui/react-icons';
import { createLazyFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export const Route = createLazyFileRoute('/_admin/_adminLayout/forms/create')({
    component: FormCreate,
})


function FormCreate() {
    const [t, _] = useTranslation("translation")
    return <div className='content-container'>
        <TopBar page_name='forms/create' />
        <div className='px-2 pt-6 grid grid-cols-8'>
            <div className='grid grid-cols-8 col-span-8 gap-y-8'>
                {/* Form title */}
                <div className='col-span-6 col-start-2 col-end-8'>
                    <div className='flex justify-end items-center'>
                        <ReloadIcon className='absolute m-4' />
                        <Input className='h-20 text-3xl placeholder:text-3xl rounded-none border-0  border-b-2 dark:border-b-zinc-500 dark:bg-zinc-800/30 bg-zinc-800/5' placeholder={t("type-form-name")} />
                    </div>
                </div>
                {/* Form title end */}
                {/* Form blocks start */}
                <div className='col-span-6 col-start-2 col-end-8  p-2'>
                    {/* Add new block */}
                    <div className='flex'>
                        <Button variant={"ghost"} className='py-4 text-lg flex-1 border-2 border-dashed rounded-none dark:border-zinc-800/30 dark:hover:bg-foreground/5 '>
                            {t("add-block")}
                        </Button>
                    </div>
                </div>
                {/* Form blocks end */}
            </div>
        </div>
    </div>
} 
