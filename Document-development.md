# PayHub – Sistema de Gestão de Vendas

## 1. Visão Geral do Produto

**PayHub** é uma plataforma web de **gestão de vendas** desenvolvida em **Next.js**, utilizando **shadcn/ui** e **Tailwind CSS**, com foco em simplicidade operacional, padronização visual e escalabilidade funcional.

O objetivo principal do PayHub é permitir que empresas gerenciem:

* Clientes
* Categorias de produtos
* Produtos
* Vendas
* Relatórios operacionais e gerenciais

A plataforma segue um padrão visual consistente, baseado em **tabelas, modais e fluxos claros de CRUD**, priorizando produtividade e baixa curva de aprendizado.

---

## 2. Stack Técnica Atual

* **Framework:** Next.js (App Router)
* **UI:** shadcn/ui
* **Estilização:** Tailwind CSS
* **Autenticação:** Tela de login já implementada
* **Estado dos dados:** Atualmente **dados mockados** no dashboard

---

## 3. O Que Já Existe Hoje

### 3.1 Autenticação

* Tela de **login funcional**
* Fluxo básico de acesso à plataforma

### 3.2 Dashboard

* Dashboard inicial
* Exibição de **dados mockados**
* Estrutura base já definida para métricas futuras

### 3.3 Tela de Cadastro de Clientes (Referência Padrão)

Esta tela é o **padrão-base** para outras telas do sistema.

**Estrutura:**

* Título principal
* Subtítulo explicativo
* Tabela padronizada listando os clientes
* Botão de ação: **Adicionar Cliente**
* Modal para criação de cliente

Esse padrão deve ser **replicado e adaptado** para outras entidades do sistema.

---

## 4. Funcionalidades a Serem Criadas

### 4.1 Tela de Categorias

**Objetivo:** Gerenciar categorias de produtos.

**Padrão visual:**

* Espelho exato da tela de clientes

**Componentes:**

* Título: "Categorias"
* Subtítulo explicativo
* Tabela listando categorias
* Botão: "Adicionar Categoria"
* Modal para criação/edição de categoria

**Observação:**

* Reutilizar ao máximo a estrutura da tela de clientes
* Alterar apenas textos, campos e tipagem

---

### 4.2 Tela de Cadastro de Produtos

**Objetivo:** Gerenciar produtos comercializados.

**Padrão visual:**

* Muito similar às telas de Clientes e Categorias

**Componentes:**

* Título: "Produtos"
* Subtítulo explicativo
* Tabela listando produtos
* Botão: "Adicionar Produto"
* Modal para criação/edição de produto

**Campos esperados (exemplo):**

* Nome do produto
* Categoria
* Preço
* Status (ativo/inativo)

---

### 4.3 Tela de Vendas

**Objetivo:** Registrar e acompanhar vendas realizadas.

#### 4.3.1 Listagem de Vendas

* Estrutura baseada em **tabela**, mantendo consistência visual
* Colunas típicas:

  * Cliente
  * Data da venda
  * Valor total
  * Status da venda

#### 4.3.2 Proposta de Visualização Aprimorada (Diferencial)

Ao invés de um simples modal tradicional, a tela de vendas deve ter uma **experiência mais rica**, por exemplo:

* Modal em **layout dividido** ou **drawer lateral**
* Fluxo orientado por etapas:

  1. Seleção do cliente
  2. Seleção de produtos
  3. Quantidades
  4. Resumo da venda

**Objetivo da melhoria:**

* Tornar o processo de venda mais intuitivo
* Reduzir erros
* Melhorar a experiência do usuário

---

### 4.4 Tela de Relatórios

**Objetivo:** Criar, visualizar e gerenciar relatórios.

#### 4.4.1 Estrutura Geral da Tela

A tela deve ser dividida em **três grandes áreas**:

---

#### 4.4.2 Atalhos de Relatórios Rápidos (Topo da Tela)

* Cards ou botões de ação rápida
* Exemplos:

  * Relatório de vendas do dia
  * Relatório de vendas do mês
  * Produtos mais vendidos
  * Clientes com mais compras

Esses atalhos geram relatórios pré-configurados com **1 clique**.

---

#### 4.4.3 Criar Relatório Personalizado

* Botão: "Criar Relatório"
* Ação abre um **modal**
* No modal, o usuário poderá selecionar:

  * Tipo de relatório
  * Período
  * Entidades envolvidas (produtos, clientes, categorias)

---

#### 4.4.4 Listagem de Relatórios Criados

* Tabela listando todos os relatórios já gerados
* Colunas sugeridas:

  * Nome do relatório
  * Tipo
  * Período
  * Data de criação
  * Ações (visualizar, exportar, excluir)

---

## 5. Diretrizes de Arquitetura e Implementação

* Reutilizar componentes sempre que possível
* Padronizar:

  * Tabelas
  * Modais
  * Headers de página
* Manter consistência visual entre todas as telas
* Estruturar pastas por **feature**, não apenas por tipo de componente

---

## 6. Objetivo Final Deste Documento

Este documento existe para que o **Cursor** consiga:

1. Entender claramente **o estado atual da plataforma PayHub**
2. Compreender **o padrão visual e estrutural já existente**
3. Saber exatamente **quais novas telas devem ser criadas**
4. Implementar essas telas de forma consistente, organizada e escalável
5. Evoluir o PayHub de um MVP para um sistema completo de gestão de vendas

---

**PayHub** não é apenas um CRUD, mas um sistema pensado para crescimento, clareza e eficiência operacional.
