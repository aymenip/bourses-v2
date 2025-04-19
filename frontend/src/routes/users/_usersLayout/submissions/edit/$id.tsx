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
import { useState } from "react";
import { Switch } from "@/components/ui/switch";

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

  const [status, setStatus] = useState<"draft" | "submitted">("draft");
  const [t] = useTranslation("translation");
  const { mutate: updateSubmission } = useUpdateSubmission();

  const loading = isSubmissionLoading || isFormLoading || !form || !submission;
  const isHydrated = submission && status !== submission.status;

  // Safely update status after initial load
  useState(() => {
    if (isHydrated) {
      setStatus(submission.status);
    }
  });

  if (loading) return <Loader />;

  const rawData = typeof submission.data === "string"
    ? JSON.parse(submission.data)
    : submission.data;

  const defaultValues: Record<string, any> = {};
  form?.blocks?.forEach((block) => {
    block.fields.flat().forEach((field) => {
      const key = generateFieldName(block.id, field.id);
      defaultValues[key] = rawData?.[field.label] ?? '';
    });
  });

  const handleSubmit = (formData: Record<string, any>) => {
    const updatedData: Record<string, any> = {};
    form.blocks?.forEach((block) => {
      block.fields.flat().forEach((field) => {
        const key = generateFieldName(field.blockId, field.id);
        updatedData[field.label] = formData[key];
      });
    });

    updateSubmission({
      id: submission.id,
      formId: form.id,
      data: updatedData,
      status: status,
    });

    toast.success(t("submission-update-success"));
  };

  return (
    <div className="content-container">
      <TopBar page_name="edit-submission" />
      <div className="p-2">
        <div className="p-2 max-w-[900px] mx-auto">
          <div className="flex justify-between mb-4 md:flex-row flex-col">
            <H2>{form.title}</H2>
            <div className="flex items-center justify-center space-x-2 border px-2 py-2 md:py-0 w-fit rounded-sm shadow-sm">
              <span className="w-[140px]">{`${t("mode")}: ${t(status)}`}</span>
              <Switch
                dir="ltr"
                checked={status === "submitted"}
                onCheckedChange={() =>
                  setStatus(status === "draft" ? "submitted" : "draft")
                }
                id="status"
              />
            </div>
          </div>
          <FormRenderer
            form={form}
            onSubmit={handleSubmit}
            defaultValues={defaultValues}
            submitLabel="update"
            isDraft={status === "draft"}
          />
        </div>

      </div>
    </div>
  );
}
