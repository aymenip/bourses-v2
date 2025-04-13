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

import { CreateBookSchema, TCreateBook } from '@/types/book'
import { useUploadDocument } from '@/api/documents/mutations'
import { useBook } from '@/api/books/queries'
import { useUpdateBook } from '@/api/mutations'
import { Loader } from '@/components/global/loader'

export const Route = createFileRoute('/users/_usersLayout/books/edit/$id')({
  component: EditBook,
})

function EditBook() {
  const { id } = Route.useParams()
  const { data: book, isLoading } = useBook(Number(id))
  const { mutate: updateBook, isPending, isSuccess, isError } = useUpdateBook()
  const { mutate: uploadDocument, data: uploadedDocument } = useUploadDocument()
  const [t, i18n] = useTranslation('translation')

  const [files, setFiles] = useState<File[] | null>(null)
  const form = useForm<TCreateBook>({
    resolver: zodResolver(CreateBookSchema),
  })

  useEffect(() => {
    if (book) {
      form.reset({
        ...book,
        year: book.year
          ? format(new Date(book.year), 'yyyy-MM-dd')
          : '',
      })
    }
  }, [book])

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

  const onSubmit = (values: TCreateBook) => {
    updateBook({
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
      <TopBar page_name="books/edit" />
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
            <Label>{t('author')}</Label>
            <Input {...form.register('author')} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>{t('publisher')}</Label>
              <Input {...form.register('publisher')} />
            </div>
            <div>
              <Label>{t('isbn')}</Label>
              <Input {...form.register('isbn')} />
            </div>
          </div>


          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>{t('year')}</Label>
              <Input {...form.register('year')} />
            </div>
            <div>
              <Label>{t('year')}</Label>
              <Controller
                name="year"
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

          <Button type="submit" className="w-full">
            {t('update')}
          </Button>
        </form>
      </div>
    </div>
  )
}
