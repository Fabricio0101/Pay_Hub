import { gql } from '@apollo/client';

/**
 * Query para buscar estatísticas do dashboard
 */
export const GET_DASHBOARD_STATS = gql`
  query GetDashboardStats($organizationId: ID!, $period: DashboardPeriod!) {
    dashboardStats(organizationId: $organizationId, period: $period) {
      revenue {
        total
        currentPeriod
        previousPeriod
        growthPercentage
        growthTrend
      }
      sales {
        total
        currentPeriod
        previousPeriod
        growthPercentage
        growthTrend
      }
      clients {
        total
        currentPeriod
        previousPeriod
        growthPercentage
        growthTrend
      }
      products {
        total
        active
        inactive
      }
    }
  }
`;

/**
 * Query para buscar histórico de vendas
 */
export const GET_SALES_HISTORY = gql`
  query GetSalesHistory(
    $organizationId: ID!
    $startDate: DateTime!
    $endDate: DateTime!
    $groupBy: HistoryGroupBy!
  ) {
    salesHistory(
      organizationId: $organizationId
      startDate: $startDate
      endDate: $endDate
      groupBy: $groupBy
    ) {
      date
      revenue
      salesCount
      clientsCount
    }
  }
`;
