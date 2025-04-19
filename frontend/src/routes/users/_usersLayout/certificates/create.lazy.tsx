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
import { CreateCertificateSchema, TCreateCertificate } from '@/types/certificates'
import { useCreateCertificate } from '@/api/mutations'
import Note from '@/components/Note'

export const Route = createLazyFileRoute(
  '/users/_usersLayout/certificates/create',
)({
  component: CreateCertificate,
})

function CreateCertificate() {
  const form = useForm<TCreateCertificate>({
    resolver: zodResolver(CreateCertificateSchema),
    defaultValues: {
      issueDate: format(new Date(), 'yyyy-MM-dd'),
      documentId: 0, // Ensure it's null initially
      title: '',
      issuer: '',
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
    mutate: createCertificate,
    isSuccess: isCertificateCreationSuccess,
    isError: isCertificateCreationError,
    isPending: isCertificateCreationPending,
  } = useCreateCertificate()

  function onSubmit(values: TCreateCertificate) {
    if (!values.documentId) {
      toast.error(t('please-upload-document'))
      return
    }
    try {
      createCertificate({
        ...values,
        issueDate: format(new Date(values.issueDate), 'yyyy-MM-dd'),
        expirationDate: values.expirationDate ? format(new Date(values.expirationDate!), 'yyyy-MM-dd') : undefined,
      })
    } catch (error) {
      console.error('Form submission error', error)
      toast.error('Failed to submit the form. Please try again.')
    }
  }

  useEffect(() => {
    let toastId: string | number | null = null

    if (isCertificateCreationPending) {
      toastId = toast.loading(t('certificate-creation-pending')) // Save toast ID
    }

    if (isCertificateCreationSuccess) {
      if (toastId) toast.dismiss(toastId) // Dismiss loading toast
      toast.success(t('certificate-creation-success'))
    }

    if (isCertificateCreationError) {
      if (toastId) toast.dismiss(toastId)
      toast.error(t('certificate-creation-error'))
    }

    return () => {
      if (toastId) toast.dismiss(toastId) // Cleanup on unmount
    }
  }, [isCertificateCreationSuccess, isCertificateCreationPending, isCertificateCreationError])

  return (
    <div className="content-container">
      <TopBar page_name="certificates/create" />
      <div className="px-10 p-6 flex justify-center gap-x-2 ">
        <form
          id="form-addcertificate"
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
              <div className="form-group flex-1  flex flex-col">
                <Label>{t('title')}</Label>
                <Input
                  required
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
              <div className="flex gap-4">
                <div className="form-group flex-1  flex flex-col">
                  <Label>{t('issuer')}</Label>
                  <Input
                    {...form.register('issuer')}
                    placeholder={t('issuer')}
                    type="text"
                  />
                  {form.formState.errors.issuer && (
                    <div className="form-error">
                      <CrossCircledIcon />
                      <span className="flex items-center gap-x-1">
                        {t(form.formState.errors.issuer?.message || '')}
                      </span>
                    </div>
                  )}
                </div>

                <div className="form-group col-span-3  flex flex-col">
                  <Label>{t('issueDate')}</Label>
                  <Controller
                    control={form.control}
                    name="issueDate"
                    render={({ field }) => (
                      <Input
                        type="date"
                        value={format(new Date(field.value), 'yyyy-MM-dd')}
                        onChange={(e) =>
                          field.onChange(format(new Date(e.target.value), 'yyyy-MM-dd'))
                        }
                        className="w-fit"
                      />
                    )}
                  />
                  {form.formState.errors.issueDate && (
                    <div className="form-error">
                      <CrossCircledIcon />
                      <span className="flex items-center gap-x-1">
                        {t(form.formState.errors.title?.message || '')}
                      </span>
                    </div>
                  )}
                </div>
              </div>


              <div className="flex gap-4">
                <div className="form-group flex-1  flex flex-col">
                  <Label>{t('certificateId')}</Label>
                  <Input
                    {...form.register('certificateId')}
                    placeholder={t('certificateId')}
                    type="text"
                  />
                  {form.formState.errors.certificateId && (
                    <div className="form-error">
                      <CrossCircledIcon />
                      <span className="flex items-center gap-x-1">
                        {t(form.formState.errors.certificateId?.message || '')}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <Label>{t('expirationDate')}</Label>
                <Controller
                  control={form.control}
                  name="expirationDate"

                  render={({ field }) => (
                    <Input

                      type="date"
                      onChange={(e) =>
                        field.onChange(format(new Date(e.target.value), 'yyyy-MM-dd'))
                      }
                      className="w-fit"
                    />
                  )}
                />
                {form.formState.errors.expirationDate && (
                  <div className="form-error">
                    <CrossCircledIcon />
                    <span className="flex items-center gap-x-1">
                      {t(form.formState.errors.expirationDate?.message || '')}
                    </span>
                  </div>
                )}
              </div>
              <Button type="submit" disabled={!documentId} form="form-addcertificate">
                {t('add')}
              </Button>
            </>
          )}
        </form>
      </div>
    </div>
  )
}
