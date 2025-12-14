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

import { type DataTableProps } from "./table-clients/types";
import { createColumns } from "./table-clients/columns";
import { TableClients } from "./table-clients/table";
import { TableHeader } from "./table-clients/header";
import { TablePagination } from "./table-clients/pagination";

export const DataTable = ({
  clients,
  onDeleteClient,
  onEditClient,
  onAddClient,
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
        onEdit: onEditClient,
        onDelete: onDeleteClient,
      }),
    [onEditClient, onDeleteClient]
  );

  const table = useReactTable({
    data: clients,
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
        onAddClient={onAddClient}
        loading={loading}
      />

      <TableClients table={table} columnsCount={columns.length} />

      <TablePagination table={table} />
    </div>
  );
};
