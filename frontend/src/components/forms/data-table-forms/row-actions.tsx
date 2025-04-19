"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import { useDeleteForm } from "@/api/mutations";
import { Link } from "@tanstack/react-router";
import { useForms } from "@/api/queries";
import { useEffect } from "react";
import { toast } from "sonner";

interface DataTableRowActionsProps<TData> {
    row: Row<TData>;
}

export function DataTableRowActions<TData>({
    row
}: DataTableRowActionsProps<TData>) {
    // const task = taskSchema.parse(row.original);
    const [t, i18n] = useTranslation("translation")
    const { mutate, isSuccess } = useDeleteForm();
    const { refetch } = useForms({
        enabled: false,
    });
    const deleteForm = () => {
        const id = parseInt(row.getValue("id"));
        mutate(id);
    }
    useEffect(() => {
        if (isSuccess) {
            toast.success(t("deleted-success"));
            refetch();
        }
    }, [isSuccess]);

    return (
        <DropdownMenu dir={i18n.dir()}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                >
                    <DotsHorizontalIcon className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem>
                    <Link className="w-full" to="/forms/edit/$id" params={{ id: row.getValue("id") as string }}>
                        {t("edit")}
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-500" onClick={deleteForm}>
                    {t("delete")}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}