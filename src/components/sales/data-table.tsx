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

import { type DataTableProps } from "./table-sales/types";
import { createColumns } from "./table-sales/columns";
import { TableSales } from "./table-sales/table";
import { TableHeader } from "./table-sales/header";
import { TablePagination } from "./table-sales/pagination";

export const DataTable = ({
  sales,
  onDeleteSale,
  onEditSale,
  onAddSale,
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
        onEdit: onEditSale,
        onDelete: onDeleteSale,
      }),
    [onEditSale, onDeleteSale]
  );

  const table = useReactTable({
    data: sales,
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
        onAddSale={onAddSale}
        loading={loading}
      />

      <TableSales table={table} columnsCount={columns.length} />

      <TablePagination table={table} />
    </div>
  );
};
