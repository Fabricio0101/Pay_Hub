"use client";

import { useGetSalesQuery, useGetSaleQuery } from "@/graphql/generated/graphql";

/**
 * Hook customizado para buscar todas as vendas
 * 
 * @param organizationId - ID da organização (obrigatório)
 * @returns Dados e estado da query de vendas
 */
export const useSales = (organizationId: string) => {
  const { data, loading, error, refetch } = useGetSalesQuery({
    variables: {
      organizationId,
    },
    skip: !organizationId,
  });

  return {
    sales: data?.sales || [],
    loading,
    error,
    refetch,
  };
};

/**
 * Hook customizado para buscar uma venda específica
 * 
 * @param id - ID da venda
 * @param organizationId - ID da organização (obrigatório)
 * @returns Dados e estado da query da venda
 */
export const useSale = (id: string, organizationId: string) => {
  const { data, loading, error, refetch } = useGetSaleQuery({
    variables: {
      id,
      organizationId,
    },
    skip: !id || !organizationId,
  });

  return {
    sale: data?.sale,
    loading,
    error,
    refetch,
  };
};
