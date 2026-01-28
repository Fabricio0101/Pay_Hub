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

import { type DataTableProps } from "./table-products/types";
import { createColumns } from "./table-products/columns";
import { TableProducts } from "./table-products/table";
import { TableHeader } from "./table-products/header";
import { TablePagination } from "./table-products/pagination";

export const DataTable = ({
  products,
  onDeleteProduct,
  onEditProduct,
  onAddProduct,
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
        onEdit: onEditProduct,
        onDelete: onDeleteProduct,
      }),
    [onEditProduct, onDeleteProduct]
  );

  const table = useReactTable({
    data: products,
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
        onAddProduct={onAddProduct}
        loading={loading}
      />

      <TableProducts table={table} columnsCount={columns.length} />

      <TablePagination table={table} />
    </div>
  );
};
