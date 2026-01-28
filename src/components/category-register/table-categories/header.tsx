"use client";

import { Search, Plus, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CategoryFormDialog } from "../category-form-dialog";
import { type DataTableProps } from "./types";

interface HeaderProps {
  globalFilter: string;
  onGlobalFilterChange: (value: string) => void;
  table: any;
  onAddCategory: DataTableProps["onAddCategory"];
  loading?: boolean;
}

export const TableHeader = ({
  globalFilter,
  onGlobalFilterChange,
  table,
  onAddCategory,
  loading,
}: HeaderProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Filtrar categorias..."
              value={globalFilter ?? ""}
              onChange={(event) => onGlobalFilterChange(String(event.target.value))}
              className="pl-9"
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="cursor-pointer">
                <Plus className="mr-2 size-4" />
                Status
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column: any) => column.getCanHide())
                .map((column: any) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="sm" className="cursor-pointer">
            <Plus className="mr-2 size-4" />
            Prioridade
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="cursor-pointer">
                <ChevronDown className="mr-2 size-4" />
                View
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column: any) => column.getCanHide())
                .map((column: any) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <CategoryFormDialog onAddCategory={onAddCategory} loading={loading} />
        </div>
      </div>
    </div>
  );
};
