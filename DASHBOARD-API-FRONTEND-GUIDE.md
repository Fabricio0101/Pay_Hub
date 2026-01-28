# API Dashboard PayHub — Guia de Integração Frontend

Este documento descreve as novas funcionalidades de dashboard do backend PayHub, como consumi-las no frontend e um **prompt pronto para o Cursor** para implementar a integração no dashboard.

---

## 1. Visão geral

O backend expõe **duas queries GraphQL** para o dashboard:

| Query | Descrição |
|-------|-----------|
| `dashboardStats` | Estatísticas agregadas (receita, vendas, clientes, produtos) para um período |
| `salesHistory` | Histórico de vendas agrupado por dia, semana ou mês |

Ambas exigem **autenticação JWT** e que o usuário tenha permissão sobre a organização (`organizationId` do token deve coincidir com o `organizationId` passado nas queries).

---

## 2. Autenticação

- **Header:** `Authorization: Bearer <accessToken>`
- O `accessToken` é retornado na mutation `login(loginInput: LoginInput!)` no campo `accessToken` de `AuthResponse`.
- O `organizationId` a ser usado nas queries do dashboard deve ser o **mesmo** retornado em `AuthResponse.organizationId` após o login.

**Exemplo de login (GraphQL):**

```graphql
mutation Login($loginInput: LoginInput!) {
  login(loginInput: $loginInput) {
    accessToken
    userId
    email
    fullName
    role
    organizationId
  }
}
```

Variáveis:

```json
{
  "loginInput": {
    "email": "admin@exemplo.com",
    "password": "suaSenha123"
  }
}
```

Guarde `accessToken` e `organizationId` (ex.: contexto de autenticação ou estado global) para usar nas queries do dashboard.

---

## 3. Queries disponíveis

### 3.1. `dashboardStats`

Retorna métricas agregadas para a organização e o período informados.

**Assinatura:**

```graphql
dashboardStats(organizationId: ID!, period: DashboardPeriod!): DashboardStats!
```

**Enums:**

- **`DashboardPeriod`:** `TODAY` | `WEEK` | `MONTH` | `QUARTER` | `YEAR` | `ALL_TIME`

**Exemplo de operação:**

