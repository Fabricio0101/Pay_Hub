# Requisitos de Backend para Dashboard PayHub

## Visão Geral

Este documento descreve as **queries GraphQL e tipos de dados** que precisam ser implementados no backend para popular o dashboard do PayHub com dados reais. Atualmente, o dashboard utiliza dados mockados e precisa ser integrado com o backend GraphQL existente.

---

## 1. Query Principal: Estatísticas do Dashboard

### 1.1 Query `GetDashboardStats`

**Objetivo:** Retornar todas as métricas principais do dashboard em uma única query para otimizar performance.

**Query GraphQL:**

```graphql
query GetDashboardStats($organizationId: ID!, $period: DashboardPeriod) {
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
```

**Input Types:**

```graphql
enum DashboardPeriod {
  TODAY
  WEEK
  MONTH
  QUARTER
  YEAR
  ALL_TIME
}
```

**Output Type:**

```graphql
type DashboardStats {
  revenue: RevenueStats
  sales: SalesStats
  clients: ClientStats
  products: ProductStats
}

type RevenueStats {
  total: Float!
  currentPeriod: Float!
  previousPeriod: Float!
  growthPercentage: Float!
  growthTrend: GrowthTrend!
}

type SalesStats {
  total: Int!
  currentPeriod: Int!
  previousPeriod: Int!
  growthPercentage: Float!
  growthTrend: GrowthTrend!
}

type ClientStats {
  total: Int!
  currentPeriod: Int!
  previousPeriod: Int!
  growthPercentage: Float!
  growthTrend: GrowthTrend!
}

type ProductStats {
  total: Int!
  active: Int!
  inactive: Int!
}

enum GrowthTrend {
  UP
  DOWN
  STABLE
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "dashboardStats": {
      "revenue": {
        "total": 125000.50,
        "currentPeriod": 15000.00,
        "previousPeriod": 13500.00,
        "growthPercentage": 11.11,
        "growthTrend": "UP"
      },
      "sales": {
        "total": 1234,
        "currentPeriod": 150,
        "previousPeriod": 135,
        "growthPercentage": 11.11,
        "growthTrend": "UP"
      },
      "clients": {
        "total": 456,
        "currentPeriod": 25,
        "previousPeriod": 30,
        "growthPercentage": -16.67,
        "growthTrend": "DOWN"
      },
      "products": {
        "total": 89,
        "active": 75,
        "inactive": 14
      }
    }
  }
}
```

---

## 2. Query de Dados Históricos para Gráficos

### 2.1 Query `GetSalesHistory`

**Objetivo:** Retornar dados agregados de vendas por período para popular gráficos de área/linha.

**Query GraphQL:**

```graphql
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
```

**Input Types:**

```graphql
enum HistoryGroupBy {
  DAY
  WEEK
  MONTH
}
```

**Output Type:**

```graphql
type SalesHistoryData {
  date: DateTime!
  revenue: Float!
  salesCount: Int!
  clientsCount: Int!
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "salesHistory": [
      {
        "date": "2024-01-01T00:00:00Z",
        "revenue": 1250.00,
        "salesCount": 15,
        "clientsCount": 12
      },
      {
        "date": "2024-01-02T00:00:00Z",
        "revenue": 1890.50,
        "salesCount": 22,
        "clientsCount": 18
      }
    ]
  }
}
```

**Observações:**
- `startDate` e `endDate` definem o período a ser consultado
- `groupBy` determina a granularidade dos dados (dia, semana ou mês)
- Os dados devem ser ordenados por `date` em ordem crescente
- Períodos sem vendas devem retornar valores zerados (não omitir)

---

## 3. Especificações Técnicas

### 3.1 Cálculo de Períodos

**Período Atual vs. Período Anterior:**

- **TODAY**: Hoje vs. Ontem
- **WEEK**: Esta semana (segunda a domingo) vs. Semana passada
- **MONTH**: Este mês vs. Mês passado
- **QUARTER**: Este trimestre vs. Trimestre passado
- **YEAR**: Este ano vs. Ano passado
- **ALL_TIME**: Todos os dados vs. Período equivalente anterior (ex: últimos 30 dias vs. 30 dias anteriores)

### 3.2 Cálculo de Crescimento

**Fórmula:**
```
growthPercentage = ((currentPeriod - previousPeriod) / previousPeriod) * 100
```

**Growth Trend:**
- `UP`: growthPercentage > 0
- `DOWN`: growthPercentage < 0
- `STABLE`: growthPercentage = 0 ou |growthPercentage| < 0.01

