import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CrossCircledIcon, PlusCircledIcon } from '@radix-ui/react-icons';
import { TTypedField, TypedFieldSchema } from '@/types/forms';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderIcon } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCreateTypedField } from '@/api/forms/mutations';
import { toast } from 'sonner';
import { useFormStore } from '@/store/formStore';
import { Checkbox } from '@/components/ui/checkbox';
import { Muted } from '@/components/ui/typography';

interface AddNewTypedFieldButtonProps {
    blockId: number;
    formTitle: string;
    blockLabel: string;
}

export const AddNewTypedFieldButton: React.FC<AddNewTypedFieldButtonProps> = ({
    blockId,
    formTitle,
    blockLabel,
}) => {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors, isSubmitting },
        control
    } = useForm<TTypedField>({
        defaultValues: {
            id: 0,
            blockId,
            points: 0,
            type: "text",
            required: true
        },
        resolver: zodResolver(TypedFieldSchema),
    });

    const [t, i18n] = useTranslation("translation");
    const addFieldToBlock = useFormStore((state) => state.addFieldToBlock);

    const { mutate: createField, data: createdField, isPending, isError, isSuccess } = useCreateTypedField();

    const formSubmit = (typedField: TTypedField) => {
        createField(typedField);
    };

    // Handle mutation success, pending, and error states
    useEffect(() => {
        if (isSuccess && createdField) {
            toast.success(t("field-creation-success"));
            addFieldToBlock(createdField, blockId);
            reset();
        } else if (isPending) {
            toast.info(t("field-creation-pending"));
        } else if (isError) {
            toast.error(t("field-creation-error"));
        }
    }, [isError, isPending, isSuccess, createdField, blockId]);

    return (
        <Dialog>
            <DialogTrigger>
                <Button className="gap-x-1" variant={"link"} dir={i18n.dir()}>
                    {t("add-typed-field")}
                    <PlusCircledIcon />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]" dir={i18n.dir()}>
                <DialogHeader>
                    <DialogTitle>{t("add-new-typed-field")}</DialogTitle>
                    <DialogDescription>
                        <div className="font-bold">
                            <div>{formTitle}</div>
                            <div>{blockLabel}</div>
                        </div>
                    </DialogDescription>
                </DialogHeader>

                <form id="typed-field-form" className="form" onSubmit={handleSubmit(formSubmit)}>
                    <div className="form-group">
                        <Label>{t("field-label")}</Label>
                        <Input {...register("label")} placeholder={t("field-label")} type="text" />
                        {errors.label && (
                            <div className="form-error">
                                <CrossCircledIcon />
                                <span className="flex items-center gap-x-1">{t(errors.label?.message || "")}</span>
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <Label>{t("field-type")}</Label>
                        <RadioGroup
                            dir={i18n.dir()}
                            value={watch("type")}
                            onValueChange={(value) => setValue("type", value as any)}
                        >
                            {["text", "url", "date", "email", "number"].map((type) => (
                                <div key={type} className="flex items-center gap-x-2">
                                    <RadioGroupItem value={type} />
                                    <span>{t(type)}</span>
                                </div>
                            ))}
                        </RadioGroup>
                        {errors.type && (
                            <div className="form-error">
                                <CrossCircledIcon />
                                <span className="flex items-center gap-x-1">{t(errors.type?.message || "")}</span>
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <Label>{t("field-points")}</Label>
                        <Input
                            {...register("points", { valueAsNumber: true })}
                            placeholder={t("field-points")}
                            type="number"
                            defaultValue={0}
                        />
                        {errors.points && (
                            <div className="form-error">
                                <CrossCircledIcon />
                                <span className="flex items-center gap-x-1">{t(errors.points?.message || "")}</span>
                            </div>
                        )}
                    </div>
                    <div className="form-group">
                        <Label>{t("field-required")}</Label>
                        <Controller
                            control={control}
                            name="required"
                            render={({ field }) => (
                                <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                    <Checkbox
                                        className='rtl:ml-2'
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                    <div className="space-y-1 leading-none">
                                        <div>{t("field-required-description")}</div>
                                        <Muted>{t("field-required-unchecked")}</Muted>
                                    </div>
                                </div>
                            )}
                        />
                    </div>
                    <DialogFooter>
                        <Button form="typed-field-form" type="submit" className="w-full text-md font-bold" disabled={isPending || isSubmitting}>
                            {isPending ? <LoaderIcon className="animate-spin" /> : t("add")}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};