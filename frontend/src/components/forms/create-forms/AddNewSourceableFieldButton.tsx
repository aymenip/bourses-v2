import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CrossCircledIcon, PlusCircledIcon } from '@radix-ui/react-icons';
import { TSourceableField, SourceableFieldSchema } from '@/types/forms';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateSourceableField } from '@/api/forms/mutations';
import { toast } from 'sonner';
import { useFormStore } from '@/store/formStore';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { LoaderIcon } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Muted } from '@/components/ui/typography';
import { sourceableFieldsEnum } from '@/enums';

interface AddNewSourceableFieldButtonProps {
    blockId: number;
    formTitle: string;
    blockLabel: string;
}

export const AddNewSourceableFieldButton: React.FC<AddNewSourceableFieldButtonProps> = ({
    blockId,
    formTitle,
    blockLabel,
}) => {

    const [t, i18n] = useTranslation("translation");
    const addFieldToBlock = useFormStore((state) => state.addFieldToBlock);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors, isSubmitting },
        control
    } = useForm<TSourceableField>({
        defaultValues: {
            id: 0,
            blockId,
            points: 0,
            type: "certificate",
            label: "",
            required: true
        },
        resolver: zodResolver(SourceableFieldSchema),
    });

    const {
        mutate: createField,
        data: createdField,
        isPending,
        isError,
        isSuccess
    } = useCreateSourceableField();

    const formSubmit = (sourceableField: TSourceableField) => {
        createField(sourceableField);
    };

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
    }, [isError, isPending, isSuccess, createdField, blockId, t, addFieldToBlock, reset]);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="gap-x-1" variant="link" dir={i18n.dir()}>
                    {t("add-sourceable-field")}
                    <PlusCircledIcon />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]" dir={i18n.dir()}>
                <DialogHeader>
                    <DialogTitle>{t("add-new-sourceable-field")}</DialogTitle>
                    <DialogDescription>
                        <div className="font-bold">
                            <div>{formTitle}</div>
                            <div>{blockLabel}</div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <form id="sourceable-field-form" className="form" onSubmit={handleSubmit(formSubmit)}>
                    <div className="form-group">
                        <Label htmlFor="label">{t("field-label")}</Label>
                        <Input
                            id="label"
                            {...register("label")}
                            placeholder={t("field-label")}
                            type="text"
                        />
                        {errors.label && (
                            <div className="form-error">
                                <CrossCircledIcon />
                                <span className="flex items-center gap-x-1">
                                    {t(errors.label?.message || "")}
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <Label>{t("field-type")}</Label>
                        <RadioGroup
                            dir={i18n.dir()}
                            value={watch("type")}
                            onValueChange={(value) => {
                                setValue("type", value as sourceableFieldsEnum);
                            }}
                        >
                            {["article", "certificate", "book", "conference", "thesis"].map((type) => (
                                <div key={type} className="flex items-center gap-x-2">
                                    <RadioGroupItem value={type} id={type} />
                                    <Label htmlFor={type}>{t(type)}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                        {errors.type && (
                            <div className="form-error">
                                <CrossCircledIcon />
                                <span className="flex items-center gap-x-1">
                                    {t(errors.type?.message || "")}
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <Label htmlFor="points">{t("field-points")}</Label>
                        <Input
                            id="points"
                            {...register("points", { valueAsNumber: true })}
                            placeholder={t("field-points")}
                            type="number"
                            min="0"
                            defaultValue={0}
                        />
                        {errors.points && (
                            <div className="form-error">
                                <CrossCircledIcon />
                                <span className="flex items-center gap-x-1">
                                    {t(errors.points?.message || "")}
                                </span>
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
                        <Button
                            form="sourceable-field-form"
                            type="submit"
                            className="w-full text-md font-bold"
                            disabled={isPending || isSubmitting}
                        >
                            {isPending ? (
                                <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                t("add")
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};