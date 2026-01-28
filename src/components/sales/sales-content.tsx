"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/sales/data-table";
import { useSales } from "@/hooks/use-sales";
import { useSaleMutations } from "@/hooks/use-sale-mutations";
import { SaleFormValues } from "@/components/sales/table-sales/types";

export const SalesContent = () => {
  const [organizationId, setOrganizationId] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const orgId = localStorage.getItem("organizationId") || undefined;
      setOrganizationId(orgId);
    }
  }, []);

  const { sales, loading, error, refetch } = useSales(organizationId || "");
  const { createSale, deleteSale, loading: mutationsLoading } =
    useSaleMutations();

  const handleAddSale = async (saleData: SaleFormValues) => {
    try {
      // Criar uma venda para cada item
      for (const item of saleData.items) {
        await createSale(saleData.organizationId, {
          clientId: saleData.clientId,
          collaboratorId: saleData.collaboratorId,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
          total: item.subtotal,
          paymentMethod: saleData.paymentMethod,
          paymentStatus: saleData.paymentStatus,
          paymentDate: new Date().toISOString(),
        });
      }
      await refetch();
    } catch (error) {
      console.error("Erro ao criar venda:", error);
    }
  };

  const handleDeleteSale = async (id: string) => {
    try {
      if (!organizationId) return;
      await deleteSale(id, organizationId);
      await refetch();
    } catch (error) {
      console.error("Erro ao remover venda:", error);
    }
  };

  const handleEditSale = (sale: any) => {
    // TODO: Implementar edição quando disponível
    console.log("Edit sale:", sale);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Carregando vendas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-destructive">
          Erro ao carregar vendas: {error.message}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 p-4 lg:p-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Vendas</h1>
        <p className="text-muted-foreground text-sm">
          Registre e acompanhe todas as vendas realizadas.
        </p>
      </div>

      <DataTable
        sales={sales}
        onDeleteSale={handleDeleteSale}
        onEditSale={handleEditSale}
        onAddSale={handleAddSale}
        loading={mutationsLoading}
      />
    </div>
  );
};
