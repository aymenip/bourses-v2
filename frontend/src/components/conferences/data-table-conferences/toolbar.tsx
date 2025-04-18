"use client";;
import { Cross2Icon, PlusCircledIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./view-options";
import { TrashIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";
import { DataTableFacetedFilter } from "./faceted-filter";

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
}

export function DataTableToolbar<TData>({
    table,
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;
    const [t, _] = useTranslation("translation");
    return (
        <div className="flex flex-wrap items-center justify-between">
            <div className="flex flex-1 flex-wrap items-center gap-2">
                <Input
                    placeholder={t("filter-titles")}
                    value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                    onChange={(event) => {
                        table.getColumn("title")?.setFilterValue(event.target.value);
                    }}
                    className="h-8 w-[150px] lg:w-[250px]"
                />

                <Link to="/users/conferences/create">
                    <Button variant={"link"}>
                        <span className="ltr:pr-2 rtl:pl-2"><PlusCircledIcon /></span>
                        {t("create-new-conferences")}
                    </Button>
                </Link>
                {table.getColumn("classification") && (
                    <DataTableFacetedFilter
                        i18nIsDynamicList
                        column={table.getColumn("classification")}
                        title={t("classification")}
                        options={[
                            {
                                label: t("A"),
                                value: "A",
                            },
                            {
                                label: t("B"),
                                value: "B",
                            },
                            {
                                label: t("C"),
                                value: "C",
                            },
                        ]}
                    />
                )}
                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => table.resetColumnFilters()}
                        className="h-8 px-2 lg:px-3"
                    >
                        {t("reset")}
                        <Cross2Icon className="ml-2 h-4 w-4" />
                    </Button>
                )}
                {/* <CalendarDatePicker
                    date={dateRange}
                    onDateSelect={handleDateSelect}
                    className="h-9 w-[250px]"
                    variant="outline"
                /> */}

            </div>

            <div className="flex items-center gap-2">
                {table.getFilteredSelectedRowModel().rows.length > 0 ? (
                    <Button variant="outline" size="sm">
                        <TrashIcon className="mr-2 size-4" aria-hidden="true" />
                        {t('delete')} ({table.getFilteredSelectedRowModel().rows.length})
                    </Button>
                ) : null}
                <DataTableViewOptions table={table} />
            </div>
        </div>
    );
}