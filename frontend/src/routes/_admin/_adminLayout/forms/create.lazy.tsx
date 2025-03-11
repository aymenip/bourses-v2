import { TopBar } from '@/components/global/topBar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { H4, Muted } from '@/components/ui/typography';
import { TField, TFormBlock, TFullFormBlock } from '@/types/forms';
import { Pencil2Icon } from '@radix-ui/react-icons';
import { createLazyFileRoute } from '@tanstack/react-router'
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next'
import { useCreateForm } from '@/api/mutations';
import debounce from "lodash.debounce";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/global/label';
import { cn } from '@/lib/utils';
import { useCreateFormBlock } from '@/api/forms/mutations';
export const Route = createLazyFileRoute('/_admin/_adminLayout/forms/create')({
    component: FormCreate,
})


function FormCreate() {
    const { data, mutate } = useCreateForm();
    const { mutate: createFormBlock } = useCreateFormBlock()
    const [formBlocks, setFormBlocks] = useState<TFullFormBlock[] | undefined>(undefined);
    const [title, setTitle] = useState<string>("");
    const [FormBlockTitle, setFormBlockTitle] = useState<string>("");
    const [formId, setFormId] = useState<number>();
    const [lastChange, setLastChange] = useState<string | undefined>(undefined);
    const debouncedMutate = useCallback(
        debounce((title: string, id?: number) => {
            mutate({ title, id });
            setLastChange(new Date().toLocaleTimeString());

        }, 10000), // يؤخر التنفيذ لمدة 500 مللي ثانية
        []
    );

    const onInputChange = async (e: any) => {
        let newTitle = e.target.value;
        setTitle(newTitle);
        if (newTitle) {
            debouncedMutate(newTitle, formId);
            if (!formId) {
                setFormId(data?.id);
            }
        }
    }

    const addFormBlock = () => {
        console.log(formId);
        createFormBlock({ formId: formId!, label: FormBlockTitle });
    }



    const [t, i18n] = useTranslation("translation")
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
                    {lastChange && <Muted>{t("form-title-last-save")} <span className='font-bold'>{lastChange}</span></Muted>}
                </div>
                {/* Form title end */}

                {/* Added Blocks */}
                <div className='col-span-6 col-start-2 col-end-8'>
                    {
                        formBlocks?.length ? formBlocks?.map((block: TFullFormBlock) => {
                            return <div className='relative grid gap-y-2 px-2 py-4 bg-zinc-400/5 dark:bg-zinc-800/10 shadow-sm rounded'>
                                <Button className='absolute rtl:left-2 ltr:right-2 top-2' variant={"link"}>
                                    <Pencil2Icon />
                                </Button>
                                <div>
                                    <Muted>{t("block-title")}</Muted>
                                    <H4>{block.label}</H4>
                                </div>
                                <div className='col-span-3 grid gap-y-4'>
                                    {
                                        block.subfields?.map((subfield: TField) => {
                                            return <div className='grid grid-cols-3 '>
                                                <div>
                                                    <Muted>{t("field-label")}</Muted>
                                                    <p>{subfield.label}</p>
                                                </div>
                                                <div>
                                                    <Muted>{t("field-type")}</Muted>
                                                    <p>{subfield.type}</p>
                                                </div>
                                                {
                                                    subfield.source && <div>
                                                        <Muted>{t("field-source")}</Muted>
                                                        <p>{subfield.source}</p>
                                                    </div>
                                                }

                                            </div>
                                        })
                                    }
                                </div>
                            </div>
                        }) : <div>
                            <Muted>{t("no-elements-yet")} <span className='font-bold'>{t("add-new-block")}</span></Muted>
                        </div>
                    }
                </div>
                {/* Added Blocks end */}

                {/* Add blocks button start */}
                <div className={cn("col-span-6 col-start-2 col-end-8 py-2", { "hidden": !title })}>
                    {/* Add new block */}
                    <div className='flex'>
                        <form>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant={"ghost"} size={"lg"} className='py-4 text-lg flex-1 border-2 border-dashed rounded-none dark:border-zinc-800/30 dark:hover:bg-foreground/5 '>
                                        {t("add-new-block")}
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]" dir={i18n.dir()}>
                                    <DialogHeader dir={i18n.dir()}>
                                        <DialogTitle dir={i18n.dir()}>{t("add-new-block")}</DialogTitle>
                                        <DialogDescription dir={i18n.dir()}>
                                            <span className='font-bold'>{title}</span>
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="block-title" className="text-right">
                                                {t("title")}
                                            </Label>
                                            <Input onChange={(e) => setFormBlockTitle(e.target.value)} required id="block-title" placeholder={t("block-title")} className="col-span-3" />
                                        </div>

                                    </div>
                                    <DialogFooter>
                                        <Button onClick={() => addFormBlock()} type="submit">
                                            {t("add")}
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </form>
                    </div>
                </div>
                {/* Add blocks button end */}
            </div>
        </div>
    </div>
} 
