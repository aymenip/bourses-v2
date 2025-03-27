import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormStore } from '@/store/formStore';
import { useCreateFormBlock } from '@/api/forms/mutations';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { FormBlockSchema, TFormBlock } from '@/types/forms';
import { zodResolver } from '@hookform/resolvers/zod';
import { CrossCircledIcon } from '@radix-ui/react-icons';

interface AddFormBlockButtonProps {
}

export const AddFormBlockButton: React.FC<AddFormBlockButtonProps> = () => {
    const [t, i18n] = useTranslation("translation")
    const currentForm = useFormStore((state) => state.currentForm);
    const addFormBlock = useFormStore((state) => state.addBlockToCurrentForm);
    const { data: createdFormBlock, mutate: createFormBlock, isError, isPending, isSuccess } = useCreateFormBlock()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TFormBlock>({
        defaultValues: {
            id: 0,
            formId: currentForm?.id,
            label: "",
        },
        resolver: zodResolver(FormBlockSchema),
    });

    const formSubmit = (formBlock: TFormBlock) => {
        createFormBlock(formBlock)
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success(t("block-creation-success"))
            addFormBlock({
                ...createdFormBlock,
                fields: []
            })
        } else if (isPending) {
            toast.info(t("block-creation-pending"))
        } else if (isError) {
            toast.error(t("block-creation-error"))
        }
    }, [isError, isPending, isSuccess])
    return (
        <div className='flex'>

            <Dialog>
                <DialogTrigger asChild className='w-full'>
                    <Button
                        variant={"ghost"}
                        size={"lg"}
                        className='py-4 text-lg flex-1 border-2 border-dashed rounded-none dark:border-zinc-800/30 dark:hover:bg-foreground/5'
                    >
                        {t("add-new-block")}
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]" dir={i18n.dir()}>
                    <form id="form-block-form" className="w-full grid gap-4 py-4" onSubmit={handleSubmit(formSubmit)}>
                        <DialogHeader dir={i18n.dir()}>
                            <DialogTitle dir={i18n.dir()}>{t("add-new-block")}</DialogTitle>
                            <DialogDescription dir={i18n.dir()}>
                                <span className='font-bold'>{currentForm!.title}</span>
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="form-group">
                                <Label>{t("block-title")}</Label>
                                <Input {...register("label")} placeholder={t("block-title")} type="text" />
                                {errors.label && (
                                    <div className="form-error">
                                        <CrossCircledIcon />
                                        <span className="flex items-center gap-x-1">{t(errors.label?.message || "")}</span>
                                    </div>
                                )}

                            </div>
                        </div>
                        <DialogFooter>
                            <Button form="form-block-form" type="submit">
                                {t("add")}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};