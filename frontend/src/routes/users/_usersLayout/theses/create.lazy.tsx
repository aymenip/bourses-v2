import { useUploadDocument } from '@/api/documents/mutations';
import FilesUploader from '@/components/file-uploader';
import { TopBar } from '@/components/global/topBar';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../components/ui/select"
import { Muted } from '@/components/ui/typography';
import { CreateThesisSchema, TCreateThesis } from '@/types/thesis';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@radix-ui/react-dropdown-menu';
import { CrossCircledIcon } from '@radix-ui/react-icons';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { format } from "date-fns";
import { useCreateThesis } from '@/api/theses/mutations';
import Note from '@/components/Note';


export const Route = createLazyFileRoute('/users/_usersLayout/theses/create')({
  component: CreateThesis,
});

function CreateThesis() {
  const form = useForm<TCreateThesis>({
    resolver: zodResolver(CreateThesisSchema),
    defaultValues: {
      year: format(new Date(), "yyyy-mm-dd"),
      documentId: 0, // Ensure it's null initially
      title: '',
      isSupervisor: true,
      type: 'phd', // phd | master | license
    },
  });

  const {
    mutate: uploadDocument,
    data: uploadedDocument,
    isSuccess: isUploadSuccess,
    isPending: isUploadPending,
    isError: isUploadError,
  } = useUploadDocument();

  const [files, setFiles] = useState<File[] | null>(null);
  const [documentId, setDocumentId] = useState<number | null>(null);
  const [t, i18n] = useTranslation("translation");

  const dropZoneConfig = {
    maxFiles: 1,
    maxSize: 1024 * 1024 * 10, // 10MB
    multiple: false,
  };

  function onUpload() {
    if (files && files.length > 0) {
      uploadDocument({ file: files[0], type: files[0].name.split(".").pop() || "unknown" });
    }
  }

  useEffect(() => {
    let toastId: string | number | null = null;

    if (isUploadPending) {
      toastId = toast.loading(t("file-upload-pending")); // Save toast ID
    }

    if (isUploadSuccess && uploadedDocument) {
      if (toastId) toast.dismiss(toastId); // Dismiss loading toast
      toast.success(t("file-uploaded"));
      setDocumentId(uploadedDocument.id);
      form.setValue("documentId", uploadedDocument.id);
    }

    if (isUploadError) {
      if (toastId) toast.dismiss(toastId);
      toast.error(t("file-upload-error"));
    }

    return () => {
      if (toastId) toast.dismiss(toastId); // Cleanup on unmount
    };
  }, [isUploadSuccess, isUploadPending, isUploadError, uploadedDocument]);


  const { mutate: createThesis, isSuccess: isThesisCreationSuccess, isError: isThesisCreationError, isPending: isThesisCreationPending } = useCreateThesis()

  function onSubmit(values: TCreateThesis) {
    if (!values.documentId) {
      toast.error(t("please-upload-document"));
      return;
    }
    try {
      createThesis({ ...values, year: format(new Date(values.year), "yyyy-MM-dd") });
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }


  useEffect(() => {

    let toastId: string | number | null = null;

    if (isThesisCreationPending) {
      toastId = toast.loading(t("thesis-creation-pending")); // Save toast ID
    }

    if (isThesisCreationSuccess) {
      if (toastId) toast.dismiss(toastId); // Dismiss loading toast
      toast.success(t("thesis-creation-success"));

    }

    if (isThesisCreationError) {
      if (toastId) toast.dismiss(toastId);
      toast.error(t("thesis-creation-error"));
    }

    return () => {
      if (toastId) toast.dismiss(toastId); // Cleanup on unmount
    };
  }, [isThesisCreationSuccess, isThesisCreationPending, isThesisCreationError]);

  return (
    <div className='content-container'>
      <TopBar page_name='theses/create' />
      <div className='px-10 p-6 flex justify-center gap-x-2 '>
        <form
          id="form-add-thesis"
          className='form flex-1 py-6 px-4 border max-w-[1200px]'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Note />
          <div className='form-group'>
            <Label>{t("attach-file")}</Label>
            <FilesUploader files={files} onValueChange={setFiles} dropzoneOptions={dropZoneConfig} />
            {files && files.length > 0 && (
              <Button type='button' form={undefined} onClick={onUpload} variant={"secondary"} disabled={isUploadPending}>
                {isUploadPending ? t("uploading...") : t("upload")}
              </Button>
            )}
          </div>

          {documentId && (
            <>


              <div className='flex gap-4'>
                <div className="form-group flex-1  flex flex-col">
                  <Label>{t("title")}</Label>
                  <Input {...form.register("title")} placeholder={t("title")} type="text" />
                  {form.formState.errors.title && (
                    <div className="form-error">
                      <CrossCircledIcon />
                      <span className="flex items-center gap-x-1">
                        {t(form.formState.errors.title?.message || "")}
                      </span>
                    </div>
                  )}
                </div>

                <div className="form-group col-span-3  flex flex-col">
                  <Label>{t("year")}</Label>
                  <Controller
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <Input
                        type="date"
                        value={format(new Date(field.value), 'yyyy-MM-dd')}
                        onChange={(e) =>
                          field.onChange(format(new Date(e.target.value), 'yyyy-MM-dd'))
                        }
                        className='w-fit'
                      />
                    )}
                  />
                  {form.formState.errors.year && (
                    <div className="form-error">
                      <CrossCircledIcon />
                      <span className="flex items-center gap-x-1">
                        {t(form.formState.errors.title?.message || "")}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group">
                <Label>{t("thesis-type")}</Label>
                <Controller
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange} dir={i18n.dir()}>
                      <SelectTrigger>
                        <SelectValue placeholder={t("select-thesis-type")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="phd">{t("phd-thesis")}</SelectItem>
                        <SelectItem value="master">{t("master-thesis")}</SelectItem>
                        <SelectItem value="license">{t("license-thesis")}</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="form-group">
                <Label>{t("isSupervisor")}</Label>
                <Controller
                  control={form.control}
                  name="isSupervisor"
                  render={({ field }) => (
                    <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <Checkbox
                        className='rtl:ml-2'
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <div className="space-y-1 leading-none">
                        <div>{t("are-you-supervisor")}</div>
                        <Muted>{t("supervisor-unchecked")}</Muted>
                      </div>
                    </div>
                  )}
                />
              </div>

              <Button type='submit' disabled={!documentId} form="form-add-thesis">
                {t("add")}
              </Button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
