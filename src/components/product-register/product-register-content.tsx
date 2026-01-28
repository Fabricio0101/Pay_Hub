"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/product-register/data-table";
import { useProducts } from "@/hooks/use-products";
import { useProductMutations } from "@/hooks/use-product-mutations";
import { ProductFormValues } from "@/components/product-register/table-products/types";

export const ProductRegisterContent = () => {
  const [organizationId, setOrganizationId] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const orgId = localStorage.getItem("organizationId") || undefined;
      setOrganizationId(orgId);
    }
  }, []);

  const { products, loading, error, refetch } = useProducts(organizationId || "");
  const { createProduct, deleteProduct, loading: mutationsLoading } =
    useProductMutations();

  const handleAddProduct = async (productData: ProductFormValues) => {
    try {
      await createProduct(productData.organizationId, {
        name: productData.name,
        description: productData.description || undefined,
        price: parseFloat(productData.price),
        productCategoryId: productData.productCategoryId,
        supplierId: productData.supplierId || undefined,
      });
      await refetch();
    } catch (error) {
      console.error("Erro ao criar produto:", error);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      if (!organizationId) return;
      await deleteProduct(id, organizationId);
      await refetch();
    } catch (error) {
      console.error("Erro ao remover produto:", error);
    }
  };

  const handleEditProduct = (product: any) => {
    // TODO: Implementar edição quando disponível
    console.log("Edit product:", product);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Carregando produtos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-destructive">
          Erro ao carregar produtos: {error.message}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 p-4 lg:p-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Produtos</h1>
        <p className="text-muted-foreground text-sm">
          Gerencie os produtos comercializados no seu negócio.
        </p>
      </div>

      <DataTable
        products={products}
        onDeleteProduct={handleDeleteProduct}
        onEditProduct={handleEditProduct}
        onAddProduct={handleAddProduct}
        loading={mutationsLoading}
      />
    </div>
  );
};
