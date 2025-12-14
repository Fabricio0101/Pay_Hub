import { type GalleryImage, type UploadGalleryImageInput, type UpdateGalleryImageInput } from "@/graphql/generated/graphql"

export type { GalleryImage, UploadGalleryImageInput, UpdateGalleryImageInput }

export interface DataTableProps {
    mockups: GalleryImage[]
    onDeleteMockup: (id: string) => void
    onEditMockup: (mockup: GalleryImage) => void
    onAddMockup?: (file: File, input: Omit<UploadGalleryImageInput, "clinicId">) => void
    loading?: boolean
}
