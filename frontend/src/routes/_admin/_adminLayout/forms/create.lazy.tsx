import { TopBar } from '@/components/global/topBar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { H4, Muted } from '@/components/ui/typography';
import { Pencil2Icon, ReloadIcon } from '@radix-ui/react-icons';
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
                        <ReloadIcon height={20} width={20} className='absolute m-4 text-zinc-800/50 dark:text-zinc-500' />
                        <Input className='h-20 text-3xl placeholder:text-3xl dark:placeholder:text-zinc-500  rounded-none border-0  border-b-2 dark:border-b-zinc-500 dark:bg-zinc-800/30 bg-zinc-800/5' placeholder={t("type-form-name")} />
                    </div>
                </div>
                {/* Form title end */}

                {/* Added Blocks */}
                <div className='col-span-6 col-start-2 col-end-8'>
                    <div className='relative grid gap-y-2 px-2 py-4 bg-zinc-400/5 dark:bg-zinc-800/10 shadow-sm rounded'>
                        <Button className='absolute rtl:left-2 ltr:right-2 top-2' variant={"link"}>
                            <Pencil2Icon />
                        </Button>
                        <div>
                            <Muted>element title</Muted>
                            <H4>Personal informations</H4>
                        </div>
                        <div className='col-span-3 grid gap-y-4'>
                            {/* Field */}
                            <div className='grid grid-cols-3 '>
                                <div>
                                    <Muted>field label</Muted>
                                    <p>Firstname</p>
                                </div>
                                <div>
                                    <Muted>field type</Muted>
                                    <p>Text</p>
                                </div>
                            </div>

                            <div className='grid grid-cols-3'>
                                <div>
                                    <Muted>field label</Muted>
                                    <p>Firstname</p>
                                </div>
                                <div>
                                    <Muted>field type</Muted>
                                    <p>Sourceable</p>
                                </div>
                                <div>
                                    <Muted>source</Muted>
                                    <p>Books</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Added Blocks end */}

                {/* Form blocks start */}
                <div className='col-span-6 col-start-2 col-end-8 p-2'>
                    {/* Add new block */}
                    <div className='flex'>
                        <Button variant={"ghost"} size={"lg"} className='py-4 text-lg flex-1 border-2 border-dashed rounded-none dark:border-zinc-800/30 dark:hover:bg-foreground/5 '>
                            {t("add-block")}
                        </Button>
                    </div>
                </div>
                {/* Form blocks end */}
            </div>
        </div>
    </div>
} 
