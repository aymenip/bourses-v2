import { Button } from '@/components/ui/button';
import { H4, Muted } from '@/components/ui/typography';
import { TField, TFullFormBlock } from '@/types/forms';
import { Pencil2Icon } from '@radix-ui/react-icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { AddNewFieldButton } from '@/components/forms/create-forms'

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
                                <AddNewFieldButton title={title} block = {block}/>
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