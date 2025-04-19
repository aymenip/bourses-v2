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
import { CreateBookSchema, TCreateBook } from '@/types/book'
import { useCreateBook } from '@/api/books/mutations'
import Note from '@/components/Note'

export const Route = createLazyFileRoute('/users/_usersLayout/books/create')({
  component: CreateBook,
})

function CreateBook() {
  const form = useForm<TCreateBook>({
    resolver: zodResolver(CreateBookSchema),
    defaultValues: {
      documentId: 0, // Ensure it's null initially
      title: '',
      author: '',
      isbn: '',
      publisher: ''
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
    mutate: createBook,
    isSuccess: isBookCreationSuccess,
    isError: isBookCreationError,
    isPending: isBookCreationPending,
  } = useCreateBook()

  function onSubmit(values: TCreateBook) {
    if (!values.documentId) {
      toast.error(t('please-upload-document'))
      return
    }
    try {
      createBook({
        ...values,
        year: format(new Date(values.year), 'yyyy-MM-dd'),
      })
    } catch (error) {
      console.error('Form submission error', error)
      toast.error('Failed to submit the form. Please try again.')
    }
  }

  useEffect(() => {
    let toastId: string | number | null = null

    if (isBookCreationPending) {
      toastId = toast.loading(t('book-creation-pending')) // Save toast ID
    }

    if (isBookCreationSuccess) {
      if (toastId) toast.dismiss(toastId) // Dismiss loading toast
      toast.success(t('book-creation-success'))
    }

    if (isBookCreationError) {
      if (toastId) toast.dismiss(toastId)
      toast.error(t('book-creation-error'))
    }

    return () => {
      if (toastId) toast.dismiss(toastId) // Cleanup on unmount
    }
  }, [isBookCreationSuccess, isBookCreationPending, isBookCreationError])

  return (
    <div className="content-container">
      <TopBar page_name="books/create" />
      <div className="px-10 p-6 flex justify-center gap-x-2 ">
        <form
          id="form-addbook"
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
              <div className="flex gap-4">
                <div className="form-group flex-1  flex flex-col">
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

                <div className="form-group col-span-3  flex flex-col">
                  <Label>{t('year')}</Label>
                  <Controller
                    control={form.control}
                    name="year"
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
                  {form.formState.errors.year && (
                    <div className="form-error">
                      <CrossCircledIcon />
                      <span className="flex items-center gap-x-1">
                        {t(form.formState.errors.year?.message || '')}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group flex-1  flex flex-col">
                <Label>{t('author')}</Label>
                <Input
                  {...form.register('author')}
                  placeholder={t('author')}
                  type="text"
                />
                {form.formState.errors.author && (
                  <div className="form-error">
                    <CrossCircledIcon />
                    <span className="flex items-center gap-x-1">
                      {t(form.formState.errors.author?.message || '')}
                    </span>
                  </div>
                )}
              </div>

              <div className="form-group flex-1  flex flex-col">
                <Label>{t('isbn')}</Label>
                <Input
                  {...form.register('isbn')}
                  placeholder={t('isbn')}
                  type="text"
                />
                {form.formState.errors.isbn && (
                  <div className="form-error">
                    <CrossCircledIcon />
                    <span className="flex items-center gap-x-1">
                      {t(form.formState.errors.isbn?.message || '')}
                    </span>
                  </div>
                )}
              </div>

              <div className="form-group flex-1  flex flex-col">
                <Label>{t('publisher')}</Label>
                <Input
                  {...form.register('publisher')}
                  placeholder={t('publisher')}
                  type="text"
                />
                {form.formState.errors.publisher && (
                  <div className="form-error">
                    <CrossCircledIcon />
                    <span className="flex items-center gap-x-1">
                      {t(form.formState.errors.publisher?.message || '')}
                    </span>
                  </div>
                )}
              </div>

              <Button
                type="submit"
                disabled={!documentId}
                form="form-addbook"
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
