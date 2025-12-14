"use client";

import { Pencil, Trash2, EllipsisVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type ClientTableType } from "./types";

interface ActionsProps {
  client: ClientTableType;
  onEdit: (client: ClientTableType) => void;
  onDelete: (id: string) => void;
}

export const Actions = ({ client, onEdit, onDelete }: ActionsProps) => {
  const handleEdit = () => {
    onEdit(client);
  };

  const handleDelete = () => {
    onDelete(client.id);
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 cursor-pointer"
        onClick={handleEdit}
        aria-label="Editar cliente"
        tabIndex={0}
      >
        <Pencil className="size-4" />
        <span className="sr-only">Editar cliente</span>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 cursor-pointer"
            aria-label="Mais ações"
            tabIndex={0}
          >
            <EllipsisVertical className="size-4" />
            <span className="sr-only">Mais ações</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="cursor-pointer" onClick={handleEdit}>
            Editar Cliente
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            className="cursor-pointer"
            onClick={handleDelete}
          >
            <Trash2 className="mr-2 size-4" />
            Deletar Cliente
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
