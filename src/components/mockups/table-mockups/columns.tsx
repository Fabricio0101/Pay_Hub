"use client"

import { type ColumnDef, type Row } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { type GalleryImage } from "./types"
import { formatDate, formatImageName, getCategoryColor, getTypeColor } from "./utils"
import { Actions } from "./actions"

export const exactFilter = (row: Row<GalleryImage>, columnId: string, value: string): boolean => {
    return row.getValue(columnId) === value
}

interface CreateColumnsOptions {
    onEdit: (mockup: GalleryImage) => void
    onDelete: (id: string) => void
    onView?: (mockup: GalleryImage) => void
}

export const createColumns = ({
    onEdit,
    onDelete,
    onView,
}: CreateColumnsOptions): ColumnDef<GalleryImage>[] => [
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
                        aria-label="Select all"
                    />
                </div>
            ),
            cell: ({ row }) => (
                <div className="flex items-center justify-center px-2">
                    <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={(value) => row.toggleSelected(!!value)}
                        aria-label="Select row"
                    />
                </div>
            ),
            enableSorting: false,
            enableHiding: false,
            size: 50,
        },
        {
            accessorKey: "name",
            header: "Nome",
            cell: ({ row }) => {
                const name = row.getValue("name") as string
                return <span className="font-medium">{formatImageName(name)}</span>
            },
        },
        {
            accessorKey: "category",
            header: "Categoria",
            cell: ({ row }) => {
                const category = row.getValue("category") as string
                return (
                    <Badge variant="secondary" className={getCategoryColor(category)}>
                        {category}
                    </Badge>
                )
            },
            filterFn: exactFilter,
        },
        {
            accessorKey: "type",
            header: "Tipo",
            cell: ({ row }) => {
                const type = row.getValue("type") as string
                const typeLabel = type === "upper" ? "Superior" : type === "lower" ? "Inferior" : type
                return (
                    <Badge variant="secondary" className={getTypeColor(type)}>
                        {typeLabel}
                    </Badge>
                )
            },
            filterFn: exactFilter,
        },
        {
            accessorKey: "side",
            header: "Lado",
            cell: ({ row }) => {
                const side = row.getValue("side") as string
                const sideLabel = side === "left" ? "Esquerda" : side === "right" ? "Direita" : side || "-"
                return <span className="text-sm">{sideLabel}</span>
            },
        },
        {
            accessorKey: "displayOrder",
            header: "Ordem",
            cell: ({ row }) => {
                const order = row.getValue("displayOrder") as number
                return <span className="text-sm">{order}</span>
            },
        },
        {
            accessorKey: "createdAt",
            header: "Data de Criação",
            cell: ({ row }) => {
                const date = row.getValue("createdAt") as string
                return <span className="text-sm">{formatDate(date)}</span>
            },
        },
        {
            id: "actions",
            header: "Ações",
            cell: ({ row }) => {
                const mockup = row.original
                return <Actions mockup={mockup} onEdit={onEdit} onDelete={onDelete} onView={onView} />
            },
            enableSorting: false,
            enableHiding: false,
        },
    ]
