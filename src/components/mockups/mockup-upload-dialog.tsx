"use client"

import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Upload, X } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@/lib/utils"
import { type UploadGalleryImageInput } from "@/components/mockups/table-mockups/types"

const mockupFormSchema = z.object({
    name: z.string().min(1, {
        message: "Nome é obrigatório.",
    }),
    category: z.string().min(1, {
        message: "Categoria é obrigatória.",
    }),
    type: z.string().optional(),
    side: z.string().optional(),
    description: z.string().optional(),
    displayOrder: z.string().optional(),
})

type MockupFormValues = z.infer<typeof mockupFormSchema>

interface MockupUploadDialogProps {
    onUpload: (file: File, input: Omit<UploadGalleryImageInput, "clinicId">) => void
    loading?: boolean
    open?: boolean
    onOpenChange?: (open: boolean) => void
}

export const MockupUploadDialog = ({
    onUpload,
    loading,
    open: externalOpen,
    onOpenChange: externalOnOpenChange,
}: MockupUploadDialogProps) => {
    const [internalOpen, setInternalOpen] = useState(false)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const open = externalOpen !== undefined ? externalOpen : internalOpen
    const onOpenChange = externalOnOpenChange || setInternalOpen

    const form = useForm<MockupFormValues>({
        resolver: zodResolver(mockupFormSchema),
        defaultValues: {
            name: "",
            category: "b1",
            type: "",
            side: "",
            description: "",
            displayOrder: "",
        },
    })

    const handleFileSelect = useCallback((file: File) => {
        if (file && file.type.startsWith("image/")) {
            setSelectedFile(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }, [])

    const handleDrop = useCallback(
        (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault()
            const file = e.dataTransfer.files[0]
            if (file) {
                handleFileSelect(file)
            }
        },
        [handleFileSelect]
    )

    const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
    }, [])

    const handleFileInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0]
            if (file) {
                handleFileSelect(file)
            }
        },
        [handleFileSelect]
    )

    const handleRemoveFile = useCallback(() => {
        setSelectedFile(null)
        setPreview(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }, [])

    const handleSubmit = (data: MockupFormValues) => {
        if (!selectedFile) {
            form.setError("root", {
                message: "Por favor, selecione uma imagem.",
            })
            return
        }

        const input: Omit<UploadGalleryImageInput, "clinicId"> = {
            name: data.name,
            category: data.category,
            type: data.type || undefined,
            side: data.side || undefined,
            description: data.description || undefined,
            displayOrder: data.displayOrder ? Number(data.displayOrder) : undefined,
        }

        onUpload(selectedFile, input)
        form.reset()
        handleRemoveFile()
        onOpenChange?.(false)
    }

    const handleOpenChange = (isOpen: boolean) => {
        if (!isOpen) {
            form.reset()
            handleRemoveFile()
        }
        onOpenChange?.(isOpen)
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button variant="default" className="cursor-pointer" disabled={loading}>
                    <Upload className="mr-2 size-4" />
                    Adicionar Mockup
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Adicionar novos Mockups</DialogTitle>
                    <DialogDescription>
                        Faça upload de uma imagem para a galeria de mockups. Preencha os campos e selecione a imagem.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                        {/* Dropzone */}
                        <div className="space-y-2">
                            <FormLabel className="text-sm font-medium">Imagem</FormLabel>
                            {!selectedFile ? (
                                <div
                                    onDrop={handleDrop}
                                    onDragOver={handleDragOver}
                                    className={cn(
                                        "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer",
                                        "hover:border-primary transition-colors",
                                        "flex flex-col items-center justify-center gap-3"
                                    )}
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <Upload className="h-10 w-10 text-muted-foreground" />
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium">
                                            Clique para fazer upload ou arraste e solte
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            PNG, JPG, GIF até 10MB
                                        </p>
                                    </div>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileInputChange}
                                        className="hidden"
                                    />
                                </div>
                            ) : (
                                <div className="relative inline-block">
                                    <div className="relative w-48 h-48 rounded-lg overflow-hidden border-2 border-border">
                                        <img
                                            src={preview || ""}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                        />
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            className="absolute top-2 right-2 h-8 w-8"
                                            onClick={handleRemoveFile}
                                            aria-label="Remover imagem"
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="space-y-1.5">
                                    <FormLabel className="text-sm font-medium">Nome *</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Digite o nome do mockup"
                                            className="h-10"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-3 gap-4">
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem className="space-y-1.5">
                                        <FormLabel className="text-sm font-medium">Categoria *</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value || "b1"}>
                                            <FormControl>
                                                <SelectTrigger className="cursor-pointer h-10 w-full">
                                                    <SelectValue placeholder="Selecionar categoria" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="b1">B1</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem className="space-y-1.5">
                                        <FormLabel className="text-sm font-medium">Tipo</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="cursor-pointer h-10 w-full">
                                                    <SelectValue placeholder="Selecionar tipo" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="upper">Superior</SelectItem>
                                                <SelectItem value="lower">Inferior</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="side"
                                render={({ field }) => (
                                    <FormItem className="space-y-1.5">
                                        <FormLabel className="text-sm font-medium">Lado</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="cursor-pointer h-10 w-full">
                                                    <SelectValue placeholder="Selecionar lado" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="left">Esquerda</SelectItem>
                                                <SelectItem value="right">Direita</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="displayOrder"
                                render={({ field }) => (
                                    <FormItem className="space-y-1.5">
                                        <FormLabel className="text-sm font-medium">Ordem de Exibição</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Ex: 1, 2, 3"
                                                className="h-10"
                                                {...field}
                                                value={field.value || ""}
                                                onChange={(e) => field.onChange(e.target.value)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem className="space-y-1.5">
                                    <FormLabel className="text-sm font-medium">Descrição</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Digite uma descrição (opcional)"
                                            className="resize-none min-h-[100px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {form.formState.errors.root && (
                            <p className="text-sm font-medium text-destructive">
                                {form.formState.errors.root.message}
                            </p>
                        )}

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => handleOpenChange(false)}
                                disabled={loading}
                            >
                                Cancelar
                            </Button>
                            <Button type="submit" className="cursor-pointer" disabled={loading}>
                                {loading ? "Enviando..." : "Upload Mockup"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
