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

export const generateFieldName = (blockId: number, fieldId: number) =>
    `field_${blockId}_${fieldId}`;

const generateZodSchema = (fields: TField[]) => {
    const shape: Record<string, z.ZodTypeAny> = {};

    fields.forEach(field => {
        const name = generateFieldName(field.blockId, field.id);

        if (["text", "email", "url"].includes(field.type)) {
            let rule = z.string();
            if (field.required) rule = rule.min(1, `${field.label} is required`);
            if (field.type === "email") rule = rule.email(`${field.label} must be a valid email`);
            if (field.type === "url") rule = rule.url(`${field.label} must be a valid URL`);
            shape[name] = rule;
        } else {
            let rule = z.union([z.string(), z.number()]).refine(
                val => val !== undefined && val !== null && val !== '',
                { message: `${field.label} is required` }
            );
            shape[name] = rule;
        }
    });

    return z.object(shape);
};

export function FormRenderer({ form, onSubmit, defaultValues = {}, submitLabel = "submit" }: {
    form: any;
    onSubmit: (data: Record<string, any>) => void;
    defaultValues?: Record<string, any>;
    submitLabel?: string;
}) {
    const [t] = useTranslation("translation");
    const allFields = useMemo(() => form?.blocks?.flatMap((block: TFullFormBlock) => block.fields.flat()) ?? [], [form]);
    const schema = useMemo(() => generateZodSchema(allFields), [allFields]);

    const { control, handleSubmit, formState: { errors } } = useForm<Record<string, any>>({
        resolver: zodResolver(schema),
        defaultValues,
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
                    render={({ field: controllerField }) =>
                        ["text", "email", "url"].includes(field.type) ? (
                            <Input {...controllerField} required={field.required} />
                        ) : (
                            <SearchableInput
                                target={field.type as sourceableFieldsEnum}
                                onChange={(id) => controllerField.onChange(id)}
                            />
                        )
                    }
                />

                {error && (
                    <p className="text-sm text-red-500">{error}</p>
                )}
            </div>
        );
    };

    return (
        <form className="form grid md:grid-cols-2 gap-2" onSubmit={handleSubmit(onSubmit)}>
            {form.blocks?.map((block: TFullFormBlock) => (
                <div key={block.id} className="border shadow-sm rounded-sm dark:bg-zinc-800 dark:border-zinc-700">
                    <div className="p-2 bg-muted flex justify-between">
                        <H4>{block.label}</H4>
                        <Badge>{t("number-of-fields")} {block.fields.length}</Badge>
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
    );
}
