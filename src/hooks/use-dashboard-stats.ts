"use client";

import { useGetDashboardStatsQuery } from "@/graphql/generated/graphql";

export type DashboardPeriod = "TODAY" | "WEEK" | "MONTH" | "QUARTER" | "YEAR" | "ALL_TIME";

/**
 * Hook customizado para buscar estatísticas do dashboard
 * 
 * @param organizationId - ID da organização (obrigatório)
 * @param period - Período para as estatísticas (padrão: MONTH)
 * @returns Dados e estado da query de estatísticas do dashboard
 */
export const useDashboardStats = (
  organizationId: string,
  period: DashboardPeriod = "MONTH"
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
