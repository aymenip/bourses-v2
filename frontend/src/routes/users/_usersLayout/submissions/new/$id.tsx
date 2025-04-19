import { useFullForm } from "@/api/forms/queries";
import { createFileRoute } from "@tanstack/react-router";
import { useCreateSubmission } from "@/api/mutations";
import { TopBar } from "@/components/global/topBar";
import { Loader } from "@/components/global/loader";
import { FormRenderer, generateFieldName } from "@/components/FormRenderer";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { H2 } from "@/components/ui/typography";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export const Route = createFileRoute('/users/_usersLayout/submissions/new/$id')({
  component: NewSubmissionPage,
});

function NewSubmissionPage() {
  const { id } = Route.useParams();
  const [status, setStatus] = useState<"draft" | "submitted">("draft");
  const { data: form, isLoading } = useFullForm(parseInt(id));
  const [t] = useTranslation("translation");
  const { mutate: createSubmission } = useCreateSubmission();
  if (isLoading || !form) return <Loader />;

  const handleSubmit = (formData: Record<string, any>) => {
    const result: Record<string, any> = {};
    form.blocks?.forEach(block => {
      block.fields.flat().forEach(field => {
        const key = generateFieldName(field.blockId, field.id);
        result[field.label] = formData[key];
      });
    });

    createSubmission({ formId: form.id, data: result, status });
    toast.success(t("submision-creation-success"));
  }

  return (
    <div className="content-container">
      <TopBar page_name="new-submissions" />
      <div className="p-2 max-w-[900px] mx-auto">
        <div className="flex justify-between mb-4 md:flex-row flex-col ">
          <H2>{form.title}</H2>
          <div className="flex items-center justify-center space-x-2 border px-2 py-2 md:py-0 w-fit rounded-sm shadow-sm">
            <span className='w-[140px]'>{`${t("mode")}: ${t(status)}`}</span>
            <Switch dir="ltr" onCheckedChange={() => setStatus(status === "draft" ? "submitted" : "draft")} id="status" />
          </div>
        </div>
        <FormRenderer form={form} onSubmit={handleSubmit} isDraft={status === "draft"} />
      </div>
    </div>
  );
}
