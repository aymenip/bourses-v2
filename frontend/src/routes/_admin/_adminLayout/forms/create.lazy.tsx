import { TopBar } from '@/components/global/topBar'
import { createLazyFileRoute } from '@tanstack/react-router'

import { FormBlocksList, FormTitleInput } from '@/components/forms/create-forms';
import { AddFormBlockButton } from '@/components/forms/create-forms/AddFormBlockButton';
import { useFormStore } from '@/store/formStore';

export const Route = createLazyFileRoute('/_admin/_adminLayout/forms/create')({
    component: FormCreate,
})


function FormCreate() {
    // const { data: createdFormBlock, mutate: createFormBlock } = useCreateFormBlock()
    // const [formBlocks, setFormBlocks] = useState<TFullFormBlock[]>();
    // const [FormBlockTitle, setFormBlockTitle] = useState<string>("");


    // form store
    const currentForm = useFormStore((state) => state.currentForm);


    return <div className='content-container'>
        <TopBar page_name='forms/create' />
        <div className='px-2 pt-6 grid grid-cols-8'>
            <div className='grid grid-cols-8 col-span-8 gap-y-8'>
                {/* Form title */}
                <div className='col-span-6 col-start-2 col-end-8'>
                    <FormTitleInput />
                </div>

                {/* Form blocks list */}
                <div className='col-span-6 col-start-2 col-end-8'>
                    <FormBlocksList />
                </div>

                {/* Add blocks button start */}
                {currentForm && (
                    <div className="col-span-6 col-start-2 col-end-8 py-2">
                        <AddFormBlockButton />
                    </div>
                )}
                {/* Add blocks button end */}
            </div>
        </div>
    </div>
} 
