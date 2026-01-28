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
import { type CategoryTableType } from "./types";

interface ActionsProps {
  category: CategoryTableType;
  onEdit: (category: CategoryTableType) => void;
  onDelete: (id: string) => void;
}

export const Actions = ({ category, onEdit, onDelete }: ActionsProps) => {
  const handleEdit = () => {
    onEdit(category);
  };

  const handleDelete = () => {
    onDelete(category.id);
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 cursor-pointer"
        onClick={handleEdit}
        aria-label="Editar categoria"
        tabIndex={0}
      >
        <Pencil className="size-4" />
        <span className="sr-only">Editar categoria</span>
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
            Editar Categoria
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            className="cursor-pointer"
            onClick={handleDelete}
          >
            <Trash2 className="mr-2 size-4" />
            Deletar Categoria
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
