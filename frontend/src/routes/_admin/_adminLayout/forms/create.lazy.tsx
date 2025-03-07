import { TopBar } from '@/components/global/topBar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { H4, Muted } from '@/components/ui/typography';
import { TField, TFormElement } from '@/types/forms';
import { Pencil2Icon, ReloadIcon } from '@radix-ui/react-icons';
import { createLazyFileRoute } from '@tanstack/react-router'
import { useState } from 'react';
import { useTranslation } from 'react-i18next'
import { useCreateForm } from '@/api/mutations';
import { useUser } from '@/api/queries';
import { cn } from '@/lib/utils';
export const Route = createLazyFileRoute('/_admin/_adminLayout/forms/create')({
    component: FormCreate,
})


function FormCreate() {
    const { data, isPending, mutate } = useCreateForm();
    const { data: userData } = useUser();

    const [formElements, setFormElements] = useState<TFormElement[] | null>(null);

    const onInputChange = (e: any) => {
        let title = e.target.value;
        if (title && userData) {
            let creator = userData?.id;

            mutate({ title, creator })

        }
    }

    // useEffect(() => {
    //     setFormElements([])
    // }, [formElements]);


    const [t, _] = useTranslation("translation")
    return <div className='content-container'>
        <TopBar page_name='forms/create' />
        <div className='px-2 pt-6 grid grid-cols-8'>
            <div className='grid grid-cols-8 col-span-8 gap-y-8'>
                {/* Form title */}
                <div className='col-span-6 col-start-2 col-end-8'>
                    <div className='flex justify-end items-center'>
                        <span className='w-3 h-3 rounded-full bg-green-500 absolute m-4 animate-pulse' />
                        <Input onChange={onInputChange} className='h-20 text-3xl placeholder:text-3xl dark:placeholder:text-zinc-500  rounded-none border-0  border-b-2 dark:border-b-zinc-500 dark:bg-zinc-800/30 bg-zinc-800/5' placeholder={t("type-form-name")} />
                    </div>
                </div>
                {/* Form title end */}

                {/* Added Blocks */}
                <div className='col-span-6 col-start-2 col-end-8'>
                    {
                        formElements?.length ? formElements?.map((element: TFormElement) => {
                            return <div className='relative grid gap-y-2 px-2 py-4 bg-zinc-400/5 dark:bg-zinc-800/10 shadow-sm rounded'>
                                <Button className='absolute rtl:left-2 ltr:right-2 top-2' variant={"link"}>
                                    <Pencil2Icon />
                                </Button>
                                <div>
                                    <Muted>{t("element-title")}</Muted>
                                    <H4>{element.title}</H4>
                                </div>
                                <div className='col-span-3 grid gap-y-4'>
                                    {
                                        element.subelements?.map((subelement: TField) => {
                                            return <div className='grid grid-cols-3 '>
                                                <div>
                                                    <Muted>{t("field-label")}</Muted>
                                                    <p>{subelement.label}</p>
                                                </div>
                                                <div>
                                                    <Muted>{t("field-type")}</Muted>
                                                    <p>{subelement.type}</p>
                                                </div>
                                                {
                                                    subelement.source && <div>
                                                        <Muted>{t("field-source")}</Muted>
                                                        <p>{subelement.source}</p>
                                                    </div>
                                                }

                                            </div>
                                        })
                                    }
                                </div>
                            </div>
                        }) : <div>
                            <Muted>{t("no-elements-yet")} <span className='font-bold'>{t("add-block")}</span></Muted>
                        </div>
                    }
                </div>
                {/* Added Blocks end */}

                {/* Add blocks button start */}
                <div className='col-span-6 col-start-2 col-end-8 py-2'>
                    {/* Add new block */}
                    <div className='flex'>
                        <Button variant={"ghost"} size={"lg"} className='py-4 text-lg flex-1 border-2 border-dashed rounded-none dark:border-zinc-800/30 dark:hover:bg-foreground/5 '>
                            {t("add-block")}
                        </Button>
                    </div>
                </div>
                {/* Add blocks button end */}
            </div>
        </div>
    </div>
} 