### 3.3 Filtros de Vendas

**Importante:** 
- Considerar apenas vendas com `paymentStatus = "PAID"` para cálculos de receita
- Contar todas as vendas (independente do status) para contagem de vendas
- Usar `createdAt` para determinar o período da venda
- Usar `paymentDate` quando disponível para cálculos de receita

### 3.4 Filtros de Clientes

- Contar todos os clientes da organização
- Para "novos clientes do período", usar `createdAt`
- Não considerar clientes removidos/desativados

### 3.5 Filtros de Produtos

- `total`: Todos os produtos da organização
- `active`: Produtos ativos (considerar lógica de negócio específica)
- `inactive`: Produtos inativos

---

## 4. Performance e Otimizações

### 4.1 Cache

**Recomendação:** Implementar cache para queries de dashboard:
- Cache de 5 minutos para estatísticas gerais
- Cache de 1 minuto para dados históricos recentes
- Invalidar cache quando novas vendas/clientes/produtos forem criados

### 4.2 Índices de Banco de Dados

**Índices necessários:**
- `sales(organizationId, createdAt)`
- `sales(organizationId, paymentStatus, paymentDate)`
- `clients(organizationId, createdAt)`
- `products(organizationId, status)`

### 4.3 Agregações no Banco

**Recomendação:** Usar funções de agregação do banco de dados (SUM, COUNT, AVG) ao invés de buscar todos os registros e calcular no código.

**Exemplo SQL (conceitual):**
```sql
SELECT 
  SUM(total) as total_revenue,
  COUNT(*) as total_sales
FROM sales
WHERE organizationId = ? 
  AND paymentStatus = 'PAID'
  AND createdAt >= ? 
  AND createdAt <= ?
```

---

## 5. Integração com Frontend

### 5.1 Hook Customizado Esperado

O frontend espera um hook similar a:

```typescript
// src/hooks/use-dashboard-stats.ts
export const useDashboardStats = (
  organizationId: string,
  period: DashboardPeriod = 'MONTH'
) => {
  const { data, loading, error, refetch } = useGetDashboardStatsQuery({
    variables: { organizationId, period },
    skip: !organizationId,
  });

  return {
    stats: data?.dashboardStats,
    loading,
    error,
    refetch,
  };
};
```

### 5.2 Hook para Histórico

```typescript
// src/hooks/use-sales-history.ts
export const useSalesHistory = (
  organizationId: string,
  startDate: Date,
  endDate: Date,
  groupBy: HistoryGroupBy = 'DAY'
) => {
  const { data, loading, error, refetch } = useGetSalesHistoryQuery({
    variables: {
      organizationId,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      groupBy,
    },
    skip: !organizationId,
  });

  return {
    history: data?.salesHistory || [],
    loading,
    error,
    refetch,
  };
};
```

---

## 6. Tratamento de Erros

### 6.1 Erros Esperados

- `ORGANIZATION_NOT_FOUND`: Organização não encontrada
- `INVALID_PERIOD`: Período inválido
- `INVALID_DATE_RANGE`: Range de datas inválido (startDate > endDate)

### 6.2 Validações

- Validar que `organizationId` existe e o usuário tem permissão
- Validar que `startDate` <= `endDate`
- Validar que o range de datas não excede 1 ano (para performance)
- Validar que `groupBy` é um valor válido

---

## 7. Exemplo de Implementação (Resolvers)

### 7.1 Resolver `dashboardStats`

