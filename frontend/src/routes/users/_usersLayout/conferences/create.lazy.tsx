import { useUploadDocument } from '@/api/documents/mutations'
import FilesUploader from '@/components/file-uploader'
import { TopBar } from '@/components/global/topBar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '@radix-ui/react-dropdown-menu'
import { CrossCircledIcon } from '@radix-ui/react-icons'
import { createLazyFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { format } from 'date-fns'
import {
  CreateConferenceSchema,
  TCreateConference
} from '@/types/conferences'
import { useCreateConference } from '@/api/mutations'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CircleAlert } from 'lucide-react'
import Note from '@/components/Note'

export const Route = createLazyFileRoute(
  '/users/_usersLayout/conferences/create',
)({
  component: CreateConference,
})

function CreateConference() {
  const form = useForm<TCreateConference>({
    resolver: zodResolver(CreateConferenceSchema),
    defaultValues: {
      documentId: 0, // Ensure it's null initially
      title: '',
      classification: "C",
      conferenceName: "",
      date: format(new Date(), 'yyyy-MM-dd'),
      location: "",
    },
  })

  const {
    mutate: uploadDocument,
    data: uploadedDocument,
    isSuccess: isUploadSuccess,
    isPending: isUploadPending,
    isError: isUploadError,
  } = useUploadDocument()

  const [files, setFiles] = useState<File[] | null>(null)
  const [documentId, setDocumentId] = useState<number | null>(null)
  const [t, i18n] = useTranslation('translation')

  const dropZoneConfig = {
    maxFiles: 1,
    maxSize: 1024 * 1024 * 10, // 10MB
    multiple: false,
  }

  function onUpload() {
    if (files && files.length > 0) {
      uploadDocument({
        file: files[0],
        type: files[0].name.split('.').pop() || 'unknown',
      })
    }
  }

  useEffect(() => {
    let toastId: string | number | null = null

    if (isUploadPending) {
      toastId = toast.loading(t('file-upload-pending')) // Save toast ID
    }

    if (isUploadSuccess && uploadedDocument) {
      if (toastId) toast.dismiss(toastId) // Dismiss loading toast
      toast.success(t('file-uploaded'))
      setDocumentId(uploadedDocument.id)
      form.setValue('documentId', uploadedDocument.id)
    }

    if (isUploadError) {
      if (toastId) toast.dismiss(toastId)
      toast.error(t('file-upload-error'))
    }

    return () => {
      if (toastId) toast.dismiss(toastId) // Cleanup on unmount
    }
  }, [isUploadSuccess, isUploadPending, isUploadError, uploadedDocument])

  const {
    mutate: createConference,
    isSuccess: isConferenceCreationSuccess,
    isError: isConferenceCreationError,
    isPending: isConferenceCreationPending,
  } = useCreateConference()

  function onSubmit(values: TCreateConference) {
    if (!values.documentId) {
      toast.error(t('please-upload-document'))
      return
    }
    try {

      createConference({
        ...values,
        date: format(new Date(values.date || 0), 'yyyy-MM-dd'),
      })
    } catch (error) {
      console.error('Form submission error', error)
      toast.error('Failed to submit the form. Please try again.')
    }
  }

  useEffect(() => {
    let toastId: string | number | null = null

    if (isConferenceCreationPending) {
      toastId = toast.loading(t('conference-creation-pending')) // Save toast ID
    }

    if (isConferenceCreationSuccess) {
      if (toastId) toast.dismiss(toastId) // Dismiss loading toast
      toast.success(t('conference-creation-success'))
    }

    if (isConferenceCreationError) {
      if (toastId) toast.dismiss(toastId)
      toast.error(t('conference-creation-error'))
    }

    return () => {
      if (toastId) toast.dismiss(toastId) // Cleanup on unmount
    }
  }, [
    isConferenceCreationSuccess,
    isConferenceCreationPending,
    isConferenceCreationError,
  ])

  return (
    <div className="content-container">
      <TopBar page_name="conferences/create" />
      <div className="px-10 p-6 flex justify-center gap-x-2 ">
        <form
          id="form-add-conference"
          className="form flex-1 py-6 px-4 border max-w-[1200px]"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Note />
          <div className="form-group">
            <Label>{t('attach-file')}</Label>
            <FilesUploader
              files={files}
              onValueChange={setFiles}
              dropzoneOptions={dropZoneConfig}
            />
            {files && files.length > 0 && (
              <Button
                type="button"
                form={undefined}
                onClick={onUpload}
                variant={'secondary'}
                disabled={isUploadPending}
              >
                {isUploadPending ? t('uploading...') : t('upload')}
              </Button>
            )}
          </div>

          {documentId && (
            <>
              <div className="form-group">
                <Label>{t('title')}</Label>
                <Input
                  {...form.register('title')}
                  placeholder={t('title')}
                  type="text"
                />
                {form.formState.errors.title && (
                  <div className="form-error">
                    <CrossCircledIcon />
                    <span className="flex items-center gap-x-1">
                      {t(form.formState.errors.title?.message || '')}
                    </span>
                  </div>
                )}
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

                <div className="form-group flex flex-col ">
                  <Label>{t('date')}</Label>
                  <Controller
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <Input
                        type="date"
                        value={format(new Date(field.value || 0), 'yyyy-MM-dd')}
                        onChange={(e) =>
                          field.onChange(
                            format(new Date(e.target.value), 'yyyy-MM-dd'),
                          )
                        }
                        className="w-full md:w-fit"
                      />
                    )}
                  />
                  {form.formState.errors.date && (
                    <div className="form-error">
                      <CrossCircledIcon />
                      <span className="flex items-center gap-x-1">
                        {t(form.formState.errors.title?.message || '')}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <Button
                type="submit"
                disabled={!documentId}
                form="form-add-conference"
              >
                {t('add')}
              </Button>
            </>
          )}
        </form>
      </div>
    </div>
  )
}
