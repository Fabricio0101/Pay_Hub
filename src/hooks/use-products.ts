"use client";

import { useGetProductsQuery, useGetProductQuery } from "@/graphql/generated/graphql";

/**
 * Hook customizado para buscar todos os produtos
 * 
 * @param organizationId - ID da organização (obrigatório)
 * @returns Dados e estado da query de produtos
 */
export const useProducts = (organizationId: string) => {
  const { data, loading, error, refetch } = useGetProductsQuery({
    variables: {
      organizationId,
    },
    skip: !organizationId,
  });

  return {
    products: data?.products || [],
    loading,
    error,
    refetch,
  };
};

/**
 * Hook customizado para buscar um produto específico
 * 
 * @param id - ID do produto
 * @param organizationId - ID da organização (obrigatório)
 * @returns Dados e estado da query do produto
 */
export const useProduct = (id: string, organizationId: string) => {
  const { data, loading, error, refetch } = useGetProductQuery({
    variables: {
      id,
      organizationId,
    },
    skip: !id || !organizationId,
  });

  return {
    product: data?.product,
    loading,
    error,
    refetch,
  };
};
