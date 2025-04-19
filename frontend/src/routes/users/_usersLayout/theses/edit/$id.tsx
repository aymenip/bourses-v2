import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { format } from 'date-fns'
import { toast } from 'sonner'

import { TopBar } from '@/components/global/topBar'
import FilesUploader from '@/components/file-uploader'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { CrossCircledIcon } from '@radix-ui/react-icons'

import { CreateThesisSchema, TCreateThesis } from '@/types/thesis'
import { useUploadDocument } from '@/api/documents/mutations'
import { Loader } from '@/components/global/loader'
import { useThesis } from '@/api/theses/queries'
import { useUpdateThesis } from '@/api/theses/mutations'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Muted } from '@/components/ui/typography'

export const Route = createFileRoute('/users/_usersLayout/theses/edit/$id')({
  component: EditThesis,
})

function EditThesis() {
  const { id } = Route.useParams()
  const { data: thesis, isLoading } = useThesis(Number(id))
  const { mutate: updateThesis, isPending, isSuccess, isError } = useUpdateThesis()
  const { mutate: uploadDocument, data: uploadedDocument } = useUploadDocument()
  const [t, i18n] = useTranslation('translation')

  const [files, setFiles] = useState<File[] | null>(null)
  const form = useForm<TCreateThesis>({
    resolver: zodResolver(CreateThesisSchema),
  })
  useEffect(() => {
    if (thesis) {
      form.reset({
        ...thesis,
        year: thesis.year
          ? format(new Date(thesis.year), 'yyyy-MM-dd')
          : '',
      })
    }
  }, [thesis])

  useEffect(() => {
    if (uploadedDocument?.id) {
      toast.success(t('file-uploaded'))
      form.setValue('documentId', uploadedDocument.id)
    }
  }, [uploadedDocument])

  const handleUpload = () => {
    if (files?.[0]) {
      uploadDocument({
        file: files[0],
        type: files[0].name.split('.').pop() || 'unknown',
      })
    }
  }

  const onSubmit = (values: TCreateThesis) => {
    updateThesis({
      id: Number(id),
      ...values,
      year: values.year?.trim() === '' ? undefined : values.year,
    });
  }

  useEffect(() => {
    let toastId: string | number | null = null

    if (isPending) {
      toastId = toast.loading(t('update-pending')) // Save toast ID
    }

    if (isSuccess) {
      if (toastId) toast.dismiss(toastId) // Dismiss loading toast
      toast.success(t('update-success'))
      uploadedDocument && form.setValue('documentId', uploadedDocument.id)
    }

    if (isError) {
      if (toastId) toast.dismiss(toastId)
      toast.error(t('update-error'))
    }

    return () => {
      if (toastId) toast.dismiss(toastId) // Cleanup on unmount
    }
  }, [isSuccess, isPending, isError, uploadedDocument])

  if (isLoading) return <Loader />


  return (
    <div className="content-container min-h-screen">
      <TopBar page_name="thesis/edit" />
      <div className="px-10 py-6 flex justify-center">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-8 space-y-6"
        >
          <div>
            <Label>{t('attach-file')}</Label>
            <FilesUploader
              files={files}
              onValueChange={setFiles}
              dropzoneOptions={{ maxFiles: 1, maxSize: 1024 * 1024 * 10 }}
            />
            <Button type="button" variant="secondary" onClick={handleUpload} className="mt-2 w-full">
              {t('upload')}
            </Button>
          </div>

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
                render={({ field }) => {
                  const parsedDate = field.value ? new Date(field.value) : null;
                  const formattedValue = parsedDate
                    ? format(parsedDate, 'yyyy-MM-dd')
                    : '';

                  return (
                    <Input
                      type="date"
                      value={formattedValue}
                      onChange={(e) => {
                        const newDate = new Date(e.target.value);
                        field.onChange(format(newDate, 'yyyy-MM-dd'));
                      }}
                      className='w-fit'
                    />
                  );
                }}
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


          <Button type="submit" className="w-full">
            {t('update')}
          </Button>
        </form>
      </div>
    </div>
  )
}
