import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { CrossCircledIcon, PlusCircledIcon } from '@radix-ui/react-icons';
import { FieldSchema, TField, TFullFormBlock } from '@/types/forms';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateField } from '@/api/mutations';
import { LoaderIcon } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';

interface AddNewFieldButtonProps {
    title: string;
    block: TFullFormBlock;
    // setFormBlockTitle: (title: string) => void;
    // addFormBlock: () => void;
}

export const AddNewFieldButton: React.FC<AddNewFieldButtonProps> = ({
    title,
    block
    // setFormBlockTitle,
    // addFormBlock,
}) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TField>({
        resolver: zodResolver(FieldSchema),
    })

    const [t, i18n] = useTranslation("translation")

    const { isError, isPending, isSuccess, mutate } = useCreateField();

    const formSubmit = async (field: TField) => {
        console.log("field")
        // mutate(field);
    }

    return (
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
                    <form className="form" onSubmit={handleSubmit(formSubmit)}>
                        <div className="form-group">
                            <Label className="">{t('field-label')}</Label>
                            <Input
                                {...register('label')}
                                placeholder={t('field-label')}
                                type="text"
                            />
                            <div className="form-error">
                                {errors?.label && (
                                    <>
                                        <CrossCircledIcon />{' '}
                                        <span className="flex items-center gap-x-1">
                                            {t(errors.label?.message || '')}
                                        </span>{' '}
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="form-group">
                            <Label className="">{t('field-type')}</Label>
                            <Select>

                            </Select>
                            <Input
                                {...register('type')}
                                placeholder={t('field-type')}
                                type="text"
                            />
                            <div className="form-error">
                                {errors?.type && (
                                    <>
                                        <CrossCircledIcon />{' '}
                                        <span className="flex items-center gap-x-1">
                                            {t(errors.type?.message || '')}
                                        </span>{' '}
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="form-group">
                            <Label className="">{t('field-source')}</Label>
                            <Input
                                {...register('source')}
                                placeholder={t('field-source')}
                                type="text"
                            />
                            <div className="form-error">
                                {errors?.source && (
                                    <>
                                        <CrossCircledIcon />{' '}
                                        <span className="flex items-center gap-x-1">
                                            {t(errors.source?.message || '')}
                                        </span>{' '}
                                    </>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
                <DialogFooter>
                    <Button onClick={handleSubmit(formSubmit)} type="submit" className="w-full text-md font-bold">
                        {isPending ? <LoaderIcon className='animate-spin' /> : t('add')}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};