import { type ProductCategory } from "@/graphql/generated/graphql";

export interface CategoryTableType extends ProductCategory {}

export interface CategoryFormValues {
  name: string;
  description?: string;
  organizationId: string;
}

export interface DataTableProps {
  categories: CategoryTableType[];
  onDeleteCategory: (id: string) => void;
  onEditCategory: (category: CategoryTableType) => void;
  onAddCategory: (categoryData: CategoryFormValues) => void;
  loading?: boolean;
}
