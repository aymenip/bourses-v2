"use client";;
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./column-header";
import { DataTableRowActions } from "./row-actions";
import { Checkbox } from "@/components/ui/checkbox";
import i18n from "@/i18n";
import { DocumentDownloadButton } from "@/components/document-download-button";
import { Badge } from "@/components/ui/badge";
import { TConference } from "@/types/conferences";



export const columns: ColumnDef<TConference>[] = [
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
        accessorKey: "conferenceName",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title={i18n.t("authors")} />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate font-medium capitalize">
                        {row.getValue("conferenceName")}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: "location",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title={i18n.t("location")} />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate font-medium capitalize">
                        {(row.getValue("location") as string).split("T")[0]}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: "date",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title={i18n.t("date")} />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate font-medium capitalize">
                        {(row.getValue("date") as string).split("T")[0]}
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