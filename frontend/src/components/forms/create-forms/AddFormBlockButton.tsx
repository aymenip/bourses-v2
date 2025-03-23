import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormStore } from '@/store/formStore';
import { useCreateFormBlock } from '@/api/forms/mutations';
import { toast } from 'sonner';

interface AddFormBlockButtonProps {
}

export const AddFormBlockButton: React.FC<AddFormBlockButtonProps> = () => {
    const [t, i18n] = useTranslation("translation")
    const [FormBlockTitle, setFormBlockTitle] = useState<string>()
    const currentForm = useFormStore((state) => state.currentForm);
    const addFormBlock = useFormStore((state) => state.addBlockToCurrentForm);
    const { data: createdFormBlock, mutate: createFormBlock, isError, isPending, isSuccess } = useCreateFormBlock()
    const onAddButtonClick = () => {
        createFormBlock({
            formId: currentForm!.id,
            label: FormBlockTitle!
        })
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
            <form className='flex-1'>
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
                        <DialogHeader dir={i18n.dir()}>
                            <DialogTitle dir={i18n.dir()}>{t("add-new-block")}</DialogTitle>
                            <DialogDescription dir={i18n.dir()}>
                                <span className='font-bold'>{currentForm!.title}</span>
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="block-title" className="text-right">
                                    {t("title")}
                                </Label>
                                <Input
                                    onChange={(e) => setFormBlockTitle(e.target.value)}
                                    required
                                    id="block-title"
                                    placeholder={t("block-title")}
                                    className="col-span-3"

                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={() => onAddButtonClick()}>
                                {t("add")}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </form>
        </div>
    );
};