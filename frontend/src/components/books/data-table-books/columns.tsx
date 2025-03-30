"use client";;
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./column-header";
import { DataTableRowActions } from "./row-actions";
import { Checkbox } from "@/components/ui/checkbox";
import i18n from "@/i18n";
import { DocumentDownloadButton } from "@/components/document-download-button";
import { TBook } from "@/types";



export const columns: ColumnDef<TBook>[] = [
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
        accessorKey: "publisher",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title={i18n.t("publisher")} />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate font-medium capitalize">
                        {row.getValue("publisher")}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: "isbn",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title={i18n.t("isbn")} />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate font-medium capitalize">
                        {row.getValue("isbn")}
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