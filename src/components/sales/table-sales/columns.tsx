"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type SaleTableType } from "./types";
import { formatDate, formatPrice, formatPaymentMethod, formatPaymentStatus } from "./utils";
import { Actions } from "./actions";

interface CreateColumnsOptions {
  onEdit: (sale: SaleTableType) => void;
  onDelete: (id: string) => void;
}

export const createColumns = ({
  onEdit,
  onDelete,
}: CreateColumnsOptions): ColumnDef<SaleTableType>[] => [
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
        const sale = row.original;
        return <span className="text-sm font-mono">{sale.id.slice(0, 8)}</span>;
      },
    },
    {
      accessorKey: "client",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="h-8 -ml-3 hover:bg-transparent"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Cliente
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const client = row.original.client;
        return (
          <div className="flex flex-col">
            <span className="font-medium">{client.fullName}</span>
            <span className="text-sm text-muted-foreground">{client.email}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "product",
      header: "Produto",
      cell: ({ row }) => {
        const product = row.original.product;
        return (
          <div className="flex flex-col">
            <span className="font-medium">{product.name}</span>
            <span className="text-sm text-muted-foreground">
              Qtd: {row.original.quantity}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "total",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="h-8 -ml-3 hover:bg-transparent"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Total
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const total = row.getValue("total") as number;
        return <span className="text-sm font-medium">{formatPrice(total)}</span>;
      },
    },
    {
      accessorKey: "paymentMethod",
      header: "Método de Pagamento",
      cell: ({ row }) => {
        const method = row.getValue("paymentMethod") as string;
        return <span className="text-sm">{formatPaymentMethod(method)}</span>;
      },
    },
    {
      accessorKey: "paymentStatus",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("paymentStatus") as string;
        const statusColors: Record<string, string> = {
          PENDING: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-500",
          PAID: "bg-green-500/10 text-green-600 dark:text-green-500",
          CANCELLED: "bg-red-500/10 text-red-600 dark:text-red-500",
          REFUNDED: "bg-blue-500/10 text-blue-600 dark:text-blue-500",
        };
        return (
          <Badge className={statusColors[status] || ""}>
            {formatPaymentStatus(status)}
          </Badge>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Data da Venda",
      cell: ({ row }) => {
        const date = row.getValue("createdAt") as string;
        return <span className="text-sm">{formatDate(date)}</span>;
      },
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => {
        const sale = row.original;
        return <Actions sale={sale} onEdit={onEdit} onDelete={onDelete} />;
      },
      enableSorting: false,
      enableHiding: false,
    },
  ];
