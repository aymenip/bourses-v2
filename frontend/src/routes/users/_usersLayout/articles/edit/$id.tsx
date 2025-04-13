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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { CreateArticleSchema, TCreateArticle } from '@/types/articles'
import { useUploadDocument } from '@/api/documents/mutations'
import { useArticle } from '@/api/articles/queries'
import { useUpdateArticle } from '@/api/mutations'
import { Loader } from '@/components/global/loader'

export const Route = createFileRoute('/users/_usersLayout/articles/edit/$id')({
  component: EditArticle,
})

function EditArticle() {
  const { id } = Route.useParams()
  const { data: article, isLoading } = useArticle(Number(id))
  const { mutate: updateArticle, isPending, isSuccess, isError } = useUpdateArticle()
  const { mutate: uploadDocument, data: uploadedDocument } = useUploadDocument()
  const [t, i18n] = useTranslation('translation')

  const [files, setFiles] = useState<File[] | null>(null)
  const form = useForm<TCreateArticle>({
    resolver: zodResolver(CreateArticleSchema),
  })

  useEffect(() => {
    if (article) {
      form.reset({
        ...article,
        publicationDate: article.publicationDate
          ? format(new Date(article.publicationDate), 'yyyy-MM-dd')
          : '',
      })
    }
  }, [article])

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

  const onSubmit = (values: TCreateArticle) => {
    updateArticle({ id: Number(id), ...values, publicationDate: values.publicationDate ? values.publicationDate : "" })
  }

  useEffect(() => {
    if (isPending) toast.loading(t('updating'))
    if (isSuccess) toast.success(t('article-updated'))
    if (isError) toast.error(t('update-failed'))
  }, [isPending, isSuccess, isError])

  if (isLoading) return <Loader />

  return (
    <div className="content-container min-h-screen">
      <TopBar page_name="articles/edit" />
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
            <Label>{t('authors')}</Label>
            <Input {...form.register('authors')} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>{t('journal')}</Label>
              <Input {...form.register('journal')} />
            </div>
            <div>
              <Label>{t('volume')}</Label>
              <Input {...form.register('volume')} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>{t('issue')}</Label>
              <Input {...form.register('issue')} />
            </div>
            <div>
              <Label>{t('pages')}</Label>
              <Input {...form.register('pages')} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>{t('doi')}</Label>
              <Input {...form.register('doi')} />
            </div>
            <div>
              <Label>{t('publicationDate')}</Label>
              <Controller
                name="publicationDate"
                control={form.control}
                render={({ field }) => (
                  <Input
                    type="date"
                    value={field.value}
                    onChange={(e) =>
                      field.onChange(format(new Date(e.target.value), 'yyyy-MM-dd'))
                    }
                  />
                )}
              />
            </div>
          </div>

          <div>
            <Label>{t('classification')}</Label>
            <Controller
              control={form.control}
              name="classification"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange} dir={i18n.dir()}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('select-classification')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">A</SelectItem>
                    <SelectItem value="B">B</SelectItem>
                    <SelectItem value="C">C</SelectItem>
                  </SelectContent>
                </Select>
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
