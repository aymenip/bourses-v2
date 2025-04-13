import { TopBar } from '@/components/global/topBar'
import { FormAcess, FormBlocksList, FormTitleInput } from '@/components/forms/create-forms';
import { AddFormBlockButton } from '@/components/forms/create-forms/AddFormBlockButton';
import { useFormStore } from '@/store/formStore';
import { useForm } from '@/api/queries';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';

export const Route = createFileRoute('/_admin/_adminLayout/forms/edit/$id')({
  component: EditForm,
})

function EditForm() {
  const { id } = Route.useParams();
  const { data: formData, isSuccess } = useForm(Number(id)); 
  const setCurrentForm = useFormStore((state) => state.setCurrentForm);
  const currentForm = useFormStore((state) => state.currentForm);

  useEffect(() => {
    if (formData && isSuccess) {
      setCurrentForm(formData);
    }
  }, [formData, isSuccess, setCurrentForm]);

  return (
    <div className='content-container'>
      <TopBar page_name='forms/edit' />
      <div className='px-2 pt-6 md:grid grid-cols-8 gap-x-2'>
        <div className='grid md:col-span-6 gap-y-8'>
          {/* Form title */}
          <div className='md:col-span-7 col-start-1'>
            <FormTitleInput />
          </div>
          {currentForm && (
            <>
              {/* Form blocks list */}
              <div className='md:col-span-7 col-start-1'>
                <FormBlocksList />
              </div>

              {/* Add blocks button */}
              <div className="md:col-span-7 col-start-1 py-2">
                <AddFormBlockButton />
              </div>
            </>
          )}
        </div>

        {/* Form access */}
        {currentForm && (
          <div className='md:col-span-2 col-start-7'>
            <FormAcess />
          </div>
        )}
      </div>
    </div>
  );
}
