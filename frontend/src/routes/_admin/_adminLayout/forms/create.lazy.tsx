import { TopBar } from '@/components/global/topBar'
import { TFullFormBlock } from '@/types/forms';
import { createLazyFileRoute } from '@tanstack/react-router'
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next'
import { useCreateForm } from '@/api/mutations';
import debounce from "lodash.debounce";
import { useCreateFormBlock } from '@/api/forms/mutations';

import { FormTitleInput, FormBlocksList } from '@/components/forms/create-forms';
import { AddFormBlockButton } from '@/components/forms/create-forms/AddFormBlockButton';

export const Route = createLazyFileRoute('/_admin/_adminLayout/forms/create')({
    component: FormCreate,
})


function FormCreate() {
    const { data: createdForm, mutate: createForm } = useCreateForm();
    const { data: createdFormBlock, mutate: createFormBlock } = useCreateFormBlock()
    const [formBlocks, setFormBlocks] = useState<TFullFormBlock[]>();
    const [title, setTitle] = useState<string>("");
    const [FormBlockTitle, setFormBlockTitle] = useState<string>("");
    const [formId, setFormId] = useState<number>();
    const [lastChange, setLastChange] = useState<string | undefined>(undefined);



    // Update formId when createdForm changes
    useEffect(() => {
        if (createdForm?.id && !formId) {
            setFormId(createdForm.id);
        }
    }, [createdForm, formId]);

    const debouncedCreateForm = useCallback(
        debounce((title: string, id?: number) => {
            createForm({ title, id });
            setLastChange(new Date().toLocaleTimeString());

        }, 10000),
        [createForm] // Only depend on createForm function
    );

    const handleTitleChange = (newTitle: string) => {
        setTitle(newTitle);
        if (newTitle) {
            debouncedCreateForm(newTitle, formId);
        }
    };



    useEffect(() => {
        if (createdFormBlock?.id && createdFormBlock?.id != -1) {
            setFormBlocks((prev) => [...(prev || []), createdFormBlock]);
            // Reset createdFormBlock after adding it
            createdFormBlock.id = -1; // Assuming you have this setter available
        }
    }, [createdFormBlock]);
    const addFormBlock = () => {
        createFormBlock({ formId: formId!, label: FormBlockTitle });
    }



    const [t, i18n] = useTranslation("translation")
    return <div className='content-container'>
        <TopBar page_name='forms/create' />
        <div className='px-2 pt-6 grid grid-cols-8'>
            <div className='grid grid-cols-8 col-span-8 gap-y-8'>
                {/* Form title */}
                <div className='col-span-6 col-start-2 col-end-8'>
                    <FormTitleInput
                        onInputChange={(e) => handleTitleChange(e.target.value)}
                        lastChange={lastChange}
                        t={t}
                    />
                </div>

                {/* Form blocks list */}
                <div className='col-span-6 col-start-2 col-end-8'>
                    <FormBlocksList
                        formBlocks={formBlocks}
                        title={title}
                        setFormBlockTitle={setFormBlockTitle}
                        addFormBlock={addFormBlock}
                    />
                </div>

                {/* Add blocks button start */}
                {createdForm && title && (
                    <div className="col-span-6 col-start-2 col-end-8 py-2">
                        <AddFormBlockButton
                            title={title}
                            setFormBlockTitle={setFormBlockTitle}
                            addFormBlock={addFormBlock}
                        />
                    </div>
                )}
                {/* Add blocks button end */}
            </div>
        </div>
    </div>
} 
