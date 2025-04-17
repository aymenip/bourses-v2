// components/form/FormRenderer.tsx
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { BadgeAlert, SaveIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchableInput } from "@/components/searchable-input";
import { H4 } from "@/components/ui/typography";
import { sourceableFieldsEnum } from "@/enums";
import { TField } from "@/types";
import { useTranslation } from "react-i18next";
import { TFullFormBlock } from "@/types/forms";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";
import i18n from "@/i18n";
import { MultiSelector, MultiSelectorContent, MultiSelectorInput, MultiSelectorItem, MultiSelectorList, MultiSelectorTrigger } from "./ui/multi-select";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export const generateFieldName = (blockId: number, fieldId: number) =>
    `field_${blockId}_${fieldId}`;

const generateZodSchema = (fields: TField[]) => {
    const shape: Record<string, z.ZodTypeAny> = {};

    fields.forEach(field => {
        const name = generateFieldName(field.blockId, field.id);

        if (["text", "email", "url", "select", "multiselect", "yes/no"].includes(field.type)) {
            let rule = field.type !== "multiselect" ? z.string() : z.array(z.any());
            if (field.required) rule = rule.min(1, `${field.label} is required`);
            if (field.type === "email" && rule instanceof z.ZodString) {
                rule = rule.email(`${field.label} must be a valid email`);
            }
            if (field.type === "url" && rule instanceof z.ZodString) {
                rule = rule.url(`${field.label} must be a valid URL`);
            }
            shape[name] = rule;
        } else {
            let rule = z.union([z.string(), z.number()]).refine(
                val => val !== undefined && val !== null && val !== '',
                { message: `${field.label} is required` }
            );
            shape[name] = rule;
        }
        if (!field.required) {
            shape[name] = shape[name].optional();
        }
    });

    return z.object(shape);
};

export function FormRenderer({ form, onSubmit, defaultValues = {}, submitLabel = "submit", isDraft = false }: {
    form: any;
    onSubmit: (data: Record<string, any>) => void;
    defaultValues?: Record<string, any>;
    submitLabel?: string;
    isDraft?: boolean,
}) {
    const [t] = useTranslation("translation");
    const allFields = useMemo(() => form?.blocks?.flatMap((block: TFullFormBlock) => block.fields.flat()) ?? [], [form]);
    const schema = useMemo(() => generateZodSchema(allFields), [allFields]);

    const { control, handleSubmit, formState: { errors } } = useForm<Record<string, any>>({
        resolver: isDraft ? undefined : zodResolver(schema),
        defaultValues
    });

    const renderInput = (field: TField) => {
        const name = generateFieldName(field.blockId, field.id);
        const error = errors[name]?.message as string | undefined;
        return (
            <div key={name} className="form-group space-y-1">
                <Label className="flex items-center gap-1">
                    {field.label}
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
                        const type = field.type;

                        if (["text", "email", "url", "number"].includes(type)) {
                            return <Input type={type} {...controllerField} />;
                        }

                        if (type === "select") {
                            return (
                                <Select
                                    {...controllerField}
                                    dir={i18n.dir()}
                                    onValueChange={controllerField.onChange}
                                >
                                    <SelectTrigger dir={i18n.dir()} >
                                        <SelectValue dir={i18n.dir()} placeholder={field.label} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup dir={i18n.dir()}>
                                            <SelectLabel dir={i18n.dir()}>{field.label}</SelectLabel>
                                            {
                                                field.choices?.map((choice) => <SelectItem dir={i18n.dir()} value={choice}>{choice}</SelectItem>)
                                            }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            );
                        }

                        if (type === "multiselect") {
                            return (
                                <MultiSelector
                                    values={Array.isArray(controllerField.value) ? controllerField.value : []}

                                    onValuesChange={(vals) => controllerField.onChange(vals)}
                                    loop={false}
                                    dir={i18n.dir()}
                                >
                                    <MultiSelectorTrigger dir={i18n.dir()}>
                                        <MultiSelectorInput dir={i18n.dir()} placeholder={t("enter-choices")} />
                                    </MultiSelectorTrigger>
                                    <MultiSelectorContent dir={i18n.dir()}>
                                        <MultiSelectorList dir={i18n.dir()}>
                                            {field.choices?.map((choice, i) => (
                                                <MultiSelectorItem key={i} value={choice}>
                                                    {choice}
                                                </MultiSelectorItem>
                                            ))}
                                        </MultiSelectorList>
                                    </MultiSelectorContent>
                                </MultiSelector>
                            );
                        }
                        if (type === "date") {
                            return (
                                <Input
                                    type="date"
                                    {...controllerField}
                                />);
                        }

                        if (type === "yes/no") {
                            return (
                                <RadioGroup
                                    dir={i18n.dir()}
                                    value={controllerField.value}
                                    onValueChange={(val) => controllerField.onChange(val)}
                                    className="flex items-center gap-4"
                                >
                                    <div className="flex items-center gap-1">
                                        <RadioGroupItem dir={i18n.dir()} value="yes" id="yes" />
                                        <label htmlFor="yes" className="text-sm font-medium leading-none">
                                            {t("yes")}
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <RadioGroupItem value="no" id="no" />
                                        <label htmlFor="no" className="text-sm font-medium leading-none">
                                            {t("no")}
                                        </label>
                                    </div>
                                </RadioGroup>
                            );
                        }

                        // Fallback: for types like "certificate", "book", etc.
                        return (
                            <SearchableInput
                                target={type as sourceableFieldsEnum}
                                onChange={(id) => controllerField.onChange(id)}
                            />
                        );
                    }}
                />

                {error && (
                    <p className="text-sm text-red-500">{error}</p>
                )}
            </div>
        );
    };

    return (
        <div className="flex justify-center px-4">
            <form
                className="form flex flex-col gap-5 justify-center text-center max-w-[900px] w-full"
                onSubmit={handleSubmit(onSubmit)}
            >
                {form.blocks?.map((block: TFullFormBlock) => (
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
                        <div className="min-h-14 p-2 space-y-6 mb-10">
                            {block.fields.flat().map(renderInput)}
                        </div>
                    </div>
                ))}
                <Button type="submit">
                    <SaveIcon className="mx-1 w-5 h-5" />
                    {t(submitLabel)}
                </Button>
            </form>
        </div>
    );
}
