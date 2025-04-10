import { TopBar } from '@/components/global/topBar'
import { createLazyFileRoute } from '@tanstack/react-router'

import { FormAcess, FormBlocksList, FormTitleInput } from '@/components/forms/create-forms';
import { AddFormBlockButton } from '@/components/forms/create-forms/AddFormBlockButton';
import { useFormStore } from '@/store/formStore';

export const Route = createLazyFileRoute('/_admin/_adminLayout/forms/create')({
    component: FormCreate,
})


function FormCreate() {


    // form store
    const currentForm = useFormStore((state) => state.currentForm);

    return <div className='content-container'>
        <TopBar page_name='forms/create' />
        <div className='px-2 pt-6 md:grid grid-cols-8 gap-x-2 '>
            <div className='grid md:col-span-6 gap-y-8 '>
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

                        {/* Add blocks button start */}
                        <div className="md:col-span-7 col-start-1 py-2">
                            <AddFormBlockButton />
                        </div>

                    </>
                )}
                {/* Add blocks button end */}
            </div>
            {currentForm && (<div className='md:col-span-2 col-start-7'>
                <FormAcess />
            </div>)}

        </div>
    </div>
} 
