// Tipos locais para mockups (não existem no GraphQL schema ainda)
export interface GalleryImage {
  id: string
  name: string
  category: string
  type?: string | null
  side?: string | null
  description?: string | null
  displayOrder?: number | null
  imageUrl?: string | null
  clinicId?: string | null
  createdAt?: string | null
  updatedAt?: string | null
}

export interface UploadGalleryImageInput {
  name: string
  category: string
  type?: string | null
  side?: string | null
  description?: string | null
  displayOrder?: number | null
  clinicId?: string
}

export interface UpdateGalleryImageInput {
  name?: string
  category?: string
  type?: string | null
  side?: string | null
  description?: string | null
  displayOrder?: number | null
}

export interface DataTableProps {
    mockups: GalleryImage[]
    onDeleteMockup: (id: string) => void
    onEditMockup: (mockup: GalleryImage) => void
    onAddMockup?: (file: File, input: Omit<UploadGalleryImageInput, "clinicId">) => void
    loading?: boolean
}