```graphql
query DashboardStats($organizationId: ID!, $period: DashboardPeriod!) {
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

**Variáveis (ex.: período mensal):**

```json
{
  "organizationId": "uuid-da-organizacao",
  "period": "MONTH"
}
```

**Estrutura da resposta (`DashboardStats`):**

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `revenue` | `RevenueStats` | Receita (apenas vendas com `paymentStatus = PAID`) |
| `sales` | `SalesStats` | Quantidade de vendas |
| `clients` | `ClientStats` | Quantidade de clientes |
| `products` | `ProductStats` | Total, ativos e inativos |

Cada `*Stats` (exceto `ProductStats`) contém:

- `total`, `currentPeriod`, `previousPeriod`: números
- `growthPercentage`: Float (percentual de crescimento)
- `growthTrend`: `UP` | `DOWN` | `STABLE`

`ProductStats` contém apenas `total`, `active` e `inactive` (Int).

---

### 3.2. `salesHistory`

Retorna o histórico de vendas agrupado por dia, semana ou mês.

**Assinatura:**

```graphql
salesHistory(
  organizationId: ID!
  startDate: DateTime!
  endDate: DateTime!
  groupBy: HistoryGroupBy!
): [SalesHistoryData!]!
```

**Enums:**

- **`HistoryGroupBy`:** `DAY` | `WEEK` | `MONTH`

**Regras:**

- `startDate` ≤ `endDate`
- O intervalo entre `startDate` e `endDate` não pode ultrapassar **365 dias**.
- Datas em **ISO 8601** (ex.: `"2025-01-01T00:00:00.000Z"`).

**Exemplo de operação:**

```graphql
query SalesHistory(
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

**Variáveis (ex.: último mês, agrupado por dia):**

```json
{
  "organizationId": "uuid-da-organizacao",
  "startDate": "2025-01-01T00:00:00.000Z",
  "endDate": "2025-01-31T23:59:59.999Z",
  "groupBy": "DAY"
}
```

**Estrutura de cada item (`SalesHistoryData`):**

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `date` | `DateTime` | Início do período (ISO 8601) |
| `revenue` | `Float` | Receita no período (vendas pagas) |
| `salesCount` | `Int` | Quantidade de vendas |
| `clientsCount` | `Int` | Clientes únicos no período |

O array vem **ordenado por `date`** em ordem crescente. Períodos sem vendas aparecem com `revenue`, `salesCount` e `clientsCount` zerados.

---

## 4. Passo a passo para integrar no dashboard

1. **Autenticação**
   - Implementar fluxo de login com a mutation `login` e armazenar `accessToken` e `organizationId`.

2. **Cliente GraphQL**
   - Configurar Apollo Client (ou equivalente) com o endpoint do backend e o header `Authorization: Bearer <accessToken>` em todas as requisições.

3. **Seletor de período**
   - Para `dashboardStats`: criar seletor (ex.: dropdown) com os valores de `DashboardPeriod` (`TODAY`, `WEEK`, `MONTH`, `QUARTER`, `YEAR`, `ALL_TIME`).
   - Ao mudar o período, refazer a query `dashboardStats` com o mesmo `organizationId` e o novo `period`.

4. **Cards de métricas**
   - Usar `dashboardStats` para exibir cards de Receita, Vendas, Clientes e Produtos.
   - Mostrar `total`, `currentPeriod` e `growthPercentage` / `growthTrend` (ex.: ícone ↑/↓/→ e cor).

5. **Gráfico de histórico**
   - Para `salesHistory`: definir intervalo (ex.: último mês) e `groupBy` (`DAY` | `WEEK` | `MONTH`).
   - Calcular `startDate` e `endDate` no frontend (respeitando o limite de 365 dias).
   - Exibir gráfico (ex.: linhas ou barras) com `date` no eixo X e `revenue` / `salesCount` / `clientsCount` no eixo Y, conforme o layout desejado.

6. **Tratamento de erros**
   - `ORGANIZATION_NOT_FOUND`: organização inexistente.
   - `INVALID_DATE_RANGE`: `startDate` > `endDate`.
   - `DATE_RANGE_TOO_LARGE`: intervalo > 365 dias.
   - `401` / `Não autorizado`: token ausente ou inválido.
   - Exibir mensagens claras e, se necessário, redirect para login.

---

## 5. O que usar

| Recurso | Recomendação |
|--------|----------------|
| **Cliente GraphQL** | Apollo Client (React) ou similar compatível com GraphQL |
| **Estado** | Context + hooks ou Zustand/Redux para `organizationId` e token |
| **Charts** | Recharts, Chart.js, Victory ou similar para o histórico |
| **Datas** | `date-fns` ou `dayjs` para calcular `startDate`/`endDate` e formatação |
| **Requisições** | Sempre enviar `Authorization: Bearer <accessToken>` |

---

## 6. Prompt para o Cursor (implementar dashboard)

Copie o bloco abaixo e use no Cursor no **projeto do frontend** (dashboard PayHub). Ajuste o caminho do schema ou da URL do backend se for diferente no seu ambiente.

```markdown
## Contexto

O backend PayHub expõe duas queries GraphQL para o dashboard, documentadas em `DASHBOARD-API-FRONTEND-GUIDE.md` na raiz do repositório (ou no projeto do backend). O frontend do dashboard hoje usa dados mockados e deve passar a consumir a API real.

## Stack do frontend

- Next.js
- GraphQL (Apollo Client ou equivalente)
- Autenticação JWT existente (login retorna `accessToken` e `organizationId`)

## Tarefas

1. **Configurar cliente GraphQL**
   - Garantir que todas as requisições GraphQL enviem o header `Authorization: Bearer <accessToken>`.
   - Usar o `organizationId` retornado no login como `organizationId` nas queries do dashboard.

2. **Substituir mocks por `dashboardStats`**
   - Implementar a query `dashboardStats(organizationId: ID!, period: DashboardPeriod!)` conforme o schema e exemplos em `DASHBOARD-API-FRONTEND-GUIDE.md`.
   - Exibir cards de Receita, Vendas, Clientes e Produtos com `total`, `currentPeriod`, `growthPercentage` e `growthTrend` (UP/DOWN/STABLE), usando os enums e tipos exatos do schema.

3. **Substituir mocks por `salesHistory`**
   - Implementar a query `salesHistory(organizationId, startDate, endDate, groupBy)` com datas em ISO 8601 e `groupBy` em `DAY` | `WEEK` | `MONTH`.
   - Garantir `startDate <= endDate` e intervalo máximo de 365 dias.
   - Exibir gráfico de histórico (linha ou barras) com `date`, `revenue`, `salesCount` e `clientsCount`.

4. **Seletor de período**
   - Para as estatísticas: seletor com `DashboardPeriod` (TODAY, WEEK, MONTH, QUARTER, YEAR, ALL_TIME).
   - Para o histórico: seletor de intervalo (ex. último mês) e de agrupamento (DAY, WEEK, MONTH), calculando `startDate` e `endDate` no frontend.

5. **Tratamento de erros**
   - Tratar `ORGANIZATION_NOT_FOUND`, `INVALID_DATE_RANGE`, `DATE_RANGE_TOO_LARGE` e erros 401, exibindo mensagens claras e redirecionando para login quando apropriado.

6. **Tipagem**
   - Definir tipos TypeScript (ou gerar via codegen) alinhados ao schema GraphQL: `DashboardStats`, `RevenueStats`, `SalesStats`, `ClientStats`, `ProductStats`, `SalesHistoryData`, `DashboardPeriod`, `HistoryGroupBy`, `GrowthTrend`.

Siga rigorosamente o schema e os exemplos de operações e variáveis descritos em `DASHBOARD-API-FRONTEND-GUIDE.md`. Mantenha o código limpo, com nomes descritivos e sem TODOs ou placeholders.
```

---

## 7. Referência rápida — schema (trecho)

```
DashboardPeriod: TODAY | WEEK | MONTH | QUARTER | YEAR | ALL_TIME
HistoryGroupBy:  DAY | WEEK | MONTH
GrowthTrend:     UP | DOWN | STABLE

DashboardStats:  { revenue, sales, clients, products }
RevenueStats:    { total, currentPeriod, previousPeriod, growthPercentage, growthTrend }
SalesStats:      { total, currentPeriod, previousPeriod, growthPercentage, growthTrend }
ClientStats:     { total, currentPeriod, previousPeriod, growthPercentage, growthTrend }
ProductStats:    { total, active, inactive }

SalesHistoryData: { date, revenue, salesCount, clientsCount }
```

---

**Documento:** `DASHBOARD-API-FRONTEND-GUIDE.md`  
**Versão:** 1.0  
**Uso:** Guia de integração frontend + prompt para Cursor
