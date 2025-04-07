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
import { SearchableInput } from '@/components/searchable-input'; // Import the updated searchable input component
import { TField } from '@/types';
import { sourceableFieldsEnum } from '@/enums';

export const Route = createFileRoute('/users/_usersLayout/submissions/new/$id')({
  component: NewSubmissionComponent,
});

function NewSubmissionComponent() {
  const { id } = Route.useParams();
  const { data: form, isFetching, isLoading } = useFullForm(parseInt(id));
  const { t } = useTranslation("translation");

  const { control, handleSubmit } = useForm();

  if (isLoading || isFetching) return <Loader />;

  const renderInput = (field: TField) => {
    if (["text", "email", "url"].includes(field.type))
      return (
        <div key={field.id} className="form-group">
          <Label className="flex items-center gap-1">
            {field.label}
            {field.required && <BadgeAlert className="h-4 w-4 text-red-300" />}
            {field.points > 0 && (
              <Badge className="bg-green-100 ltr:ml-auto rtl:mr-auto border-green-200" variant="outline">
                {t("points")} {field.points}
              </Badge>
            )}
          </Label>
          <Controller
            name={`fields.${field.id}`}
            control={control}
            render={({ field: controllerField }) => (
              <Input {...controllerField} required={field.required} />
            )}
          />
        </div>
      );
    else {
      return (
        <div key={field.id} className="form-group">
          <Label className="flex items-center gap-1">
            {field.label}
            {field.required && <BadgeAlert className="h-4 w-4 text-red-300" />}
            {field.points > 0 && (
              <Badge className="bg-green-100 ltr:ml-auto rtl:mr-auto border-green-200" variant="outline">
                {t("points")} {field.points}
              </Badge>
            )}
          </Label>
          {/* Integrating the SearchableInput component */}
          <Controller
            name={`fields.${field.id}`}
            control={control}
            render={({ field: controllerField }) => (
              <SearchableInput
                target={field.type as sourceableFieldsEnum}
                onChange={(id) => controllerField.onChange(id)}
              />
            )}
          />
        </div>
      );
    }
  };

  return (
    <div className="content-container">
      <TopBar page_name="newSubmissions" />
      <div className="p-2">
        <form className="form" onSubmit={handleSubmit((data) => console.log(data))}>
          <H2>{form?.title}</H2>
          {form?.blocks?.map((block) => (
            <div key={block.id} className="border shadow-sm rounded-sm dark:bg-zinc-800 dark:border-zinc-700">
              <div className="p-2 bg-muted flex justify-between">
                <H4>{block.label}</H4>
                <Badge>{t("number-of-fields")} {block.fields.length}</Badge>
              </div>
              <div className="min-h-14 p-2 space-y-6 mb-10">
                {block.fields.flat().map((field) => renderInput(field))}
              </div>
            </div>
          ))}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
