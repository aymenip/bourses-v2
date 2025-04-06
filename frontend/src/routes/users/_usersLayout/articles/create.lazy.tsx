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
import { CreateArticleSchema, TCreateArticle } from '@/types/articles'
import { useCreateArticle } from '@/api/mutations'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export const Route = createLazyFileRoute('/users/_usersLayout/articles/create')(
  {
    component: CreateArticle,
  },
)

function CreateArticle() {
  const form = useForm<TCreateArticle>({
    resolver: zodResolver(CreateArticleSchema),
    defaultValues: {
      documentId: 0, // Ensure it's null initially
      title: '',
      authors: '',
      journal: '',
      classification: 'C',
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
    mutate: createArticle,
    isSuccess: isArticleCreationSuccess,
    isError: isArticleCreationError,
    isPending: isArticleCreationPending,
  } = useCreateArticle()

  function onSubmit(values: TCreateArticle) {
    if (!values.documentId) {
      toast.error(t('please-upload-document'))
      return
    }
    try {
      createArticle(values)
    } catch (error) {
      console.error('Form submission error', error)
      toast.error('Failed to submit the form. Please try again.')
    }
  }

  useEffect(() => {
    let toastId: string | number | null = null

    if (isArticleCreationPending) {
      toastId = toast.loading(t('article-creation-pending')) // Save toast ID
    }

    if (isArticleCreationSuccess) {
      if (toastId) toast.dismiss(toastId) // Dismiss loading toast
      toast.success(t('article-creation-success'))
    }

    if (isArticleCreationError) {
      if (toastId) toast.dismiss(toastId)
      toast.error(t('article-creation-error'))
    }

    return () => {
      if (toastId) toast.dismiss(toastId) // Cleanup on unmount
    }
  }, [
    isArticleCreationSuccess,
    isArticleCreationPending,
    isArticleCreationError,
  ])

  return (
    <div className="content-container">
      <TopBar page_name="articles/create" />
      <div className="px-10 p-6 flex justify-center gap-x-2 ">
        <form
          id="form-add-article"
          className="form flex-1 py-6 px-4 border max-w-[1200px]"
          onSubmit={form.handleSubmit(onSubmit)}
        >
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
                <Label>{t('authors')}</Label>
                <Input
                  {...form.register('authors')}
                  placeholder={t('authors')}
                  type="text"
                />
                {form.formState.errors.authors && (
                  <div className="form-error">
                    <CrossCircledIcon />
                    <span className="flex items-center gap-x-1">
                      {t(form.formState.errors.authors?.message || '')}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex gap-4">
                <div className="form-group flex-1  flex flex-col">
                  <Label>{t('journal')}</Label>
                  <Input
                    {...form.register('journal')}
                    placeholder={t('journal')}
                    type="text"
                  />
                  {form.formState.errors.journal && (
                    <div className="form-error">
                      <CrossCircledIcon />
                      <span className="flex items-center gap-x-1">
                        {t(form.formState.errors.journal?.message || '')}
                      </span>
                    </div>
                  )}
                </div>
                <div className="form-group flex-1  flex flex-col">
                  <Label>{t('volume')}</Label>
                  <Input
                    {...form.register('volume')}
                    placeholder={t('volume')}
                    type="text"
                  />
                  {form.formState.errors.volume && (
                    <div className="form-error">
                      <CrossCircledIcon />
                      <span className="flex items-center gap-x-1">
                        {t(form.formState.errors.volume?.message || '')}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <Label>{t('classification')}</Label>
                <Controller
                  control={form.control}
                  name="classification"
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      dir={i18n.dir()}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t('select-classification')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A">{t('A')}</SelectItem>
                        <SelectItem value="B">{t('B')}</SelectItem>
                        <SelectItem value="C">{t('C')}</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="form-group flex-1  flex flex-col">
                <Label>{t('issue')}</Label>
                <Input
                  {...form.register('issue')}
                  placeholder={t('issue')}
                  type="text"
                />
                {form.formState.errors.issue && (
                  <div className="form-error">
                    <CrossCircledIcon />
                    <span className="flex items-center gap-x-1">
                      {t(form.formState.errors.issue?.message || '')}
                    </span>
                  </div>
                )}
              </div>
              <div className="form-group flex-1  flex flex-col">
                <Label>{t('pages')}</Label>
                <Input
                  {...form.register('pages')}
                  placeholder={t('pages')}
                  type="text"
                />
                {form.formState.errors.journal && (
                  <div className="form-error">
                    <CrossCircledIcon />
                    <span className="flex items-center gap-x-1">
                      {t(form.formState.errors.pages?.message || '')}
                    </span>
                  </div>
                )}
              </div>
              <div className='flex gap-4'>
                <div className="form-group flex-1 flex flex-col">
                  <Label>{t('doi')}</Label>
                  <Input
                    {...form.register('doi')}
                    placeholder={t('doi')}
                    type="text"
                  />
                  {form.formState.errors.doi && (
                    <div className="form-error">
                      <CrossCircledIcon />
                      <span className="flex items-center gap-x-1">
                        {t(form.formState.errors.doi?.message || '')}
                      </span>
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <Label>{t('publicationDate')}</Label>
                  <Controller
                    control={form.control}
                    name="publicationDate"

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
                  {form.formState.errors.publicationDate && (
                    <div className="form-error">
                      <CrossCircledIcon />
                      <span className="flex items-center gap-x-1">
                        {t(form.formState.errors.publicationDate?.message || '')}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <Button
                type="submit"
                disabled={!documentId}
                form="form-add-article"
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
