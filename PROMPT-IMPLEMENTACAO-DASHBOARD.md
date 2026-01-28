# Prompt de Implementação: Dashboard Backend PayHub

## Instruções para Implementação

Você é um desenvolvedor backend especializado em GraphQL e sistemas de gestão. Sua tarefa é implementar completamente as funcionalidades descritas no documento `BACKEND-DASHBOARD-REQUIREMENTS.md`.

---

## Contexto do Projeto

O **PayHub** é um sistema de gestão de vendas desenvolvido em Next.js com backend GraphQL. Atualmente, o dashboard utiliza dados mockados e precisa ser integrado com dados reais do backend.

**Stack Backend (assumida):**
- GraphQL (Apollo Server ou similar)
- Node.js/TypeScript
- Banco de dados relacional (PostgreSQL/MySQL) ou NoSQL
- Sistema de autenticação/autorização existente

---

## Tarefa Principal

**Leia completamente o documento `BACKEND-DASHBOARD-REQUIREMENTS.md` e implemente TODAS as funcionalidades descritas, seguindo rigorosamente as especificações.**

---

## Escopo da Implementação

### 1. Schema GraphQL

Implemente os seguintes elementos no schema GraphQL:

- [ ] Enum `DashboardPeriod` com valores: `TODAY`, `WEEK`, `MONTH`, `QUARTER`, `YEAR`, `ALL_TIME`
- [ ] Enum `HistoryGroupBy` com valores: `DAY`, `WEEK`, `MONTH`
- [ ] Enum `GrowthTrend` com valores: `UP`, `DOWN`, `STABLE`
- [ ] Type `DashboardStats` e todos os tipos relacionados (`RevenueStats`, `SalesStats`, `ClientStats`, `ProductStats`)
- [ ] Type `SalesHistoryData`
- [ ] Query `dashboardStats` com parâmetros `organizationId` e `period`
- [ ] Query `salesHistory` com parâmetros `organizationId`, `startDate`, `endDate`, `groupBy`

### 2. Resolvers e Lógica de Negócio

Implemente os resolvers com a seguinte lógica:

**Resolver `dashboardStats`:**
- [ ] Validar que `organizationId` existe e o usuário tem permissão
- [ ] Calcular períodos atual e anterior baseado no parâmetro `period`
- [ ] Buscar dados agregados do banco de dados (usar agregações SQL, não buscar todos os registros)
- [ ] Calcular métricas de receita (total, período atual, período anterior)
- [ ] Calcular métricas de vendas (total, período atual, período anterior)
- [ ] Calcular métricas de clientes (total, período atual, período anterior)
- [ ] Calcular métricas de produtos (total, ativos, inativos)
- [ ] Calcular percentual de crescimento usando a fórmula: `((currentPeriod - previousPeriod) / previousPeriod) * 100`
- [ ] Determinar `growthTrend` baseado no percentual de crescimento
- [ ] Retornar estrutura completa conforme especificação

**Resolver `salesHistory`:**
- [ ] Validar que `organizationId` existe e o usuário tem permissão
- [ ] Validar que `startDate <= endDate`
- [ ] Validar que o range de datas não excede 365 dias
- [ ] Agrupar vendas por período conforme `groupBy` (DAY, WEEK, MONTH)
- [ ] Calcular `revenue` (soma de `total` onde `paymentStatus = "PAID"`)
- [ ] Calcular `salesCount` (contagem de vendas)
- [ ] Calcular `clientsCount` (contagem de clientes únicos)
- [ ] Retornar array ordenado por `date` em ordem crescente
- [ ] Incluir períodos sem vendas com valores zerados (não omitir)

### 3. Funções Auxiliares

Implemente as seguintes funções auxiliares:

