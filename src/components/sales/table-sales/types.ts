import { type Sale } from "@/graphql/generated/graphql";

export interface SaleTableType extends Sale {}

export interface SaleItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface SaleFormValues {
  clientId: string;
  collaboratorId: string;
  items: SaleItem[];
  paymentMethod: string;
  paymentStatus: string;
  organizationId: string;
}

export interface DataTableProps {
  sales: SaleTableType[];
  onDeleteSale: (id: string) => void;
  onEditSale: (sale: SaleTableType) => void;
  onAddSale: (saleData: SaleFormValues) => void;
  loading?: boolean;
}
