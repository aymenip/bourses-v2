import { Button } from '@/components/ui/button';
import { H4, Muted } from '@/components/ui/typography';
import { TField, TFullFormBlock } from '@/types/forms';
import { Pencil2Icon } from '@radix-ui/react-icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { AddNewTypedFieldButton, AddNewSourceableFieldButton } from '@/components/forms/create-forms'
import { useFormStore } from '@/store/formStore';
import { Trash } from 'lucide-react';
import { useDeleteBlock, useDeleteField } from '@/api/forms/mutations';
import { toast } from 'sonner';

interface FormBlocksListProps {
}

export const FormBlocksList: React.FC<FormBlocksListProps> = () => {
    const { mutate: deleteBlock, isSuccess: isDeleteSuccess } = useDeleteBlock();
    const { mutate: deleteField, isSuccess: isDeleteFieldSuccess } = useDeleteField();
    const [t, i18n] = useTranslation("translation");
    const currentForm = useFormStore((state) => state.currentForm);
    const deleteBlockFromCurrentForm = useFormStore((state) => state.deleteBlockFromCurrentForm);
    const deleteFieldFromBlock = useFormStore((state) => state.deleteFieldFromBlock);
    const handleDelteBlock = (id: number) => {
        deleteBlock(id);
        if (isDeleteSuccess) {
            toast.success("block-delete-success");
            deleteBlockFromCurrentForm(id);
        }
    }
    const handleDeleteField = (id: number, type: string, blockId: number) => {
        if (["article", "thesis", "book", "conference", "certificate"].includes(type)) {
            deleteField({ id, type: "sourceable" });
        } else {
            deleteField({ id, type: "typed" });
        }
        if (isDeleteFieldSuccess) {
            toast.success("field-delete-success");
            deleteFieldFromBlock(id, blockId);
        }
    }
    return (
        <>
            {currentForm?.blocks?.length ? (
                currentForm.blocks.map((block: TFullFormBlock) => (
                    <div key={block.id} className='mt-2 gap-y-2 px-2 py-4 bg-zinc-400/5 dark:bg-zinc-800/10 shadow-sm rounded-lg border'>
                        <div className='flex justify-between'>
                            <div className='w-full'>
                                <Muted>{t("block-title")}</Muted>
                                <H4>{block.label}</H4>
                            </div>
                            <div className='flex space-x-1'>
                                <Button variant={"ghost"} size={"icon"} >
                                    <Pencil2Icon className='w-4 h-4' />
                                </Button>
                                <Button variant={"ghost"} size={"icon"} className='bg-destructive/10' onClick={() => handleDelteBlock(block.id)}>
                                    <Trash className='w-4 h-4  text-destructive' />
                                </Button>
                            </div>
                        </div>
                        <div className='col-span-3 grid gap-y-4 '>
                            <div className='flex-1 text-center'>
                                <AddNewTypedFieldButton blockId={block.id} formTitle={currentForm.title} blockLabel={block.label} />
                                <AddNewSourceableFieldButton blockId={block.id} formTitle={currentForm.title} blockLabel={block.label} />
                            </div>
                            {block.fields?.map((fields: TField) => (
                                <div key={fields.label} className='flex border rounded-lg overflow-hidden p-1 shadow-sm border-primary/15 bg-primary/5'>
                                    <div className='shrink-0 ltr:mr-5 rtl:ml-5 flex flex-col items-center justify-center bg-primary/20 rounded-md'>
                                        <Button size={"icon"} variant={"ghost"}>
                                            <Pencil2Icon className='w-4 h-4' />
                                        </Button>
                                        <Button size={"icon"} variant={"ghost"} className='hover:bg-destructive/15' onClick={() => handleDeleteField(fields.id, fields.type, fields.blockId)}>
                                            <Trash className='w-4 h-4 text-destructive' />
                                        </Button>
                                    </div>
                                    <div className='flex-1 grid grid-cols-3 shrink-0'>
                                        <div>
                                            <Muted>{t("field-label")}</Muted>
                                            <p>{fields.label}</p>
                                        </div>
                                        <div>
                                            <Muted>{t("field-points")}</Muted>
                                            <p>{fields.points}</p>
                                        </div>
                                        <div>
                                            <Muted>{t("field-type")}</Muted>
                                            <p>{t(fields.type)}</p>
                                        </div>
                                    </div>
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