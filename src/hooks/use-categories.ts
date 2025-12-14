"use client";

import { useGetCategoriesQuery, useGetCategoryQuery } from "@/graphql/generated/graphql";

/**
 * Hook customizado para buscar todas as categorias
 * 
 * @param organizationId - ID da organização (obrigatório)
 * @returns Dados e estado da query de categorias
 */
export const useCategories = (organizationId: string) => {
  const { data, loading, error, refetch } = useGetCategoriesQuery({
    variables: {
      organizationId,
    },
    skip: !organizationId,
  });

  return {
    categories: data?.categories || [],
    loading,
    error,
    refetch,
  };
};

/**
 * Hook customizado para buscar uma categoria específica
 * 
 * @param id - ID da categoria
 * @param organizationId - ID da organização (obrigatório)
 * @returns Dados e estado da query da categoria
 */
export const useCategory = (id: string, organizationId: string) => {
  const { data, loading, error, refetch } = useGetCategoryQuery({
    variables: {
      id,
      organizationId,
    },
    skip: !id || !organizationId,
  });

  return {
    category: data?.category,
    loading,
    error,
    refetch,
  };
};
