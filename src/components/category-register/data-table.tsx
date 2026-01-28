"use client";

import { useState, useMemo } from "react";
import {
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { type DataTableProps } from "./table-categories/types";
import { createColumns } from "./table-categories/columns";
import { TableCategories } from "./table-categories/table";
import { TableHeader } from "./table-categories/header";
import { TablePagination } from "./table-categories/pagination";

export const DataTable = ({
  categories,
  onDeleteCategory,
  onEditCategory,
  onAddCategory,
  loading,
}: DataTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");

  const columns = useMemo(
    () =>
      createColumns({
        onEdit: onEditCategory,
        onDelete: onDeleteCategory,
      }),
    [onEditCategory, onDeleteCategory]
  );

  const table = useReactTable({
    data: categories,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  });

  return (
    <div className="w-full space-y-4">
      <TableHeader
        globalFilter={globalFilter}
        onGlobalFilterChange={setGlobalFilter}
        table={table}
        onAddCategory={onAddCategory}
        loading={loading}
      />

      <TableCategories table={table} columnsCount={columns.length} />

      <TablePagination table={table} />
    </div>
  );
};
