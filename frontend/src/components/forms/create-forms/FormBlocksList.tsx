import { Button } from '@/components/ui/button';
import { H4, Muted } from '@/components/ui/typography';
import { TField, TFullFormBlock } from '@/types/forms';
import { Pencil2Icon, PlusCircledIcon } from '@radix-ui/react-icons';
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/global/label';
import { Input } from '@/components/ui/input';
import { useTranslation } from 'react-i18next';

interface FormBlocksListProps {
    formBlocks?: TFullFormBlock[];
    title: string;
    setFormBlockTitle: (title: string) => void;
    addFormBlock: () => void;
}

export const FormBlocksList: React.FC<FormBlocksListProps> = ({
    formBlocks,
    title,
    setFormBlockTitle,
    addFormBlock,
}) => {

    const [t, i18n] = useTranslation("translation")
    return (
        <>
            {formBlocks?.length ? (
                formBlocks.map((block: TFullFormBlock) => (
                    <div key={block.label} className='relative mt-2 grid gap-y-2 px-2 py-4 bg-zinc-400/5 dark:bg-zinc-800/10 shadow-sm rounded'>
                        <Button className='absolute rtl:left-2 ltr:right-2 top-2' variant={"link"}>
                            <Pencil2Icon />
                        </Button>
                        <div>
                            <Muted>{t("block-title")}</Muted>
                            <H4>{block.label}</H4>
                        </div>
                        <div className='col-span-3 grid gap-y-4'>
                            <div className='flex-1 text-center'>
                                <Dialog>
                                    <DialogTrigger>
                                        <Button className='gap-x-1' variant={"link"} dir={i18n.dir()}>
                                            {t("add-field")}
                                            <PlusCircledIcon />
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]" dir={i18n.dir()}>
                                        <DialogHeader dir={i18n.dir()}>
                                            <DialogTitle dir={i18n.dir()}>{t("add-new-field")}</DialogTitle>
                                            <DialogDescription dir={i18n.dir()}>
                                                <div className='font-bold'>
                                                    <div>{title}</div>
                                                    <div>{block.label}</div>
                                                </div>
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <form className="grid grid-cols-4 items-center gap-4 ">
                                                <Label htmlFor="field-label" className="text-right">
                                                    {t("field-label")}
                                                </Label>
                                                <Input onChange={(e) => setFormBlockTitle(e.target.value)} required id="field-label" placeholder={t("field-label")} className="col-span-3" />
                                            </form>
                                        </div>
                                        <DialogFooter>
                                            <Button onClick={() => addFormBlock()} type="submit">
                                                {t("add")}
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                            {block.subfields?.map((subfield: TField) => (
                                <div key={subfield.label} className='grid grid-cols-3'>
                                    <div>
                                        <Muted>{t("field-label")}</Muted>
                                        <p>{subfield.label}</p>
                                    </div>
                                    <div>
                                        <Muted>{t("field-type")}</Muted>
                                        <p>{subfield.type}</p>
                                    </div>
                                    {subfield.source && (
                                        <div>
                                            <Muted>{t("field-source")}</Muted>
                                            <p>{subfield.source}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            ) : (
                <div>
                    <Muted>
                        {t("no-elements-yet")} <span className='font-bold'>{t("add-new-block")}</span>
                    </Muted>
                </div>
            )}
        </>
    );
};