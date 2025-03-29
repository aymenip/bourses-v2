"use client";;
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./column-header";
import { DataTableRowActions } from "./row-actions";
import { Checkbox } from "@/components/ui/checkbox";
import i18n from "@/i18n";
import { TThesis } from "@/types/thesis";
import { Check, X } from "lucide-react";
import { DocumentDownloadButton } from "@/components/document-download-button";

const coOrSup = (isOrNot: boolean) => {
    if (isOrNot) {
        return <Check className="text-green-400 dark:text-green-700" />
    } else return <X className="text-red-400 dark:text-red-700" />
}

export const columns: ColumnDef<TThesis>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                className="translate-y-0.5 "
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label={i18n.t("select-row")}
                className="translate-y-0.5"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "id",
        header: () => (<div className="hidden none" />),
        cell: () => (<div className="hidden none" />),
        enableHiding: true
    },
    {
        accessorKey: "title",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title={i18n.t("title")} />
        ),
        cell: ({ row }) => (
            <div className="w-[300px] capitalize">{row.getValue("title")}</div>
        ),
        enableHiding: false,
    },
    {
        accessorKey: "isSupervisor",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title={i18n.t("isSupervisor")} />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate font-medium capitalize">
                        {coOrSup(row.getValue("isSupervisor"))}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: "isCosupervisor",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title={i18n.t("isCosupervisor")} />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate font-medium capitalize">
                        {coOrSup(!(row.getValue("isSupervisor")))}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: "type",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title={i18n.t("thesis-type")} />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate font-medium capitalize">
                        {row.getValue("type")}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: "documentId",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title={i18n.t("document")} />
        ),
        cell: ({ row }) => <DocumentDownloadButton documentId={row.getValue("documentId")} />,

    },
    {
        id: "actions",
        cell: ({ row }) => <DataTableRowActions row={row} />,
    },
];