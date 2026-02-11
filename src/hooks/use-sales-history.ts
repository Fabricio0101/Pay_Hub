"use client";

import { useGetSalesHistoryQuery, HistoryGroupBy } from "@/graphql/generated/graphql";

// Re-exportar o enum para facilitar o uso
export { HistoryGroupBy };

/**
 * Hook customizado para buscar histórico de vendas
 * 
 * @param organizationId - ID da organização (obrigatório)
 * @param startDate - Data de início (ISO 8601)
 * @param endDate - Data de fim (ISO 8601)
 * @param groupBy - Agrupamento dos dados (DAY, WEEK, MONTH)
 * @returns Dados e estado da query de histórico de vendas
 */
export const useSalesHistory = (
  organizationId: string,
  startDate: string,
  endDate: string,
  groupBy: HistoryGroupBy = HistoryGroupBy.Day
) => {
  const shouldSkip = !organizationId || !startDate || !endDate;
  
  const { data, loading, error, refetch } = useGetSalesHistoryQuery({
    variables: {
      organizationId,
      startDate,
      endDate,
      groupBy,
    },
    skip: shouldSkip,
    fetchPolicy: "cache-and-network",
  });

  // Se a query está sendo pulada, não está carregando
  // Se não está sendo pulada, usa o loading da query
  const isLoading = shouldSkip ? false : loading;

  return {
    history: data?.salesHistory || [],
    loading: isLoading,
    error,
    refetch,
  };
};
