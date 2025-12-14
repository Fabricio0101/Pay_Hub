"use client"

import { Eye, Pencil, Trash2, EllipsisVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { type GalleryImage } from "./types"

interface ActionsProps {
    mockup: GalleryImage
    onEdit: (mockup: GalleryImage) => void
    onDelete: (id: string) => void
    onView?: (mockup: GalleryImage) => void
}

export const Actions = ({ mockup, onEdit, onDelete, onView }: ActionsProps) => {
    const handleView = () => {
        if (onView) {
            onView(mockup)
        }
    }

    const handleEdit = () => {
        onEdit(mockup)
    }

    const handleDelete = () => {
        onDelete(mockup.id)
    }

    return (
        <div className="flex items-center gap-2">
            {onView && (
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 cursor-pointer"
                    onClick={handleView}
                    aria-label="Ver mockup"
                >
                    <Eye className="size-4" />
                    <span className="sr-only">Ver mockup</span>
                </Button>
            )}
            <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 cursor-pointer"
                onClick={handleEdit}
                aria-label="Editar mockup"
            >
                <Pencil className="size-4" />
                <span className="sr-only">Editar mockup</span>
            </Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer" aria-label="Mais ações">
                        <EllipsisVertical className="size-4" />
                        <span className="sr-only">Mais ações</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem className="cursor-pointer" onClick={handleView}>
                        Ver Detalhes
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={handleEdit}>
                        Editar Mockup
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        variant="destructive"
                        className="cursor-pointer"
                        onClick={handleDelete}
                    >
                        <Trash2 className="mr-2 size-4" />
                        Deletar Mockup
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
