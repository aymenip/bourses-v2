import { useFullForm } from '@/api/forms/queries';
import { Loader } from '@/components/global/loader';
import { TopBar } from '@/components/global/topBar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { H2, H4 } from '@/components/ui/typography';
import { createFileRoute } from '@tanstack/react-router';
import { BadgeAlert } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useMemo } from 'react';
import { TField } from '@/types';
import { sourceableFieldsEnum } from '@/enums';
import { Button } from '@/components/ui/button';
import { SearchableInput } from '@/components/searchable-input';
import { useCreateSubmission } from '@/api/mutations';
import { toast } from 'sonner';

// Route definition
export const Route = createFileRoute('/users/_usersLayout/submissions/new/$id')({
  component: NewSubmissionComponent,
});

// Field name helper
const generateFieldName = (blockId: number, fieldId: number) => `field_${blockId}_${fieldId}`;

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


function NewSubmissionComponent() {
  const { id } = Route.useParams();

  const { data: form, isFetching, isLoading } = useFullForm(parseInt(id));
  const { t } = useTranslation("translation");

  const allFields = useMemo(() => form?.blocks?.flatMap(block => block.fields.flat()) ?? [], [form]);
  const schema = useMemo(() => generateZodSchema(allFields), [allFields]);
  const { control, handleSubmit, formState: { errors } } = useForm<Record<string, any>>({
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  if (isLoading || isFetching || !form) return <Loader />;
  const { mutate: createSubmission, isSuccess: isSubmissionCreationSuccess, isPending: isSubmissionCreationPending, isError: isSubmissionCreationError } = useCreateSubmission();
  const onSubmit = (data: any) => {

    const result: Record<string, any> = {};

    form.blocks?.forEach(block => {
      block.fields.flat().forEach(field => {
        const key = generateFieldName(field.blockId, field.id);
        result[field.label] = data[key];
      });
    });

    createSubmission({ data: result, status: "draft", formId: form.id, })
  };

  useEffect(() => {
    let toastId: string | number | null = null

    if (isSubmissionCreationPending) {
      toastId = toast.loading(t('book-creation-pending')) // Save toast ID
    }

    if (isSubmissionCreationSuccess) {
      if (toastId) toast.dismiss(toastId) // Dismiss loading toast
      toast.success(t('book-creation-success'))
    }

    if (isSubmissionCreationError) {
      if (toastId) toast.dismiss(toastId)
      toast.error(t('book-creation-error'))
    }

    return () => {
      if (toastId) toast.dismiss(toastId) // Cleanup on unmount
    }
  }, [isSubmissionCreationSuccess, isSubmissionCreationPending, isSubmissionCreationError])

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
    <div className="content-container">
      <TopBar page_name="newSubmissions" />
      <div className="p-2">
        <H2>{form.title}</H2>
        <form className="form grid grid-cols-2 gap-2" onSubmit={handleSubmit(onSubmit)}>
          {form.blocks?.map(block => (
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
          <Button type="submit">{t("submit")}</Button>
        </form>
      </div>
    </div>
  );
}
