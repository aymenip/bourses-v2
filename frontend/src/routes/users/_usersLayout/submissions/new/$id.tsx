// import { useFullForm } from '@/api/forms/queries';
// import { Loader } from '@/components/global/loader';
// import { TopBar } from '@/components/global/topBar';
// import { Badge } from '@/components/ui/badge';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { H2, H4 } from '@/components/ui/typography';
// import { createFileRoute } from '@tanstack/react-router';
// import { BadgeAlert, SaveIcon } from 'lucide-react';
// import { useTranslation } from 'react-i18next';
// import { useForm, Controller } from 'react-hook-form';
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { useMemo, useState } from 'react';
// import { TField } from '@/types';
// import { sourceableFieldsEnum } from '@/enums';
// import { Button } from '@/components/ui/button';
// import { SearchableInput } from '@/components/searchable-input';
// import { useCreateSubmission } from '@/api/mutations';
// import { toast } from 'sonner';
// import { Switch } from '@/components/ui/switch';

// // Route definition
// export const Route = createFileRoute('/users/_usersLayout/submissions/new/$id')({
//   component: NewSubmissionComponent,
// });

// // Field name helper
// const generateFieldName = (blockId: number, fieldId: number) => `field_${blockId}_${fieldId}`;

// const generateZodSchema = (fields: TField[]) => {
//   const shape: Record<string, z.ZodTypeAny> = {};

//   fields.forEach(field => {
//     const name = generateFieldName(field.blockId, field.id);

//     if (["text", "email", "url"].includes(field.type)) {
//       let rule = z.string();
//       if (field.required) rule = rule.min(1, `${field.label} is required`);
//       if (field.type === "email") rule = rule.email(`${field.label} must be a valid email`);
//       if (field.type === "url") rule = rule.url(`${field.label} must be a valid URL`);
//       shape[name] = rule;
//     } else {
//       let rule = z.union([z.string(), z.number()]).refine(
//         val => val !== undefined && val !== null && val !== '',
//         { message: `${field.label} is required` }
//       );
//       shape[name] = rule;
//     }
//   });

//   return z.object(shape);
// };


// function NewSubmissionComponent() {
//   const { id } = Route.useParams();
//   const [status, setStatus] = useState<"draft" | "submitted">("draft");
//   const { data: form, isFetching, isLoading } = useFullForm(parseInt(id));
//   const [t, i18n] = useTranslation("translation");

//   const allFields = useMemo(() => form?.blocks?.flatMap(block => block.fields.flat()) ?? [], [form]);
//   const schema = useMemo(() => generateZodSchema(allFields), [allFields]);

//   const { control, handleSubmit, formState: { errors } } = useForm<Record<string, any>>({
//     resolver: zodResolver(schema),
//     defaultValues: {},
//   });

//   const { mutate: createSubmission, isSuccess: isSubmissionCreationSuccess, isPending: isSubmissionCreationPending, isError: isSubmissionCreationError } = useCreateSubmission();

//   if (isLoading || isFetching || !form) return <Loader />;

//   const onSubmit = (data: any) => {

//     const result: Record<string, any> = {};

//     form.blocks?.forEach(block => {
//       block.fields.flat().forEach(field => {
//         const key = generateFieldName(field.blockId, field.id);
//         result[field.label] = data[key];
//       });
//     });

//     createSubmission({ data: result, status: status, formId: form.id })
//     if (isSubmissionCreationSuccess) toast.success(t('submision-creation-success'))
//   };


//   const renderInput = (field: TField) => {
//     const name = generateFieldName(field.blockId, field.id);
//     const error = errors[name]?.message as string | undefined;

//     return (
//       <div key={name} className="form-group space-y-1">
//         <Label className="flex items-center gap-1">
//           {field.label}
//           {field.required && <BadgeAlert className="h-4 w-4 text-red-400" />}
//           {field.points > 0 && (
//             <Badge className="bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100 ltr:ml-auto rtl:mr-auto border-green-200 dark:border-green-700" variant="outline">
//               {t("points")} {field.points}
//             </Badge>
//           )}
//         </Label>

//         <Controller
//           name={name}
//           control={control}
//           render={({ field: controllerField }) =>
//             ["text", "email", "url"].includes(field.type) ? (
//               <Input {...controllerField} required={field.required} />
//             ) : (
//               <SearchableInput
//                 target={field.type as sourceableFieldsEnum}
//                 onChange={(id) => controllerField.onChange(id)}
//               />
//             )
//           }
//         />

//         {error && (
//           <p className="text-sm text-red-500">{error}</p>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className="content-container">
//       <TopBar page_name="newSubmissions" />
//       <div className="p-2">
//         <div className='flex justify-between mb-4'>
//           <H2>{form.title}</H2>
//           <div className="flex items-center justify-center space-x-2 border px-2 rounded-sm shadow-sm">
//             <span className='w-[140px]'>{`${t("mode")}: ${t(status)}`}</span>
//             <Switch dir={"ltr"} onCheckedChange={() => setStatus((status === "draft" ? "submitted" : "draft"))} id="status" />
//           </div>
//         </div>
//         <form className="form grid grid-cols-2 gap-2" onSubmit={handleSubmit(onSubmit)}>
//           {form.blocks?.map(block => (
//             <div key={block.id} className="border shadow-sm rounded-sm dark:bg-zinc-800 dark:border-zinc-700">
//               <div className="p-2 bg-muted flex justify-between">
//                 <H4>{block.label}</H4>
//                 <Badge>{t("number-of-fields")} {block.fields.length}</Badge>
//               </div>
//               <div className="min-h-14 p-2 space-y-6 mb-10">
//                 {block.fields.flat().map(renderInput)}
//               </div>
//             </div>
//           ))}
//           <Button>
//             <SaveIcon className='mx-1 w-5 h-5' />
//             {t("submit")}
//           </Button>
//         </form>
//       </div>
//     </div>
//   );
// }

// routes/users/_usersLayout/submissions/new/$id.tsx
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
  };

  return (
    <div className="content-container">
      <TopBar page_name="newSubmissions" />
      <div className="p-2">
        <div className="flex justify-between mb-4">
          <H2>{form.title}</H2>
          <div className="flex items-center justify-center space-x-2 border px-2 rounded-sm shadow-sm">
            <span className='w-[140px]'>{`${t("mode")}: ${t(status)}`}</span>
            <Switch dir="ltr" onCheckedChange={() => setStatus(status === "draft" ? "submitted" : "draft")} id="status" />
          </div>
        </div>
        <FormRenderer form={form} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
