// routes/users/_usersLayout/submissions/edit/$id.tsx
import { createFileRoute } from "@tanstack/react-router";
import { useSubmission } from "@/api/submissions/queries";
import { useFullForm } from "@/api/forms/queries";
import { Loader } from "@/components/global/loader";
import { FormRenderer, generateFieldName } from "@/components/FormRenderer";
import { useUpdateSubmission } from "@/api/mutations";
import { TopBar } from "@/components/global/topBar";
import { H2 } from "@/components/ui/typography";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute('/users/_usersLayout/submissions/edit/$id')({
  component: EditSubmissionPage,
});

function EditSubmissionPage() {
  const { id } = Route.useParams();
  const { data: submission, isLoading: isSubmissionLoading } = useSubmission(Number(id));
  const formId = submission?.formId;
  const { data: form, isLoading: isFormLoading } = useFullForm(formId!, {
    enabled: !!formId,
  });

  const { mutate: updateSubmission, data: sbmission } = useUpdateSubmission();
  const [t] = useTranslation("translation");

  if (isSubmissionLoading || isFormLoading || !form || !submission) return <Loader />;


  const rawData = typeof submission.data === 'string'
    ? JSON.parse(submission.data)
    : submission.data;

  const defaultValues: Record<string, any> = {};
  form?.blocks?.forEach((block) => {
    block.fields.flat().forEach(field => {
      const key = generateFieldName(block.id, field.id);
      defaultValues[key] = rawData?.[field.label] ?? '';
    });
  });

  const handleSubmit = (formData: Record<string, any>) => {
    const updatedData: Record<string, any> = {};
    form.blocks?.forEach(block => {
      block.fields.flat().forEach(field => {
        const key = generateFieldName(field.blockId, field.id);
        updatedData[field.label] = formData[key];
      });
    });
    updateSubmission({
      id: submission.id,
      formId: form.id,
      data: updatedData,
      status: submission.status,
    });
    toast.success(t("submission-update-success"));
  };

  return (
    <div className="content-container">
      <TopBar page_name="editSubmission" />
      <div className="p-2">
        <H2>{form.title}</H2>
        <FormRenderer
          form={form}
          onSubmit={handleSubmit}
          defaultValues={defaultValues}
          submitLabel="update"
        />
      </div>
    </div>
  );
}
