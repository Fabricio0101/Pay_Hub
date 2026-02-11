"use client"

import { useState, useMemo } from "react"
import {
    type ColumnFiltersState,
    type SortingState,
    type VisibilityState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ChevronDown, Download, Search, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { type DataTableProps } from "./table-mockups/types"
import { createColumns } from "./table-mockups/columns"
import { TableMockups } from "./table-mockups/table"
import { ActionsTable } from "./table-mockups/actions-table"
import { MockupUploadDialog } from "./mockup-upload-dialog"

export const DataTable = ({
    mockups,
    onDeleteMockup,
    onEditMockup,
    onAddMockup,
    loading,
}: DataTableProps) => {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})
    const [globalFilter, setGlobalFilter] = useState("")

    const columns = useMemo(
        () =>
            createColumns({
                onEdit: onEditMockup,
                onDelete: onDeleteMockup,
            }),
        [onEditMockup, onDeleteMockup]
    )

    const table = useReactTable({
        data: mockups,
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
    })

    const categoryFilter = table.getColumn("category")?.getFilterValue() as string
    const typeFilter = table.getColumn("type")?.getFilterValue() as string

    // Obter categorias únicas dos mockups
    const uniqueCategories = useMemo(() => {
        const categories = new Set(mockups.map((m) => m.category))
        return Array.from(categories)
    }, [mockups])

    // Obter tipos únicos dos mockups
    const uniqueTypes = useMemo(() => {
        const types = new Set(mockups.map((m) => m.type).filter((t): t is string => t != null))
        return Array.from(types)
    }, [mockups])

    return (
        <div className="w-full space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-1 items-center space-x-2">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Buscar mockups..."
                            value={globalFilter ?? ""}
                            onChange={(event) => setGlobalFilter(String(event.target.value))}
                            className="pl-9"
                        />
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <Button variant="outline" className="cursor-pointer">
                        <Download className="mr-2 size-4" />
                        Exportar
                    </Button>
                    {onAddMockup && <MockupUploadDialog onUpload={onAddMockup} loading={loading} />}
                </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-3 sm:gap-4">
                <div className="space-y-2">
                    <Label htmlFor="category-filter" className="text-sm font-medium">
                        Categoria
                    </Label>
                    <Select
                        value={categoryFilter || ""}
                        onValueChange={(value) =>
                            table.getColumn("category")?.setFilterValue(value === "all" ? "" : value)
                        }
                    >
                        <SelectTrigger className="cursor-pointer w-full" id="category-filter">
                            <SelectValue placeholder="Selecionar Categoria" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todas as Categorias</SelectItem>
                            {uniqueCategories.map((category) => (
                                <SelectItem key={category} value={category}>
                                    {category}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="type-filter" className="text-sm font-medium">
                        Tipo
                    </Label>
                    <Select
                        value={typeFilter || ""}
                        onValueChange={(value) =>
                            table.getColumn("type")?.setFilterValue(value === "all" ? "" : value)
                        }
                    >
                        <SelectTrigger className="cursor-pointer w-full" id="type-filter">
                            <SelectValue placeholder="Selecionar Tipo" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todos os Tipos</SelectItem>
                            {uniqueTypes.map((type) => {
                                const typeLabel = type === "upper" ? "Superior" : type === "lower" ? "Inferior" : type
                                return (
                                    <SelectItem key={type} value={type}>
                                        {typeLabel}
                                    </SelectItem>
                                )
                            })}
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="column-visibility" className="text-sm font-medium">
                        Column Visibility
                    </Label>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild id="column-visibility">
                            <Button variant="outline" className="cursor-pointer w-full">
                                Columns <ChevronDown className="ml-2 size-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
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
                                    )
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <TableMockups table={table} columnsCount={columns.length} />

            <ActionsTable table={table} />
        </div>
    )
}
