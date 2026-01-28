"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type CategoryTableType } from "./types";
import { formatDate } from "./utils";
import { Actions } from "./actions";

interface CreateColumnsOptions {
  onEdit: (category: CategoryTableType) => void;
  onDelete: (id: string) => void;
}

export const createColumns = ({
  onEdit,
  onDelete,
}: CreateColumnsOptions): ColumnDef<CategoryTableType>[] => [
    {
      id: "select",
      header: ({ table }) => (
        <div className="flex items-center justify-center px-2">
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Selecionar todos"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-center px-2">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Selecionar linha"
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
      size: 50,
    },
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => {
        const category = row.original;
        return <span className="text-sm font-mono">{category.id.slice(0, 8)}</span>;
      },
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="h-8 -ml-3 hover:bg-transparent"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nome
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const category = row.original;
        return (
          <div className="flex flex-col">
            <span className="font-medium">{category.name}</span>
            {category.description && (
              <span className="text-sm text-muted-foreground">{category.description}</span>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "products",
      header: "Produtos",
      cell: ({ row }) => {
        const products = row.original.products;
        return (
          <span className="text-sm">
            {products?.length || 0} produto(s)
          </span>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Data de Criação",
      cell: ({ row }) => {
        const date = row.getValue("createdAt") as string;
        return <span className="text-sm">{formatDate(date)}</span>;
      },
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => {
        const category = row.original;
        return <Actions category={category} onEdit={onEdit} onDelete={onDelete} />;
      },
      enableSorting: false,
      enableHiding: false,
    },
  ];
