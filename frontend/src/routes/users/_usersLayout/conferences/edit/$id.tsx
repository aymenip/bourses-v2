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

import { useUploadDocument } from '@/api/documents/mutations'
import { Loader } from '@/components/global/loader'
import { useConference } from '@/api/conferences/queries'
import { useUpdateConference } from '@/api/conferences/mutations'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Muted } from '@/components/ui/typography'
import { CreateConferenceSchema, TCreateConference } from '@/types/conferences'

export const Route = createFileRoute('/users/_usersLayout/conferences/edit/$id')({
  component: EditConference,
})

function EditConference() {
  const { id } = Route.useParams()
  const { data: conference, isLoading } = useConference(Number(id))
  const { mutate: updateConference, isPending, isSuccess, isError } = useUpdateConference()
  const { mutate: uploadDocument, data: uploadedDocument } = useUploadDocument()
  const [t, i18n] = useTranslation('translation')

  const [files, setFiles] = useState<File[] | null>(null)
  const form = useForm<TCreateConference>({
    resolver: zodResolver(CreateConferenceSchema),
  })
  useEffect(() => {
    if (conference) {
      form.reset({
        ...conference,
        date: conference.date
          ? format(new Date(conference.date), 'yyyy-MM-dd')
          : '',
      })
    }
  }, [conference])

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

  const onSubmit = (values: TCreateConference) => {
    updateConference({
      id: Number(id),
      ...values,
      date: values.date?.trim() === '' ? undefined : values.date,
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
      <TopBar page_name="conference/edit" />
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
                name="date"
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

              {form.formState.errors.date && (
                <div className="form-error">
                  <CrossCircledIcon />
                  <span className="flex items-center gap-x-1">
                    {t(form.formState.errors.date?.message || "")}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-4 flex-col md:flex-row">
            <div className="form-group flex-1  flex flex-col">
              <Label>{t('conferenceName')}</Label>
              <Input
                {...form.register('conferenceName')}
                placeholder={t('conferenceName')}
                type="text"
              />
              {form.formState.errors.conferenceName && (
                <div className="form-error">
                  <CrossCircledIcon />
                  <span className="flex items-center gap-x-1">
                    {t(form.formState.errors.conferenceName?.message || '')}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="form-group">
            <Label>{t('location')}</Label>
            <Input
              {...form.register('location')}
              placeholder={t('location')}
              type="text"
            />
            {form.formState.errors.location && (
              <div className="form-error">
                <CrossCircledIcon />
                <span className="flex items-center gap-x-1">
                  {t(form.formState.errors.location?.message || '')}
                </span>
              </div>
            )}
          </div>



          <Button type="submit" className="w-full">
            {t('update')}
          </Button>
        </form>
      </div>
    </div>
  )
}
