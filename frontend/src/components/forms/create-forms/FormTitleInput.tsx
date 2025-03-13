import { Input } from '@/components/ui/input';
import { Muted } from '@/components/ui/typography';
import React from 'react';

interface FormTitleInputProps {
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    lastChange?: string;
    t: (key: string) => string;
}

export const FormTitleInput: React.FC<FormTitleInputProps> = ({
    onInputChange,
    lastChange,
    t
}) => {
    return (
        <div>
            <div className='flex justify-end items-center'>
                <span className='w-3 h-3 rounded-full bg-green-500 absolute m-4 animate-pulse' />
                <Input
                    onChange={onInputChange}
                    className='h-20 text-3xl placeholder:text-3xl dark:placeholder:text-zinc-500 rounded-none border-0 border-b-2 dark:border-b-zinc-500 dark:bg-zinc-800/30 bg-zinc-800/5'
                    placeholder={t("type-form-name")}
                />
            </div>
            {lastChange && (
                <Muted>
                    {t("form-title-last-save")} <span className='font-bold'>{lastChange}</span>
                </Muted>
            )}
        </div>
    );
};