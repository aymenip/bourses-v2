import { TopBar } from '@/components/global/topBar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { H4, Muted } from '@/components/ui/typography';
import { TField, TFormElement } from '@/types/forms';
import { Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCreateForm } from '@/api/mutations';
import debounce from "lodash.debounce";

export const Route = createLazyFileRoute('/_admin/_adminLayout/forms/create')({
    component: FormCreate,
});

function FormCreate() {
    const { mutate } = useCreateForm();
    const [formElements, setFormElements] = useState<TFormElement[]>([]);
    const [title, setTitle] = useState<string>("");
    const [formId, setFormId] = useState<number>();
    const [lastChange, setLastChange] = useState<string | undefined>(undefined);
    const [newFieldName, setNewFieldName] = useState<string>("");
    const [newFieldType, setNewFieldType] = useState<string>("text");
    const [editingElement, setEditingElement] = useState<number | null>(null);
    const [editedTitle, setEditedTitle] = useState<string>("");

    // Placeholder message for the field name input
    const [placeholderMessage, setPlaceholderMessage] = useState<string>("");

    const debouncedMutate = useCallback(
        debounce((title: string, id?: number) => {
            try {
                mutate({ title, id });
                setLastChange(new Date().toLocaleTimeString());
            } catch (error) {
                console.error("Failed to save form:", error);
            }
        }, 10000),
        []
    );

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        if (newTitle) {
            debouncedMutate(newTitle, formId);
        }
    };

    const addNewElement = () => {
        if (!newFieldName.trim()) return;

        const newElement: TFormElement = {
            id: Date.now(),
            title: newFieldName,
            subelements: [{ label: newFieldName, type: newFieldType }]
        };

        setFormElements(prevElements => [...prevElements, newElement]);
        setNewFieldName("");
        setNewFieldType("text");
    };

    const removeElement = (id: number) => {
        setFormElements(prevElements => prevElements.filter(el => el.id !== id));
    };

    const startEditing = (id: number, title: string) => {
        setEditingElement(id);
        setEditedTitle(title);
    };

    const saveEdit = (id: number) => {
        setFormElements(prevElements =>
            prevElements.map(el => el.id === id ? { ...el, title: editedTitle } : el)
        );
        setEditingElement(null);
    };

    const [t] = useTranslation("translation");

    // Update placeholder message dynamically based on field type
    const updatePlaceholderMessage = (type: string) => {
        switch (type) {
            case "text":
                setPlaceholderMessage(t("enter-text-field-name"));
                break;
            case "number":
                setPlaceholderMessage(t("enter-number-field-name"));
                break;
            case "email":
                setPlaceholderMessage(t("enter-email-field-name"));
                break;
            case "date":
                setPlaceholderMessage(t("enter-date-field-name"));
                break;
            default:
                setPlaceholderMessage(t("enter-field-name"));
        }
    };

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedType = e.target.value;
        setNewFieldType(selectedType);
        updatePlaceholderMessage(selectedType);
    };

    return (
        <div className='content-container'>
            <TopBar page_name='forms/create' />
            <div className='px-2 pt-6 grid grid-cols-8'>
                <div className='grid grid-cols-8 col-span-8 gap-y-8'>

                    {/* Title Input */}
                    <div className='col-span-6 col-start-2 col-end-8'>
                        <div className='flex justify-end items-center'>
                            <span className='w-3 h-3 rounded-full bg-green-500 absolute m-4 animate-pulse' />
                            <Input 
                                onChange={onInputChange} 
                                className='h-20 text-3xl placeholder:text-3xl dark:placeholder:text-zinc-500 rounded-none border-0 border-b-2 dark:border-b-zinc-500 dark:bg-zinc-800/30 bg-zinc-800/5' 
                                placeholder={t("type-form-name")} 
                            />
                        </div>
                        {lastChange && <Muted>{t("form-title-last-save")} <span className='font-bold'>{lastChange}</span></Muted>}
                    </div>

                    {/* Form Elements */}
                    <div className='col-span-6 col-start-2 col-end-8'>
                        {formElements.length ? formElements.map((element) => (
                            <div key={element.id} className='relative grid gap-y-2 px-2 py-4 bg-zinc-400/5 dark:bg-zinc-800/10 shadow-sm rounded'>
                                <div className='flex justify-between items-center'>
                                    <div>
                                        {editingElement === element.id ? (
                                            <Input value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
                                        ) : (
                                            <H4>{element.title}</H4>
                                        )}
                                        <Muted>{t("element-title")}</Muted>
                                    </div>
                                    <div className='flex gap-2'>
                                        {editingElement === element.id ? (
                                            <Button variant="link" onClick={() => saveEdit(element.id)}>
                                                💾
                                            </Button>
                                        ) : (
                                            <Button variant="link" onClick={() => startEditing(element.id, element.title)}>
                                                <Pencil2Icon />
                                            </Button>
                                        )}
                                        <Button variant="link" onClick={() => removeElement(element.id)}>
                                            <TrashIcon />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div>
                                <Muted>{t("no-elements-yet")} <span className='font-bold'>{t("add-block")}</span></Muted>
                            </div>
                        )}
                    </div>

                    {/* Add New Element */}
                    <div className='col-span-6 col-start-2 col-end-8 py-2'>
                        <div className='grid grid-cols-3 gap-4'>
                            <Input 
                                value={newFieldName} 
                                onChange={(e) => setNewFieldName(e.target.value)}
                                placeholder={placeholderMessage || t("enter-field-name")} 
                                className='border dark:border-zinc-800/30'
                            />
                            <select 
                                value={newFieldType} 
                                onChange={handleTypeChange} 
                                className='border p-2 rounded dark:border-zinc-800/30 dark:bg-zinc-800 text-black dark:text-white'
                            >
                                <option value="text">{t("text")}</option>
                                <option value="number">{t("number")}</option>
                                <option value="email">{t("email")}</option>
                                <option value="date">{t("date")}</option>
                            </select>
                            <Button onClick={addNewElement} variant="ghost" size="lg" className='border-2 border-dashed rounded-none dark:border-zinc-800/30 dark:hover:bg-foreground/5'>
                                {t("add-new-element")}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}