import { useCreateForm } from '@/api/mutations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Muted } from '@/components/ui/typography';
import { cn } from '@/lib/utils';
import { useFormStore } from '@/store/formStore';
import { SymbolIcon } from '@radix-ui/react-icons';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner'
interface FormTitleInputProps {
}

export const FormTitleInput: React.FC<FormTitleInputProps> = () => {
    const [t, i18n] = useTranslation("translation")
    const { data: createdForm, mutate: createForm, isPending, isSuccess, isError } = useCreateForm();
    const currentForm = useFormStore((state) => state.currentForm);
    const lastChange = useFormStore((state) => state.lastChange);
    const setCurrentForm = useFormStore((state) => state.setCurrentForm);
    const setCurrentFormTitle = useFormStore((state) => state.setCurrentFormTitle);
    const [title, setTitle] = useState<string | null>(currentForm?.title ?? null);

    const onSaveClick = (newTitle: string) => {
        createForm({ ...currentForm, title: newTitle })
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success(t("form-creation-success"))
            if (!currentForm) {
                setCurrentForm(createdForm);
            } else {
                setCurrentFormTitle(createdForm.title)
            }
        } else if (isPending) {
            toast.info(t("form-creation-pending"))
        } else if (isError) {
            toast.error(t("form-creation-error"))
        }
    }, [isError, isPending, isSuccess])

    return (
        <div>

            <div className='flex justify-end items-center relative'>
                <Button disabled={title ? false : true} onClick={() => onSaveClick(title!)} className=' rounded-full absolute m-4'>
                    {t("save")}
                    <SymbolIcon className={cn("ltr:ml-2 rtl:mr-2", { "animate-spin": isPending })} />
                </Button>
                <Input
                    onChange={(e) => setTitle(e.target.value)}
                    value={title ?? currentForm?.title ?? ""}
                    className='h-20 text-3xl placeholder:text-3xl dark:placeholder:text-zinc-500 rounded-none border-0 border-b-2 dark:border-b-zinc-500 dark:bg-zinc-800/30 bg-zinc-800/5'
                    placeholder={t("type-form-name")}
                />
            </div>
            {lastChange && (
                <Muted>
                    {t("form-title-last-save")} <span className='font-bold'>{lastChange}</span>
                </Muted>
            )}
        </div>
    );
};