// components/form/FormRenderer.tsx
import { useForm, Controller, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMemo, useCallback, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, BadgeAlert, LucideInfo, SaveIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchableInput } from "@/components/searchable-input";
import { H4 } from "@/components/ui/typography";
import { sourceableFieldsEnum } from "@/enums";
import { TField } from "@/types";
import { useTranslation } from "react-i18next";
import { TFullForm, TFullFormBlock } from "@/types/forms";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";
import i18n from "@/i18n";
import { MultiSelector, MultiSelectorContent, MultiSelectorInput, MultiSelectorItem, MultiSelectorList, MultiSelectorTrigger } from "./ui/multi-select";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { format, formatISO } from "date-fns";
import { cn } from "@/lib/utils";
import { AutosaveIndicator } from "@/hooks/use-form-autosave";
interface FormRendererProps {
    form: TFullForm;
    onSubmit: (data: Record<string, unknown>) => void;
    defaultValues?: Record<string, unknown>;
    submitLabel?: string;
    isDraft?: boolean;
}

export const generateFieldName = (blockId: number, fieldId: number) =>
    `field_${blockId}_${fieldId}`;

const generateZodSchema = (fields: TField[], t: (key: string) => string) => {
    return z.object(
        fields.reduce((acc, field) => {
            const name = generateFieldName(field.blockId, field.id);
            let schema: z.ZodTypeAny;
            switch (field.type) {
                case "text":
                    schema = z.string({
                        required_error: t("input-required")
                    });
                    break;

                case "email":
                    schema = z.string({
                        required_error: t("input-required")
                    }).email(t("validation.email"));
                    break;

                case "url":
                    schema = z.string({
                        required_error: t("input-required")
                    }).url(t("validation.url"));
                    break;

                case "number":
                    schema = z.number({
                        required_error: t("input-required"),
                        invalid_type_error: t("validation.number")
                    }).or(z.string().pipe(z.coerce.number()));
                    break;

                case "select":
                case "yes/no":
                    schema = z.string({
                        required_error: t("input-required")
                    });
                    break;

                case "multiselect": {
                    let arraySchema: z.ZodArray<z.ZodString> = z.array(z.string(), {
                        required_error: t("input-required")
                    });
                    if (field.required) {
                        arraySchema = arraySchema.min(1, t("input-required"));
                    }
                    schema = arraySchema;
                    break;
                }

                case "date":
                    schema = z.union([
                        z.string(),
                        z.date()
                    ], {
                        required_error: t("input-required"),
                        invalid_type_error: t("validation.date")
                    });
                    break;
                case "certificate":
                case "book":
                case "article":
                case "conference":
                case "thesis":
                    // other searchable types
                    schema = z.string({
                        required_error: t("input-required")
                    });
                    break;
                default:
                    schema = z.union([
                        z.string(),
                        z.number()
                    ], {
                        required_error: t("input-required")
                    });
            }

            if (!field.required) {
                schema = schema.optional();
            }

            acc[name] = schema;
            return acc;
        }, {} as Record<string, z.ZodTypeAny>)
    );
};

