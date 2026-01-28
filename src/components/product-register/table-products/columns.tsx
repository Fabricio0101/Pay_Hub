"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type ProductTableType } from "./types";
import { formatDate, formatPrice } from "./utils";
import { Actions } from "./actions";

interface CreateColumnsOptions {
  onEdit: (product: ProductTableType) => void;
  onDelete: (id: string) => void;
}

export const createColumns = ({
  onEdit,
  onDelete,
}: CreateColumnsOptions): ColumnDef<ProductTableType>[] => [
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
        const product = row.original;
        return <span className="text-sm font-mono">{product.id.slice(0, 8)}</span>;
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
            Produto
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const product = row.original;
        return (
          <div className="flex flex-col">
            <span className="font-medium">{product.name}</span>
            {product.description && (
              <span className="text-sm text-muted-foreground">{product.description}</span>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "productCategory",
      header: "Categoria",
      cell: ({ row }) => {
        const category = row.original.productCategory;
        return (
          <span className="text-sm">
            {category?.name || "-"}
          </span>
        );
      },
    },
    {
      accessorKey: "price",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="h-8 -ml-3 hover:bg-transparent"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Preço
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const price = row.getValue("price") as number;
        return <span className="text-sm font-medium">{formatPrice(price)}</span>;
      },
    },
    {
      accessorKey: "supplier",
      header: "Fornecedor",
      cell: ({ row }) => {
        const supplier = row.original.supplier;
        return (
          <span className="text-sm">
            {supplier?.name || "-"}
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
        const product = row.original;
        return <Actions product={product} onEdit={onEdit} onDelete={onDelete} />;
      },
      enableSorting: false,
      enableHiding: false,
    },
  ];
