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

import { CreateCertificateSchema, TCreateCertificate } from '@/types/certificates'
import { useUploadDocument } from '@/api/documents/mutations'
import { useCertificate } from '@/api/certificates/queries'
import { useUpdateCertificate } from '@/api/mutations'
import { Loader } from '@/components/global/loader'

export const Route = createFileRoute('/users/_usersLayout/certificates/edit/$id')({
  component: EditCertificate,
})

function EditCertificate() {
  const { id } = Route.useParams()
  const { data: certificate, isLoading } = useCertificate(Number(id))
  const { mutate: updateCertificate, isPending, isSuccess, isError } = useUpdateCertificate()
  const { mutate: uploadDocument, data: uploadedDocument } = useUploadDocument()
  const [t, i18n] = useTranslation('translation')

  const [files, setFiles] = useState<File[] | null>(null)
  const form = useForm<TCreateCertificate>({
    resolver: zodResolver(CreateCertificateSchema),
  })

  useEffect(() => {
    if (certificate) {
      form.reset({
        ...certificate,
        expirationDate: certificate.expirationDate
          ? format(new Date(certificate.expirationDate), 'yyyy-MM-dd')
          : undefined,
        issueDate: certificate.issueDate
          ? format(new Date(certificate.issueDate), 'yyyy-MM-dd')
          : undefined,
      })
    }
  }, [certificate])

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

  const onSubmit = (values: TCreateCertificate) => {
    updateCertificate({
      id: Number(id),
      ...values,
      issueDate: values.issueDate?.trim() === '' ? undefined : values.issueDate,
      expirationDate: values.expirationDate?.trim() === '' ? undefined : values.expirationDate,
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
      <TopBar page_name="certificates/edit" />
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

          <div>
            <Label>{t('title')}</Label>
            <Input {...form.register('title')} />
            {form.formState.errors.title && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <CrossCircledIcon /> {t(form.formState.errors.title.message!)}
              </p>
            )}
          </div>

          <div>
            <Label>{t('title')}</Label>
            <Input {...form.register('title')} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>{t('issuer')}</Label>
              <Input {...form.register('issuer')} />
            </div>
            <div>
              <Label>{t('issueDate')}</Label>
              <Controller
                name="issueDate"
                control={form.control}
                render={({ field }) => (
                  <Input
                    type="date"
                    value={field.value}
                    className='w-fit'
                    onChange={(e) =>
                      field.onChange(format(new Date(e.target.value), 'yyyy-MM-dd'))
                    }
                  />
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>{t('certificateId')}</Label>
              <Input {...form.register('certificateId')} />
            </div>
            <div>
              <Label>{t('expirationDate')}</Label>
              <Controller
                name="expirationDate"
                control={form.control}
                render={({ field }) => (
                  <Input
                    type="date"
                    value={field.value}
                    className='w-fit'
                    onChange={(e) =>
                      field.onChange(format(new Date(e.target.value), 'yyyy-MM-dd'))
                    }
                  />
                )}
              />
            </div>
          </div>
          <Button type="submit" className="w-full">
            {t('update')}
          </Button>
        </form>
      </div>
    </div>
  )
}