export function FormRenderer({ form, onSubmit, defaultValues = {}, submitLabel = "submit", isDraft = false }: FormRendererProps) {
    const { t } = useTranslation("translation");
    const allFields = useMemo(() => form?.blocks?.flatMap((block: TFullFormBlock) => block.fields.flat()) ?? [], [form]);
    const schema = useMemo(() => generateZodSchema(allFields, t), [allFields, t]);

    const methods = useForm<Record<string, unknown>>({
        resolver: isDraft ? undefined : zodResolver(schema),
        defaultValues
    });

    const completion = useMemo(() => {
        const totalFields = allFields.length;
        const completed = Object.keys(methods.getValues()).filter(k => methods.getValues()[k]).length;
        return Math.round((completed / totalFields) * 100);
    }, [methods.watch()]);

    const { control, handleSubmit, formState: { errors } } = methods;

    function FieldError({ error }: { error?: string }) {
        return error ? (
            <div className="flex items-center gap-1 text-red-500 text-sm mt-1 animate-shake">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
            </div>
        ) : null;
    }
    function FieldDescription({ description }: { description?: string }) {
        return description ? (
            <div className="flex items-center gap-1 text-blue-500/60 text-sm mt-1">
                <LucideInfo className="h-4 w-4 " />
                <span>{description}</span>
            </div>
        ) : null;
    }

    const renderInput = useCallback((field: TField) => {
        const name = generateFieldName(field.blockId, field.id);
        const error = errors[name]?.message as string | undefined;

        return (
            <div key={name} className="form-group space-y-2 mb-4">
                <Label className="flex items-center gap-1">
                    <span className="text-lg rtl:text-right ltr:text-left">
                        {field.label}
                    </span>
                    {field.required && <BadgeAlert className="h-4 w-4 text-red-400" />}
                    {field.points > 0 && (
                        <Badge className="bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100 ltr:ml-auto rtl:mr-auto border-green-200 dark:border-green-700" variant="outline">
                            {t("points")} {field.points}
                        </Badge>
                    )}
                </Label>

                <Controller
                    name={name}
                    control={control}
                    render={({ field: controllerField }) => {
                        switch (field.type) {
                            case "text":
                            case "email":
                            case "url":
                                return (
                                    <Input
                                        type={field.type}
                                        {...controllerField}
                                        value={controllerField.value as string | number | readonly string[] | undefined}
                                        aria-invalid={!!error}
                                    />
                                );

                            case "number":
                                return (
                                    <Input
                                        type="number"
                                        {...controllerField}
                                        value={controllerField.value as number | undefined}
                                        onChange={(e) => controllerField.onChange(e.target.valueAsNumber)}
                                        aria-invalid={!!error}
                                    />
                                );

                            case "select":
                                return (
                                    <Select
                                        value={controllerField.value as string}
                                        onValueChange={controllerField.onChange}
                                        dir={i18n.dir()}
                                    >
                                        <SelectTrigger aria-invalid={!!error}>
                                            <SelectValue placeholder={field.label} />
                                        </SelectTrigger>
                                        <SelectContent showSearch searchPlaceholder={t("search")}>
                                            <SelectGroup>
                                                <SelectLabel>{field.label}</SelectLabel>
                                                {field.choices?.map((choice, index) => (
                                                    <SelectItem
                                                        key={`${field.id}-${index}`}
                                                        value={choice}
                                                    >
                                                        {choice}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                );

                            case "multiselect":
                                return (
                                    <MultiSelector
                                        values={Array.isArray(controllerField.value) ? controllerField.value as string[] : []}
                                        onValuesChange={controllerField.onChange}
                                        loop={false}
                                        dir={i18n.dir()}
                                    >
                                        <MultiSelectorTrigger aria-invalid={!!error}>
                                            <MultiSelectorInput placeholder={t("enter-choices")} />
                                        </MultiSelectorTrigger>
                                        <MultiSelectorContent>
                                            <MultiSelectorList>
                                                {field.choices?.map((choice, i) => (
                                                    <MultiSelectorItem key={i} value={choice}>
                                                        {choice}
                                                    </MultiSelectorItem>
                                                ))}
                                            </MultiSelectorList>
                                        </MultiSelectorContent>
                                    </MultiSelector>
                                );

                            case "date":
                                return (
                                    <Input
                                        type="date"
                                        value={controllerField.value ? format(new Date(controllerField.value as string), 'yyyy-MM-dd') : ''}
                                        onChange={(e) => {
                                            const date = e.target.valueAsDate;
                                            controllerField.onChange(date ? formatISO(date) : null);
                                        }}
                                        aria-invalid={!!error}
                                    />
                                );

                            case "yes/no":
                                return (
                                    <RadioGroup
                                        dir={i18n.dir()}
                                        value={controllerField.value as string}
                                        onValueChange={controllerField.onChange}
                                        className="flex items-center gap-4"
                                    >
                                        <div className="flex items-center gap-1">
                                            <RadioGroupItem value="yes" id={`${name}-yes`} />
                                            <label htmlFor={`${name}-yes`} className="text-sm font-medium leading-none">
                                                {t("yes")}
                                            </label>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <RadioGroupItem value="no" id={`${name}-no`} />
                                            <label htmlFor={`${name}-no`} className="text-sm font-medium leading-none">
                                                {t("no")}
                                            </label>
                                        </div>
                                    </RadioGroup>
                                );

                            default:
                                return (
                                    <SearchableInput
                                        target={field.type as sourceableFieldsEnum}
                                        onChange={(idWithTarget) => {
                                            controllerField.onChange(idWithTarget);
                                        }}
                                        value={controllerField.value as string | undefined}
                                        aria-invalid={!!error}
                                    />
                                );
                        }
                    }}
                />
                <FieldDescription description={field.description} />
                <FieldError error={errors[name]?.message} />
            </div>
        );
    }, [control, errors, t]);


    const [currentBlock, setCurrentBlock] = useState(0);
    return (
        <FormProvider {...methods}>
            <div>
                <form
                    className="form flex flex-col gap-6 justify-center text-center max-w-[900px] w-full"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="w-full space-y-2 bg-gray-200 rounded-full h-2.5 mb-4">
                        <div
                            className="bg-primary h-2.5 rounded-full transition-all duration-500"
                            style={{ width: `${completion}%` }}
                        />
                        <Badge variant={"secondary"}>
                            {completion}%
                        </Badge>
                    </div>
                    {form.blocks?.map((block, index) => (
                        <div
                            key={block.id}
                            className={cn(
                                index === currentBlock ? 'block' : 'hidden',
                                "animate-fade-in"
                            )}
                        >
                            <div
                                key={block.id}
                                className="border shadow-sm rounded-sm dark:bg-zinc-800 dark:border-zinc-700"
                            >
                                <div className="p-2 bg-muted flex justify-between">
                                    <H4>{block.label}</H4>
                                    <Badge>
                                        {t("number-of-fields")} {block.fields.length}
                                    </Badge>
                                </div>
                                <div className="p-4 space-y-4">
                                    {block.fields.flat().map(renderInput)}
                                </div>
                            </div>
                        </div>
                    ))}
                    {/* Navigation controls */}
                    <div className="flex justify-between">
                        <Button variant={"outline"} type="button" onClick={() => setCurrentBlock(p => Math.max(0, p - 1))}>
                            {t("previous")}
                        </Button>
                        <Button variant={"outline"} type="button" onClick={() => setCurrentBlock(p => Math.min(form.blocks!.length - 1, p + 1))}>
                            {t("next")}
                        </Button>
                    </div>
                    <Button type="submit" className="self-center">
                        <SaveIcon className="mx-1 w-5 h-5" />
                        {t(submitLabel)}
                    </Button>
                    <AutosaveIndicator formKey={`${location.pathname.split("/").includes("new") ? "new" : "edit"}-${form.title}`} />
                </form>
            </div>
        </FormProvider>
    );
}