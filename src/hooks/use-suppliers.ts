"use client";

import { useGetSuppliersQuery, useGetSupplierQuery } from "@/graphql/generated/graphql";

/**
 * Hook customizado para buscar todos os fornecedores
 * 
 * @param organizationId - ID da organização (obrigatório)
 * @returns Dados e estado da query de fornecedores
 */
export const useSuppliers = (organizationId: string) => {
  const { data, loading, error, refetch } = useGetSuppliersQuery({
    variables: {
      organizationId,
    },
    skip: !organizationId,
  });

  return {
    suppliers: data?.suppliers || [],
    loading,
    error,
    refetch,
  };
};

/**
 * Hook customizado para buscar um fornecedor específico
 * 
 * @param id - ID do fornecedor
 * @param organizationId - ID da organização (obrigatório)
 * @returns Dados e estado da query do fornecedor
 */
export const useSupplier = (id: string, organizationId: string) => {
  const { data, loading, error, refetch } = useGetSupplierQuery({
    variables: {
      id,
      organizationId,
    },
    skip: !id || !organizationId,
  });

  return {
    supplier: data?.supplier,
    loading,
    error,
    refetch,
  };
};
