import { type Product } from "@/graphql/generated/graphql";

export interface ProductTableType extends Product {}

export interface ProductFormValues {
  name: string;
  description?: string;
  price: string;
  productCategoryId: string;
  supplierId?: string;
  organizationId: string;
}

export interface DataTableProps {
  products: ProductTableType[];
  onDeleteProduct: (id: string) => void;
  onEditProduct: (product: ProductTableType) => void;
  onAddProduct: (productData: ProductFormValues) => void;
  loading?: boolean;
}