```typescript
// Exemplo conceitual (adaptar para sua stack)
async dashboardStats(
  parent: any,
  args: { organizationId: string; period: DashboardPeriod },
  context: Context
) {
  const { organizationId, period } = args;
  
  // Validar organização
  const organization = await validateOrganization(organizationId, context);
  
  // Calcular períodos
  const { currentStart, currentEnd, previousStart, previousEnd } = 
    calculatePeriods(period);
  
  // Buscar dados agregados
  const [
    totalRevenue,
    currentPeriodRevenue,
    previousPeriodRevenue,
    totalSales,
    currentPeriodSales,
    previousPeriodSales,
    totalClients,
    currentPeriodClients,
    previousPeriodClients,
    productsStats
  ] = await Promise.all([
    // Queries agregadas do banco
    getTotalRevenue(organizationId),
    getPeriodRevenue(organizationId, currentStart, currentEnd),
    getPeriodRevenue(organizationId, previousStart, previousEnd),
    getTotalSales(organizationId),
    getPeriodSales(organizationId, currentStart, currentEnd),
    getPeriodSales(organizationId, previousStart, previousEnd),
    getTotalClients(organizationId),
    getPeriodClients(organizationId, currentStart, currentEnd),
    getPeriodClients(organizationId, previousStart, previousEnd),
    getProductsStats(organizationId),
  ]);
  
  // Calcular crescimento
  const revenueGrowth = calculateGrowth(
    currentPeriodRevenue,
    previousPeriodRevenue
  );
  const salesGrowth = calculateGrowth(
    currentPeriodSales,
    previousPeriodSales
  );
  const clientsGrowth = calculateGrowth(
    currentPeriodClients,
    previousPeriodClients
  );
  
  return {
    revenue: {
      total: totalRevenue,
      currentPeriod: currentPeriodRevenue,
      previousPeriod: previousPeriodRevenue,
      growthPercentage: revenueGrowth.percentage,
      growthTrend: revenueGrowth.trend,
    },
    sales: {
      total: totalSales,
      currentPeriod: currentPeriodSales,
      previousPeriod: previousPeriodSales,
      growthPercentage: salesGrowth.percentage,
      growthTrend: salesGrowth.trend,
    },
    clients: {
      total: totalClients,
      currentPeriod: currentPeriodClients,
      previousPeriod: previousPeriodClients,
      growthPercentage: clientsGrowth.percentage,
      growthTrend: clientsGrowth.trend,
    },
    products: productsStats,
  };
}
```

### 7.2 Resolver `salesHistory`

```typescript
async salesHistory(
  parent: any,
  args: {
    organizationId: string;
    startDate: Date;
    endDate: Date;
    groupBy: HistoryGroupBy;
  },
  context: Context
) {
  const { organizationId, startDate, endDate, groupBy } = args;
  
  // Validar range de datas
  if (startDate > endDate) {
    throw new Error('INVALID_DATE_RANGE');
  }
  
  // Validar que não excede 1 ano
  const daysDiff = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
  if (daysDiff > 365) {
    throw new Error('DATE_RANGE_TOO_LARGE');
  }
  
  // Buscar dados agregados por período
  const history = await getSalesHistoryAggregated(
    organizationId,
    startDate,
    endDate,
    groupBy
  );
  
  return history;
}
```

---

## 8. Checklist de Implementação

### Backend

- [ ] Criar enum `DashboardPeriod` no schema GraphQL
- [ ] Criar enum `HistoryGroupBy` no schema GraphQL
- [ ] Criar enum `GrowthTrend` no schema GraphQL
- [ ] Criar type `DashboardStats` e tipos relacionados
- [ ] Criar type `SalesHistoryData`
- [ ] Implementar resolver `dashboardStats`
- [ ] Implementar resolver `salesHistory`
- [ ] Implementar função `calculatePeriods`
- [ ] Implementar função `calculateGrowth`
- [ ] Criar queries agregadas no banco de dados
- [ ] Adicionar índices necessários
- [ ] Implementar cache (opcional, mas recomendado)
- [ ] Adicionar validações e tratamento de erros
- [ ] Testar com diferentes períodos
- [ ] Testar com organizações sem dados
- [ ] Testar performance com grandes volumes

### Frontend (Após Backend)

- [ ] Gerar tipos GraphQL atualizados (`npm run codegen`)
- [ ] Criar hook `useDashboardStats`
- [ ] Criar hook `useSalesHistory`
- [ ] Atualizar `SectionCards` para usar dados reais
- [ ] Atualizar `ChartAreaInteractive` para usar dados reais
- [ ] Adicionar estados de loading
- [ ] Adicionar tratamento de erros
- [ ] Testar integração completa

---

## 9. Notas Finais

### Prioridades

1. **Alta Prioridade:**
   - Query `GetDashboardStats` com métricas básicas (revenue, sales, clients)
   - Suporte para período `MONTH`

2. **Média Prioridade:**
   - Query `GetSalesHistory` para gráficos
   - Suporte para múltiplos períodos (WEEK, QUARTER, YEAR)

3. **Baixa Prioridade:**
   - Cache
   - Otimizações avançadas
   - Suporte para período `ALL_TIME`

### Considerações

- Os cálculos devem ser **consistentes** entre diferentes queries
- Períodos devem considerar **timezone** da organização
- Valores monetários devem retornar com **2 casas decimais**
- Percentuais de crescimento devem retornar com **2 casas decimais**
- Datas devem seguir padrão **ISO 8601** (DateTime)

---

**Documento criado em:** 2025-01-27  
**Versão:** 1.0  
**Autor:** PayHub Development Team
