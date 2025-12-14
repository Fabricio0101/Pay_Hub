"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type ClientTableType } from "./types";
import { formatDate, formatPhone, generateAvatar } from "./utils";
import { Actions } from "./actions";

interface CreateColumnsOptions {
  onEdit: (client: ClientTableType) => void;
  onDelete: (id: string) => void;
}

export const createColumns = ({
  onEdit,
  onDelete,
}: CreateColumnsOptions): ColumnDef<ClientTableType>[] => [
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
        const client = row.original;
        return <span className="text-sm font-mono">{client.id.slice(0, 8)}</span>;
      },
    },
    {
      accessorKey: "fullName",
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
        const client = row.original;
        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs font-medium">
                {generateAvatar(client.fullName)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium">{client.fullName}</span>
              <span className="text-sm text-muted-foreground">{client.email}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "phone",
      header: "Telefone",
      cell: ({ row }) => {
        const phone = row.getValue("phone") as string;
        return <span className="text-sm">{formatPhone(phone)}</span>;
      },
    },
    {
      accessorKey: "birthDate",
      header: "Data de Nascimento",
      cell: ({ row }) => {
        const birthDate = row.getValue("birthDate") as string | null;
        return <span className="text-sm">{formatDate(birthDate)}</span>;
      },
    },
    {
      accessorKey: "collaborator",
      header: "Colaborador",
      cell: ({ row }) => {
        const collaborator = row.original.collaborator;
        return (
          <span className="text-sm">
            {collaborator?.fullName || "-"}
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
        const client = row.original;
        return <Actions client={client} onEdit={onEdit} onDelete={onDelete} />;
      },
      enableSorting: false,
      enableHiding: false,
    },
  ];
