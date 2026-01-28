"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/category-register/data-table";
import { useCategories } from "@/hooks/use-categories";
import { useCategoryMutations } from "@/hooks/use-category-mutations";
import { CategoryFormValues } from "@/components/category-register/table-categories/types";

export const CategoryRegisterContent = () => {
  const [organizationId, setOrganizationId] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const orgId = localStorage.getItem("organizationId") || undefined;
      setOrganizationId(orgId);
    }
  }, [])

  const { categories, loading, error, refetch } = useCategories(organizationId || "");
  const { createCategory, deleteCategory, loading: mutationsLoading } =
    useCategoryMutations();

  const handleAddCategory = async (categoryData: CategoryFormValues) => {
    try {
      await createCategory(categoryData.organizationId, {
        name: categoryData.name,
        description: categoryData.description || undefined,
      });
      await refetch();
    } catch (error) {
      console.error("Erro ao criar categoria:", error);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      if (!organizationId) return;
      await deleteCategory(id, organizationId);
      await refetch();
    } catch (error) {
      console.error("Erro ao remover categoria:", error);
    }
  };

  const handleEditCategory = (category: any) => {
    // TODO: Implementar edição quando disponível
    console.log("Edit category:", category);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Carregando categorias...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-destructive">
          Erro ao carregar categorias: {error.message}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 p-4 lg:p-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Categorias</h1>
        <p className="text-muted-foreground text-sm">
          Gerencie as categorias de produtos do seu negócio.
        </p>
      </div>

      <DataTable
        categories={categories}
        onDeleteCategory={handleDeleteCategory}
        onEditCategory={handleEditCategory}
        onAddCategory={handleAddCategory}
        loading={mutationsLoading}
      />
    </div>
  );
};