- [ ] `calculatePeriods(period: DashboardPeriod)`: Retorna objetos de data para período atual e anterior
- [ ] `calculateGrowth(current: number, previous: number)`: Retorna objeto com `percentage` e `trend`
- [ ] `getTotalRevenue(organizationId: string)`: Query agregada para receita total
- [ ] `getPeriodRevenue(organizationId: string, startDate: Date, endDate: Date)`: Query agregada para receita do período
- [ ] `getTotalSales(organizationId: string)`: Query agregada para total de vendas
- [ ] `getPeriodSales(organizationId: string, startDate: Date, endDate: Date)`: Query agregada para vendas do período
- [ ] `getTotalClients(organizationId: string)`: Query agregada para total de clientes
- [ ] `getPeriodClients(organizationId: string, startDate: Date, endDate: Date)`: Query agregada para clientes do período
- [ ] `getProductsStats(organizationId: string)`: Query agregada para estatísticas de produtos
- [ ] `getSalesHistoryAggregated(organizationId: string, startDate: Date, endDate: Date, groupBy: HistoryGroupBy)`: Query agregada para histórico de vendas

### 4. Banco de Dados

Implemente as seguintes otimizações:

- [ ] Criar índices para performance:
  - `sales(organizationId, createdAt)`
  - `sales(organizationId, paymentStatus, paymentDate)`
  - `clients(organizationId, createdAt)`
  - `products(organizationId, status)`
- [ ] Usar queries agregadas (SUM, COUNT, AVG) ao invés de buscar todos os registros
- [ ] Implementar cache (opcional, mas recomendado):
  - Cache de 5 minutos para `dashboardStats`
  - Cache de 1 minuto para `salesHistory`
  - Invalidar cache quando novas vendas/clientes/produtos forem criados

### 5. Validações e Tratamento de Erros

Implemente as seguintes validações:

- [ ] Validar que `organizationId` existe no banco de dados
- [ ] Validar que o usuário autenticado tem permissão para acessar a organização
- [ ] Validar que `period` é um valor válido do enum `DashboardPeriod`
- [ ] Validar que `startDate <= endDate` na query `salesHistory`
- [ ] Validar que o range de datas não excede 365 dias
- [ ] Validar que `groupBy` é um valor válido do enum `HistoryGroupBy`
- [ ] Retornar erros apropriados:
  - `ORGANIZATION_NOT_FOUND` quando organização não existe
  - `INVALID_PERIOD` quando período é inválido
  - `INVALID_DATE_RANGE` quando range de datas é inválido
  - `DATE_RANGE_TOO_LARGE` quando range excede 365 dias

### 6. Testes

Implemente testes para garantir qualidade:

- [ ] Testes unitários para funções auxiliares (`calculatePeriods`, `calculateGrowth`)
- [ ] Testes de integração para resolver `dashboardStats` com diferentes períodos
- [ ] Testes de integração para resolver `salesHistory` com diferentes `groupBy`
- [ ] Testes com organizações sem dados (deve retornar zeros, não erros)
- [ ] Testes de performance com grandes volumes de dados
- [ ] Testes de validação de erros

---

## Diretrizes de Implementação

### Performance

1. **SEMPRE use agregações do banco de dados** - Não busque todos os registros e calcule no código
2. **Use índices apropriados** - Garanta que as queries sejam otimizadas
3. **Implemente cache quando possível** - Reduza carga no banco de dados
4. **Limite o range de datas** - Máximo de 365 dias para `salesHistory`

### Precisão de Cálculos

1. **Receita**: Considere apenas vendas com `paymentStatus = "PAID"`
2. **Contagem de vendas**: Conte todas as vendas, independente do status
3. **Períodos**: Use `createdAt` para determinar período da venda, `paymentDate` quando disponível para receita
4. **Clientes**: Use `createdAt` para determinar novos clientes
5. **Produtos**: Considere lógica de negócio para determinar ativos/inativos

### Formatação de Dados

1. **Valores monetários**: Retornar com 2 casas decimais (Float)
2. **Percentuais**: Retornar com 2 casas decimais (Float)
3. **Datas**: Seguir padrão ISO 8601 (DateTime)
4. **Timezones**: Considerar timezone da organização

### Consistência

1. **Cálculos consistentes**: Mesma lógica entre diferentes queries
2. **Nomenclatura**: Seguir exatamente os nomes dos campos especificados
3. **Estrutura**: Retornar exatamente a estrutura especificada no documento

---

## Critérios de Qualidade

A implementação será considerada completa quando:

