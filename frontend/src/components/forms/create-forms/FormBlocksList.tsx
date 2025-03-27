import { Button } from '@/components/ui/button';
import { H4, Muted } from '@/components/ui/typography';
import { TField, TFullFormBlock } from '@/types/forms';
import { Pencil2Icon } from '@radix-ui/react-icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { AddNewTypedFieldButton, AddNewSourceableFieldButton } from '@/components/forms/create-forms'
import { useFormStore } from '@/store/formStore';

interface FormBlocksListProps {
}

export const FormBlocksList: React.FC<FormBlocksListProps> = () => {

    const [t, i18n] = useTranslation("translation");
    const currentForm = useFormStore((state) => state.currentForm);
    return (
        <>
            {currentForm?.blocks?.length ? (
                currentForm.blocks.map((block: TFullFormBlock) => (
                    <div key={block.id} className='relative mt-2 grid gap-y-2 px-2 py-4 bg-zinc-400/5 dark:bg-zinc-800/10 shadow-sm rounded'>
                        <Button className='absolute rtl:left-2 ltr:right-2 top-2' variant={"link"}>
                            <Pencil2Icon />
                        </Button>
                        <div>
                            <Muted>{t("block-title")}</Muted>
                            <H4>{block.label}</H4>
                        </div>
                        <div className='col-span-3 grid gap-y-4'>
                            <div className='flex-1 text-center'>
                                <AddNewTypedFieldButton blockId={block.id} formTitle={currentForm.title} blockLabel={block.label} />
                                <AddNewSourceableFieldButton blockId={block.id} formTitle={currentForm.title} blockLabel={block.label} />
                            </div>
                            {block.fields?.map((fields: TField) => (
                                <div key={fields.label} className='grid grid-cols-3'>
                                    <div>
                                        <Muted>{t("field-label")}</Muted>
                                        <p>{fields.label}</p>
                                    </div>
                                    <div>
                                        <Muted>{t("field-points")}</Muted>
                                        <p>{fields.points}</p>
                                    </div>
                                    {fields.type && (
                                        <div>
                                            <Muted>{t("field-type")}</Muted>
                                            <p>{t(fields.type)}</p>
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
                        {t("no-elements-yet")}
                        <span className='font-bold'>{t("add-new-block")}</span>
                    </Muted>
                </div >
            )}
        </>
    );
};