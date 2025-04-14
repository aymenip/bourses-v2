import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import React, { useEffect, useState } from 'react';
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
import { TagsInput } from '@/components/ui/tags-input';

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
                    {/* Label + Points */}
                    <div className="form-group grid-cols-4 gap-4">
                        <div className="col-span-3">
                            <Label>{t("field-label")}</Label>
                            <Input {...register("label")} placeholder={t("field-label")} type="text" />
                            {errors.label && (
                                <div className="form-error">
                                    <CrossCircledIcon />
                                    <span>{t(errors.label?.message || "")}</span>
                                </div>
                            )}
                        </div>
                        <div>
                            <Label>{t("field-points")}</Label>
                            <Input
                                {...register("points", { valueAsNumber: true })}
                                type="number"
                                placeholder={t("field-points")}
                            />
                            {errors.points && (
                                <div className="form-error">
                                    <CrossCircledIcon />
                                    <span>{t(errors.points?.message || "")}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Type Selection */}
                    <div className="form-group">
                        <Label>{t("field-type")}</Label>
                        <RadioGroup
                            dir={i18n.dir()}
                            value={watch("type")}
                            onValueChange={(value) => setValue("type", value as any)}
                            className="grid grid-cols-2 gap-2"
                        >
                            {["text", "url", "date", "email", "number", "yes/no", "select", "multiselect"].map((type) => (
                                <div key={type} className="flex items-center gap-x-2">
                                    <RadioGroupItem value={type} />
                                    <span>{t(type)}</span>
                                </div>
                            ))}
                        </RadioGroup>
                        {errors.type && (
                            <div className="form-error">
                                <CrossCircledIcon />
                                <span>{t(errors.type?.message || "")}</span>
                            </div>
                        )}
                    </div>

                    {/* Conditionally show choices */}
                    {["select", "multiselect"].includes(watch("type")) && (
                        <div className='form-group'>
                            <Label>{t("choices")}</Label>
                            <Controller
                                control={control}
                                name="choices"
                                render={({ field }) => (
                                    <TagsInput
                                        value={field.value || []}
                                        onValueChange={field.onChange}
                                        placeholder={t("enter-choices")}
                                        className="w-full"
                                    />
                                )}
                            />
                            {errors.choices && (
                                <div className="form-error">
                                    <CrossCircledIcon />
                                    <span>{t(errors.choices?.message || "")}</span>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Description */}
                    <div className='form-group '>
                        <Label>{t("field-description")}</Label>
                        <Input
                            {...register("description")}
                            placeholder={t("field-description")}
                            type="text"
                        />
                        {errors.description && (
                            <div className="form-error">
                                <CrossCircledIcon />
                                <span>{t(errors.description?.message || "")}</span>
                            </div>
                        )}
                    </div>

                    {/* Required Field Checkbox */}
                    <div className='form-group '>
                        <Label>{t("field-required")}</Label>
                        <Controller
                            control={control}
                            name="required"
                            render={({ field }) => (
                                <div className="flex flex-row items-start space-x-3 rounded-md border p-4">
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        className="rtl:ml-2"
                                    />
                                    <div className="space-y-1 leading-none">
                                        <div>{t("field-required-description")}</div>
                                        <Muted>{t("field-required-unchecked")}</Muted>
                                    </div>
                                </div>
                            )}
                        />
                    </div>

                    {/* Submit */}
                    <DialogFooter>
                        <Button
                            form="typed-field-form"
                            type="submit"
                            className="w-full text-md font-bold"
                            disabled={isPending || isSubmitting}
                        >
                            {isPending ? <LoaderIcon className="animate-spin" /> : t("add")}
                        </Button>
                    </DialogFooter>
                </form>

            </DialogContent>
        </Dialog>
    );
};