✅ **Todas as queries GraphQL estão funcionando** conforme especificação  
✅ **Todos os tipos e enums estão definidos** corretamente  
✅ **Todos os cálculos estão corretos** e seguem as fórmulas especificadas  
✅ **Performance está otimizada** com agregações no banco e índices  
✅ **Validações estão implementadas** e retornam erros apropriados  
✅ **Testes estão passando** e cobrem casos principais  
✅ **Código está documentado** com comentários explicativos  
✅ **Estrutura de resposta está exata** conforme especificação do documento  

---

## Ordem de Implementação Recomendada

1. **Fase 1 - Schema e Tipos** (Alta Prioridade)
   - Criar enums e types no schema GraphQL
   - Definir queries no schema

2. **Fase 2 - Funções Auxiliares** (Alta Prioridade)
   - Implementar `calculatePeriods`
   - Implementar `calculateGrowth`
   - Criar queries agregadas básicas

3. **Fase 3 - Resolver dashboardStats** (Alta Prioridade)
   - Implementar resolver completo
   - Testar com período `MONTH`
   - Validar cálculos

4. **Fase 4 - Resolver salesHistory** (Média Prioridade)
   - Implementar resolver completo
   - Testar com diferentes `groupBy`
   - Validar agrupamentos

5. **Fase 5 - Otimizações** (Média Prioridade)
   - Criar índices no banco
   - Implementar cache
   - Otimizar queries

6. **Fase 6 - Validações e Erros** (Média Prioridade)
   - Implementar todas as validações
   - Tratamento de erros apropriado
   - Mensagens de erro claras

7. **Fase 7 - Testes** (Alta Prioridade)
   - Testes unitários
   - Testes de integração
   - Testes de performance

8. **Fase 8 - Documentação** (Baixa Prioridade)
   - Comentários no código
   - Documentação de API
   - Exemplos de uso

---

## Exemplo de Estrutura de Código

```typescript
// Exemplo de estrutura esperada (adaptar para sua stack)

// types/dashboard.ts
export enum DashboardPeriod {
  TODAY = 'TODAY',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
  QUARTER = 'QUARTER',
  YEAR = 'YEAR',
  ALL_TIME = 'ALL_TIME',
}

export enum HistoryGroupBy {
  DAY = 'DAY',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
}

export enum GrowthTrend {
  UP = 'UP',
  DOWN = 'DOWN',
  STABLE = 'STABLE',
}

// resolvers/dashboard.ts
export const dashboardResolvers = {
  Query: {
    dashboardStats: async (parent, args, context) => {
      // Implementação conforme especificação
    },
    salesHistory: async (parent, args, context) => {
      // Implementação conforme especificação
    },
  },
};

// utils/dashboard.ts
export const calculatePeriods = (period: DashboardPeriod) => {
  // Implementação conforme especificação
};

export const calculateGrowth = (current: number, previous: number) => {
  // Implementação conforme especificação
};
```

---

## Notas Importantes

1. **Leia o documento completo primeiro** - Não comece a implementar sem entender todas as especificações
2. **Siga exatamente as especificações** - Não faça suposições, siga o documento
3. **Teste cada funcionalidade** - Valide que está funcionando antes de prosseguir
4. **Considere casos extremos** - Organizações sem dados, períodos sem vendas, etc.
5. **Mantenha performance em mente** - Use agregações, índices e cache
6. **Documente o código** - Facilite manutenção futura

---

## Perguntas Frequentes

**Q: E se minha stack for diferente?**  
A: Adapte a estrutura, mas mantenha a lógica de negócio e estrutura de resposta conforme especificação.

**Q: E se não tiver alguns campos no banco?**  
A: Implemente os campos necessários ou adapte a lógica, mas mantenha a estrutura de resposta.

**Q: E se quiser adicionar mais métricas?**  
A: Implemente primeiro conforme especificação. Depois pode expandir.

**Q: E se o cálculo de período for diferente?**  
A: Siga exatamente a especificação do documento. Se houver dúvida, pergunte.

---

## Conclusão

Implemente **TODAS** as funcionalidades descritas no documento `BACKEND-DASHBOARD-REQUIREMENTS.md` seguindo rigorosamente as especificações. Priorize qualidade, performance e precisão dos cálculos.

**Boa implementação!**

---

**Documento criado em:** 2025-01-27  
**Versão:** 1.0  
**Uso:** Enviar este prompt completo para o Cursor ou outro assistente de IA para implementação
