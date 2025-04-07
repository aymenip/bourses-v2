import { useState } from "react";
import {
    FileUploader,
    FileUploaderContent,
    FileUploaderItem,
    FileInput,
} from "./ui/file-upload";
import { Paperclip } from "lucide-react";
import { useTranslation } from "react-i18next";

const FileSvgDraw = () => {
    const { t } = useTranslation();
    return (
        <>
            <svg
                className="w-8 h-8 mb-3 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
            >
                <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
            </svg>
            <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span>
                &nbsp; or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF
            </p>
        </>
    );
};
interface FilesUploaderProps {
    onValueChange: (files: File[] | null) => void;
    files: File[] | null;
    dropzoneOptions: {
        multiple?: boolean;
        maxFiles?: number;
        maxSize?: number;
    }
}

const FilesUploader = (filesUploaderProps: FilesUploaderProps) => {
    return (
        <FileUploader
            value={filesUploaderProps.files}
            onValueChange={filesUploaderProps.onValueChange}
            dropzoneOptions={filesUploaderProps.dropzoneOptions}
            className="relative bg-background border border-dashed overflow-hidden rounded-md mb-2"
        >
            <FileInput className="outline outline-1 outline-slate-200 dark:outline-zinc-800 p-2 shadow-sm rounded-sm hover:outline-slate-300 dark:hover:outline-zinc-700 transition-all duration-200 ease-in-out">
                <div className="flex items-center justify-center flex-col pt-3 pb-4 w-full ">
                    <FileSvgDraw />
                </div>
            </FileInput>
            <FileUploaderContent>
                {filesUploaderProps.files &&
                    filesUploaderProps.files.length > 0 &&
                    filesUploaderProps.files.map((file, i) => (
                        <FileUploaderItem key={i} index={i}>
                            <Paperclip className="h-4 w-4 stroke-current" />
                            <span>{file.name}</span>
                        </FileUploaderItem>
                    ))}
            </FileUploaderContent>
        </FileUploader>
    );
};

export default FilesUploader;