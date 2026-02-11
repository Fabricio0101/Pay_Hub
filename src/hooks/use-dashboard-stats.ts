"use client";

import { useGetDashboardStatsQuery, DashboardPeriod } from "@/graphql/generated/graphql";

// Re-exportar o enum para facilitar o uso
export { DashboardPeriod };

/**
 * Hook customizado para buscar estatísticas do dashboard
 * 
 * @param organizationId - ID da organização (obrigatório)
 * @param period - Período para as estatísticas (padrão: MONTH)
 * @returns Dados e estado da query de estatísticas do dashboard
 */
export const useDashboardStats = (
  organizationId: string,
  period: DashboardPeriod = DashboardPeriod.Month
) => {
  const { data, loading, error, refetch } = useGetDashboardStatsQuery({
    variables: {
      organizationId,
      period,
    },
    skip: !organizationId,
    fetchPolicy: "cache-and-network",
  });

  return {
    stats: data?.dashboardStats,
    loading,
    error,
    refetch,
  };
};
