import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  accessToken: Scalars['String']['output'];
  email: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  organizationId: Scalars['String']['output'];
  role: UserRole;
  userId: Scalars['String']['output'];
};

export type Client = {
  __typename?: 'Client';
  birthDate?: Maybe<Scalars['DateTime']['output']>;
  collaborator?: Maybe<Collaborator>;
  collaboratorId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  organization?: Maybe<Organization>;
  organizationId: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ClientStats = {
  __typename?: 'ClientStats';
  /** Clientes do período atual */
  currentPeriod: Scalars['Int']['output'];
  /** Percentual de crescimento entre períodos */
  growthPercentage: Scalars['Float']['output'];
  /** Tendência de crescimento */
  growthTrend: GrowthTrend;
  /** Clientes do período anterior */
  previousPeriod: Scalars['Int']['output'];
  /** Total de clientes */
  total: Scalars['Int']['output'];
};

export type Collaborator = {
  __typename?: 'Collaborator';
  address?: Maybe<Scalars['String']['output']>;
  clients?: Maybe<Array<Client>>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  neighborhood?: Maybe<Scalars['String']['output']>;
  organization?: Maybe<Organization>;
  organizationId: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  profileImageUrl?: Maybe<Scalars['String']['output']>;
  role: UserRole;
  specialty?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  zipCode?: Maybe<Scalars['String']['output']>;
};

export type CreateCategoryInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  organizationId: Scalars['String']['input'];
};

export type CreateClientInput = {
  birthDate?: InputMaybe<Scalars['DateTime']['input']>;
  collaboratorId: Scalars['String']['input'];
  email: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  organizationId: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};

export type CreateCollaboratorInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  neighborhood?: InputMaybe<Scalars['String']['input']>;
  organizationId: Scalars['String']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  profileImageUrl?: InputMaybe<Scalars['String']['input']>;
  role?: UserRole;
  specialty?: InputMaybe<Scalars['String']['input']>;
  zipCode?: InputMaybe<Scalars['String']['input']>;
};

export type CreateOrganizationAdminInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  neighborhood?: InputMaybe<Scalars['String']['input']>;
  organizationId: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  role?: UserRole;
  zipCode?: InputMaybe<Scalars['String']['input']>;
};

export type CreateOrganizationInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  adminEmail: Scalars['String']['input'];
  adminFullName: Scalars['String']['input'];
  adminPassword: Scalars['String']['input'];
  city?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  neighborhood?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  zipCode?: InputMaybe<Scalars['String']['input']>;
};

export type CreateProductInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  organizationId: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  productCategoryId: Scalars['String']['input'];
  supplierId: Scalars['String']['input'];
};

export type CreateSaleInput = {
  clientId: Scalars['String']['input'];
  collaboratorId: Scalars['String']['input'];
  organizationId: Scalars['String']['input'];
  paymentDate: Scalars['DateTime']['input'];
  paymentMethod: Scalars['String']['input'];
  paymentStatus: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  productId: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
  total: Scalars['Float']['input'];
};

export type CreateSupplierInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

/** Período do dashboard para agregação de métricas */
export enum DashboardPeriod {
  AllTime = 'ALL_TIME',
  Month = 'MONTH',
  Quarter = 'QUARTER',
  Today = 'TODAY',
  Week = 'WEEK',
  Year = 'YEAR'
}

export type DashboardStats = {
  __typename?: 'DashboardStats';
  /** Métricas de clientes */
  clients: ClientStats;
  /** Métricas de produtos */
  products: ProductStats;
  /** Métricas de receita */
  revenue: RevenueStats;
  /** Métricas de vendas */
  sales: SalesStats;
};

/** Tendência de crescimento da métrica */
export enum GrowthTrend {
  Down = 'DOWN',
  Stable = 'STABLE',
  Up = 'UP'
}

/** Agrupamento do histórico de vendas */
export enum HistoryGroupBy {
  Day = 'DAY',
  Month = 'MONTH',
  Week = 'WEEK'
}

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addProductToCategory: ProductCategory;
  createCategory: ProductCategory;
  createClient: Client;
  createCollaborator: Collaborator;
  createOrganization: Organization;
  createOrganizationAdmin: OrganizationAdmin;
  createProduct: Product;
  createSale: Sale;
  createSupplier: Supplier;
  deleteCategory: Scalars['Boolean']['output'];
  deleteProduct: Product;
  deleteSale: Scalars['Boolean']['output'];
  deleteSupplier: Supplier;
  login: AuthResponse;
  removeClient: Client;
  removeCollaborator: Collaborator;
  removeOrganization: Organization;
  removeOrganizationAdmin: OrganizationAdmin;
  removeProductFromCategory: ProductCategory;
  updateCategory: ProductCategory;
  updateClient: Client;
  updateCollaborator: Collaborator;
  updateOrganization: Organization;
  updateOrganizationAdmin: OrganizationAdmin;
  updateProduct: Product;
  updateSale: Sale;
  updateSupplier: Supplier;
};


export type MutationAddProductToCategoryArgs = {
  categoryId: Scalars['ID']['input'];
  organizationId: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
};


export type MutationCreateCategoryArgs = {
  createCategoryInput: CreateCategoryInput;
  organizationId: Scalars['ID']['input'];
};


export type MutationCreateClientArgs = {
  createClientInput: CreateClientInput;
};


export type MutationCreateCollaboratorArgs = {
  createCollaboratorInput: CreateCollaboratorInput;
};


export type MutationCreateOrganizationArgs = {
  createOrganizationInput: CreateOrganizationInput;
};


export type MutationCreateOrganizationAdminArgs = {
  createOrganizationAdminInput: CreateOrganizationAdminInput;
};


export type MutationCreateProductArgs = {
  createProductInput: CreateProductInput;
  organizationId: Scalars['ID']['input'];
};


export type MutationCreateSaleArgs = {
  createSaleInput: CreateSaleInput;
  organizationId: Scalars['ID']['input'];
};


export type MutationCreateSupplierArgs = {
  createSupplierInput: CreateSupplierInput;
  organizationId: Scalars['ID']['input'];
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['ID']['input'];
  organizationId: Scalars['ID']['input'];
};


export type MutationDeleteProductArgs = {
  id: Scalars['ID']['input'];
  organizationId: Scalars['ID']['input'];
};


export type MutationDeleteSaleArgs = {
  id: Scalars['ID']['input'];
  organizationId: Scalars['ID']['input'];
};


export type MutationDeleteSupplierArgs = {
  id: Scalars['ID']['input'];
  organizationId: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationRemoveClientArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveCollaboratorArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveOrganizationArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveOrganizationAdminArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveProductFromCategoryArgs = {
  categoryId: Scalars['ID']['input'];
  organizationId: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
};


export type MutationUpdateCategoryArgs = {
  id: Scalars['ID']['input'];
  organizationId: Scalars['ID']['input'];
  updateCategoryInput: UpdateCategoryInput;
};


export type MutationUpdateClientArgs = {
  id: Scalars['ID']['input'];
  updateClientInput: UpdateClientInput;
};


export type MutationUpdateCollaboratorArgs = {
  id: Scalars['ID']['input'];
  updateCollaboratorInput: UpdateCollaboratorInput;
};


export type MutationUpdateOrganizationArgs = {
  id: Scalars['ID']['input'];
  updateOrganizationInput: UpdateOrganizationInput;
};


export type MutationUpdateOrganizationAdminArgs = {
  id: Scalars['ID']['input'];
  updateOrganizationAdminInput: UpdateOrganizationAdminInput;
};


export type MutationUpdateProductArgs = {
  id: Scalars['ID']['input'];
  organizationId: Scalars['ID']['input'];
  updateProductInput: UpdateProductInput;
};


export type MutationUpdateSaleArgs = {
  id: Scalars['ID']['input'];
  organizationId: Scalars['ID']['input'];
  updateSaleInput: UpdateSaleInput;
};


export type MutationUpdateSupplierArgs = {
  id: Scalars['ID']['input'];
  organizationId: Scalars['ID']['input'];
  updateSupplierInput: UpdateSupplierInput;
};

export type Organization = {
  __typename?: 'Organization';
  address?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  neighborhood?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  zipCode?: Maybe<Scalars['String']['output']>;
};

export type OrganizationAdmin = {
  __typename?: 'OrganizationAdmin';
  address?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  neighborhood?: Maybe<Scalars['String']['output']>;
  organization?: Maybe<Organization>;
  organizationId: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  role: UserRole;
  updatedAt: Scalars['DateTime']['output'];
  zipCode?: Maybe<Scalars['String']['output']>;
};

export type Product = {
  __typename?: 'Product';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  organization: Organization;
  organizationId: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  productCategory: ProductCategory;
  productCategoryId: Scalars['String']['output'];
  supplier: Supplier;
  supplierId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ProductCategory = {
  __typename?: 'ProductCategory';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  organization: Organization;
  organizationId: Scalars['String']['output'];
  products?: Maybe<Array<Product>>;
  updatedAt: Scalars['DateTime']['output'];
};

export type ProductStats = {
  __typename?: 'ProductStats';
  /** Produtos ativos */
  active: Scalars['Int']['output'];
  /** Produtos inativos */
  inactive: Scalars['Int']['output'];
  /** Total de produtos */
  total: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  categories: Array<ProductCategory>;
  category: ProductCategory;
  client: Client;
  clients: Array<Client>;
  collaborator: Collaborator;
  collaborators: Array<Collaborator>;
  /** Estatísticas do dashboard para uma organização e período */
  dashboardStats: DashboardStats;
  organization: Organization;
  organizationAdmin: OrganizationAdmin;
  organizationAdmins: Array<OrganizationAdmin>;
  organizations: Array<Organization>;
  product: Product;
  products: Array<Product>;
  sale: Sale;
  sales: Array<Sale>;
  /** Histórico de vendas agrupado por período */
  salesHistory: Array<SalesHistoryData>;
  supplier: Supplier;
  suppliers: Array<Supplier>;
};


export type QueryCategoriesArgs = {
  organizationId: Scalars['ID']['input'];
};


export type QueryCategoryArgs = {
  id: Scalars['ID']['input'];
  organizationId: Scalars['ID']['input'];
};


export type QueryClientArgs = {
  id: Scalars['ID']['input'];
};


export type QueryClientsArgs = {
  collaboratorId?: InputMaybe<Scalars['ID']['input']>;
  organizationId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryCollaboratorArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCollaboratorsArgs = {
  organizationId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryDashboardStatsArgs = {
  organizationId: Scalars['ID']['input'];
  period: DashboardPeriod;
};


export type QueryOrganizationArgs = {
  id: Scalars['ID']['input'];
};


export type QueryOrganizationAdminArgs = {
  id: Scalars['ID']['input'];
};


export type QueryOrganizationAdminsArgs = {
  organizationId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryProductArgs = {
  id: Scalars['ID']['input'];
  organizationId: Scalars['ID']['input'];
};


export type QueryProductsArgs = {
  organizationId: Scalars['ID']['input'];
};


export type QuerySaleArgs = {
  id: Scalars['ID']['input'];
  organizationId: Scalars['ID']['input'];
};


export type QuerySalesArgs = {
  organizationId: Scalars['ID']['input'];
};


export type QuerySalesHistoryArgs = {
  endDate: Scalars['DateTime']['input'];
  groupBy: HistoryGroupBy;
  organizationId: Scalars['ID']['input'];
  startDate: Scalars['DateTime']['input'];
};


export type QuerySupplierArgs = {
  id: Scalars['ID']['input'];
  organizationId: Scalars['ID']['input'];
};


export type QuerySuppliersArgs = {
  organizationId: Scalars['ID']['input'];
};

export type RevenueStats = {
  __typename?: 'RevenueStats';
  /** Receita do período atual */
  currentPeriod: Scalars['Float']['output'];
  /** Percentual de crescimento entre períodos */
  growthPercentage: Scalars['Float']['output'];
  /** Tendência de crescimento */
  growthTrend: GrowthTrend;
  /** Receita do período anterior */
  previousPeriod: Scalars['Float']['output'];
  /** Receita total (todas as vendas pagas) */
  total: Scalars['Float']['output'];
};

export type Sale = {
  __typename?: 'Sale';
  client: Client;
  clientId: Scalars['String']['output'];
  collaborator: Collaborator;
  collaboratorId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  organization: Organization;
  organizationId: Scalars['String']['output'];
  paymentDate: Scalars['DateTime']['output'];
  paymentMethod: Scalars['String']['output'];
  paymentStatus: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  product: Product;
  productId: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
  total: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type SalesHistoryData = {
  __typename?: 'SalesHistoryData';
  /** Quantidade de clientes únicos */
  clientsCount: Scalars['Int']['output'];
  /** Data do período (início do agrupamento) */
  date: Scalars['DateTime']['output'];
  /** Receita (soma de total onde paymentStatus = PAID) */
  revenue: Scalars['Float']['output'];
  /** Quantidade de vendas */
  salesCount: Scalars['Int']['output'];
};

export type SalesStats = {
  __typename?: 'SalesStats';
  /** Vendas do período atual */
  currentPeriod: Scalars['Int']['output'];
  /** Percentual de crescimento entre períodos */
  growthPercentage: Scalars['Float']['output'];
  /** Tendência de crescimento */
  growthTrend: GrowthTrend;
  /** Vendas do período anterior */
  previousPeriod: Scalars['Int']['output'];
  /** Total de vendas */
  total: Scalars['Int']['output'];
};

export type Supplier = {
  __typename?: 'Supplier';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  organization: Organization;
  organizationId: Scalars['String']['output'];
  products?: Maybe<Array<Product>>;
  updatedAt: Scalars['DateTime']['output'];
};

export type UpdateCategoryInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  organizationId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateClientInput = {
  birthDate?: InputMaybe<Scalars['DateTime']['input']>;
  collaboratorId?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  fullName?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCollaboratorInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  fullName?: InputMaybe<Scalars['String']['input']>;
  neighborhood?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  profileImageUrl?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<UserRole>;
  specialty?: InputMaybe<Scalars['String']['input']>;
  zipCode?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateOrganizationAdminInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  fullName?: InputMaybe<Scalars['String']['input']>;
  neighborhood?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<UserRole>;
  zipCode?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateOrganizationInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  neighborhood?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  zipCode?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProductInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  organizationId?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  productCategoryId?: InputMaybe<Scalars['String']['input']>;
  supplierId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateSaleInput = {
  clientId: Scalars['String']['input'];
  collaboratorId: Scalars['String']['input'];
  organizationId: Scalars['String']['input'];
  paymentDate: Scalars['DateTime']['input'];
  paymentMethod: Scalars['String']['input'];
  paymentStatus: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  productId: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
  total: Scalars['Float']['input'];
};

export type UpdateSupplierInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** Tipos de usuários do sistema */
export enum UserRole {
  Admin = 'ADMIN',
  Collaborator = 'COLLABORATOR'
}

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthResponse', accessToken: string, userId: string, email: string, fullName: string, role: UserRole, organizationId: string } };

export type CreateCategoryMutationVariables = Exact<{
  createCategoryInput: CreateCategoryInput;
  organizationId: Scalars['ID']['input'];
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createCategory: { __typename?: 'ProductCategory', id: string, name: string, description?: string | null, organizationId: string, createdAt: any, updatedAt: any, products?: Array<{ __typename?: 'Product', id: string, name: string, price: number }> | null } };

export type UpdateCategoryMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  organizationId: Scalars['ID']['input'];
  updateCategoryInput: UpdateCategoryInput;
}>;


export type UpdateCategoryMutation = { __typename?: 'Mutation', updateCategory: { __typename?: 'ProductCategory', id: string, name: string, description?: string | null, organizationId: string, createdAt: any, updatedAt: any, products?: Array<{ __typename?: 'Product', id: string, name: string, price: number }> | null } };

export type DeleteCategoryMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  organizationId: Scalars['ID']['input'];
}>;


export type DeleteCategoryMutation = { __typename?: 'Mutation', deleteCategory: boolean };

export type CreateClientMutationVariables = Exact<{
  createClientInput: CreateClientInput;
}>;


export type CreateClientMutation = { __typename?: 'Mutation', createClient: { __typename?: 'Client', id: string, email: string, fullName: string, phone: string, birthDate?: any | null, notes?: string | null, collaboratorId: string, organizationId: string, createdAt: any, updatedAt: any, collaborator?: { __typename?: 'Collaborator', id: string, fullName: string, email: string } | null } };

export type UpdateClientMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  updateClientInput: UpdateClientInput;
}>;


export type UpdateClientMutation = { __typename?: 'Mutation', updateClient: { __typename?: 'Client', id: string, email: string, fullName: string, phone: string, birthDate?: any | null, notes?: string | null, collaboratorId: string, organizationId: string, createdAt: any, updatedAt: any, collaborator?: { __typename?: 'Collaborator', id: string, fullName: string, email: string } | null } };

export type RemoveClientMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveClientMutation = { __typename?: 'Mutation', removeClient: { __typename?: 'Client', id: string, email: string, fullName: string } };

export type CreateCollaboratorMutationVariables = Exact<{
  createCollaboratorInput: CreateCollaboratorInput;
}>;


export type CreateCollaboratorMutation = { __typename?: 'Mutation', createCollaborator: { __typename?: 'Collaborator', id: string, email: string, fullName: string, role: UserRole, specialty?: string | null, phone?: string | null, address?: string | null, neighborhood?: string | null, zipCode?: string | null, profileImageUrl?: string | null, organizationId: string, createdAt: any, updatedAt: any } };

export type UpdateCollaboratorMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  updateCollaboratorInput: UpdateCollaboratorInput;
}>;


export type UpdateCollaboratorMutation = { __typename?: 'Mutation', updateCollaborator: { __typename?: 'Collaborator', id: string, email: string, fullName: string, role: UserRole, specialty?: string | null, phone?: string | null, address?: string | null, neighborhood?: string | null, zipCode?: string | null, profileImageUrl?: string | null, organizationId: string, createdAt: any, updatedAt: any } };

export type RemoveCollaboratorMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveCollaboratorMutation = { __typename?: 'Mutation', removeCollaborator: { __typename?: 'Collaborator', id: string, email: string, fullName: string } };

export type CreateOrganizationMutationVariables = Exact<{
  createOrganizationInput: CreateOrganizationInput;
}>;


export type CreateOrganizationMutation = { __typename?: 'Mutation', createOrganization: { __typename?: 'Organization', id: string, name: string, address?: string | null, city?: string | null, state?: string | null, neighborhood?: string | null, zipCode?: string | null, createdAt: any, updatedAt: any } };

export type UpdateOrganizationMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  updateOrganizationInput: UpdateOrganizationInput;
}>;


export type UpdateOrganizationMutation = { __typename?: 'Mutation', updateOrganization: { __typename?: 'Organization', id: string, name: string, address?: string | null, city?: string | null, state?: string | null, neighborhood?: string | null, zipCode?: string | null, createdAt: any, updatedAt: any } };

export type RemoveOrganizationMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveOrganizationMutation = { __typename?: 'Mutation', removeOrganization: { __typename?: 'Organization', id: string, name: string } };

export type CreateOrganizationAdminMutationVariables = Exact<{
  createOrganizationAdminInput: CreateOrganizationAdminInput;
}>;


export type CreateOrganizationAdminMutation = { __typename?: 'Mutation', createOrganizationAdmin: { __typename?: 'OrganizationAdmin', id: string, email: string, fullName: string, role: UserRole, address?: string | null, neighborhood?: string | null, zipCode?: string | null, phone?: string | null, organizationId: string, createdAt: any, updatedAt: any } };

export type UpdateOrganizationAdminMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  updateOrganizationAdminInput: UpdateOrganizationAdminInput;
}>;


export type UpdateOrganizationAdminMutation = { __typename?: 'Mutation', updateOrganizationAdmin: { __typename?: 'OrganizationAdmin', id: string, email: string, fullName: string, role: UserRole, address?: string | null, neighborhood?: string | null, zipCode?: string | null, phone?: string | null, organizationId: string, createdAt: any, updatedAt: any } };

export type RemoveOrganizationAdminMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveOrganizationAdminMutation = { __typename?: 'Mutation', removeOrganizationAdmin: { __typename?: 'OrganizationAdmin', id: string, email: string, fullName: string } };

export type CreateProductMutationVariables = Exact<{
  createProductInput: CreateProductInput;
  organizationId: Scalars['ID']['input'];
}>;


export type CreateProductMutation = { __typename?: 'Mutation', createProduct: { __typename?: 'Product', id: string, name: string, description?: string | null, price: number, organizationId: string, productCategoryId: string, supplierId: string, createdAt: any, updatedAt: any, productCategory: { __typename?: 'ProductCategory', id: string, name: string }, supplier: { __typename?: 'Supplier', id: string, name: string } } };

export type UpdateProductMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  organizationId: Scalars['ID']['input'];
  updateProductInput: UpdateProductInput;
}>;


export type UpdateProductMutation = { __typename?: 'Mutation', updateProduct: { __typename?: 'Product', id: string, name: string, description?: string | null, price: number, organizationId: string, productCategoryId: string, supplierId: string, createdAt: any, updatedAt: any, productCategory: { __typename?: 'ProductCategory', id: string, name: string }, supplier: { __typename?: 'Supplier', id: string, name: string } } };

export type DeleteProductMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  organizationId: Scalars['ID']['input'];
}>;


export type DeleteProductMutation = { __typename?: 'Mutation', deleteProduct: { __typename?: 'Product', id: string, name: string } };

export type AddProductToCategoryMutationVariables = Exact<{
  productId: Scalars['ID']['input'];
  categoryId: Scalars['ID']['input'];
  organizationId: Scalars['ID']['input'];
}>;


export type AddProductToCategoryMutation = { __typename?: 'Mutation', addProductToCategory: { __typename?: 'ProductCategory', id: string, name: string, description?: string | null, products?: Array<{ __typename?: 'Product', id: string, name: string, price: number }> | null } };

export type RemoveProductFromCategoryMutationVariables = Exact<{
  productId: Scalars['ID']['input'];
  categoryId: Scalars['ID']['input'];
  organizationId: Scalars['ID']['input'];
}>;


export type RemoveProductFromCategoryMutation = { __typename?: 'Mutation', removeProductFromCategory: { __typename?: 'ProductCategory', id: string, name: string, description?: string | null, products?: Array<{ __typename?: 'Product', id: string, name: string, price: number }> | null } };

export type CreateSaleMutationVariables = Exact<{
  createSaleInput: CreateSaleInput;
  organizationId: Scalars['ID']['input'];
}>;


export type CreateSaleMutation = { __typename?: 'Mutation', createSale: { __typename?: 'Sale', id: string, price: number, quantity: number, total: number, paymentMethod: string, paymentStatus: string, paymentDate: any, clientId: string, collaboratorId: string, productId: string, organizationId: string, createdAt: any, updatedAt: any, client: { __typename?: 'Client', id: string, fullName: string, email: string }, collaborator: { __typename?: 'Collaborator', id: string, fullName: string, email: string }, product: { __typename?: 'Product', id: string, name: string, price: number } } };

export type UpdateSaleMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  organizationId: Scalars['ID']['input'];
  updateSaleInput: UpdateSaleInput;
}>;


export type UpdateSaleMutation = { __typename?: 'Mutation', updateSale: { __typename?: 'Sale', id: string, price: number, quantity: number, total: number, paymentMethod: string, paymentStatus: string, paymentDate: any, clientId: string, collaboratorId: string, productId: string, organizationId: string, createdAt: any, updatedAt: any, client: { __typename?: 'Client', id: string, fullName: string, email: string }, collaborator: { __typename?: 'Collaborator', id: string, fullName: string, email: string }, product: { __typename?: 'Product', id: string, name: string, price: number } } };

export type DeleteSaleMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  organizationId: Scalars['ID']['input'];
}>;


export type DeleteSaleMutation = { __typename?: 'Mutation', deleteSale: boolean };

export type CreateSupplierMutationVariables = Exact<{
  createSupplierInput: CreateSupplierInput;
  organizationId: Scalars['ID']['input'];
}>;


export type CreateSupplierMutation = { __typename?: 'Mutation', createSupplier: { __typename?: 'Supplier', id: string, name: string, description?: string | null, createdAt: any, updatedAt: any, products?: Array<{ __typename?: 'Product', id: string, name: string, price: number }> | null } };

export type UpdateSupplierMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  organizationId: Scalars['ID']['input'];
  updateSupplierInput: UpdateSupplierInput;
}>;


export type UpdateSupplierMutation = { __typename?: 'Mutation', updateSupplier: { __typename?: 'Supplier', id: string, name: string, description?: string | null, createdAt: any, updatedAt: any, products?: Array<{ __typename?: 'Product', id: string, name: string, price: number }> | null } };

export type DeleteSupplierMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  organizationId: Scalars['ID']['input'];
}>;


export type DeleteSupplierMutation = { __typename?: 'Mutation', deleteSupplier: { __typename?: 'Supplier', id: string, name: string } };

export type GetCategoriesQueryVariables = Exact<{
  organizationId: Scalars['ID']['input'];
}>;


export type GetCategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'ProductCategory', id: string, name: string, description?: string | null, organizationId: string, createdAt: any, updatedAt: any, organization: { __typename?: 'Organization', id: string, name: string, createdAt: any, updatedAt: any }, products?: Array<{ __typename?: 'Product', id: string, name: string, description?: string | null, price: number, organizationId: string, productCategoryId: string, supplierId: string, createdAt: any, updatedAt: any, organization: { __typename?: 'Organization', id: string, name: string, createdAt: any, updatedAt: any }, productCategory: { __typename?: 'ProductCategory', id: string, name: string, description?: string | null, organizationId: string, createdAt: any, updatedAt: any, organization: { __typename?: 'Organization', id: string, name: string, createdAt: any, updatedAt: any } }, supplier: { __typename?: 'Supplier', id: string, name: string, description?: string | null, organizationId: string, createdAt: any, updatedAt: any, organization: { __typename?: 'Organization', id: string, name: string, createdAt: any, updatedAt: any } } }> | null }> };

export type GetCategoryQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  organizationId: Scalars['ID']['input'];
}>;


export type GetCategoryQuery = { __typename?: 'Query', category: { __typename?: 'ProductCategory', id: string, name: string, description?: string | null, organizationId: string, createdAt: any, updatedAt: any, organization: { __typename?: 'Organization', id: string, name: string, createdAt: any, updatedAt: any }, products?: Array<{ __typename?: 'Product', id: string, name: string, description?: string | null, price: number, organizationId: string, productCategoryId: string, supplierId: string, createdAt: any, updatedAt: any, organization: { __typename?: 'Organization', id: string, name: string, createdAt: any, updatedAt: any }, productCategory: { __typename?: 'ProductCategory', id: string, name: string, description?: string | null, organizationId: string, createdAt: any, updatedAt: any, organization: { __typename?: 'Organization', id: string, name: string, createdAt: any, updatedAt: any } }, supplier: { __typename?: 'Supplier', id: string, name: string, description?: string | null, organizationId: string, createdAt: any, updatedAt: any, organization: { __typename?: 'Organization', id: string, name: string, createdAt: any, updatedAt: any } } }> | null } };

export type GetClientsQueryVariables = Exact<{
  organizationId?: InputMaybe<Scalars['ID']['input']>;
  collaboratorId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetClientsQuery = { __typename?: 'Query', clients: Array<{ __typename?: 'Client', id: string, email: string, fullName: string, phone: string, birthDate?: any | null, notes?: string | null, collaboratorId: string, organizationId: string, createdAt: any, updatedAt: any, collaborator?: { __typename?: 'Collaborator', id: string, fullName: string, email: string, phone?: string | null, role: UserRole, organizationId: string, createdAt: any, updatedAt: any, organization?: { __typename?: 'Organization', id: string, name: string, createdAt: any, updatedAt: any } | null } | null, organization?: { __typename?: 'Organization', id: string, name: string, createdAt: any, updatedAt: any } | null }> };

export type GetClientQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetClientQuery = { __typename?: 'Query', client: { __typename?: 'Client', id: string, email: string, fullName: string, phone: string, birthDate?: any | null, notes?: string | null, collaboratorId: string, organizationId: string, createdAt: any, updatedAt: any, collaborator?: { __typename?: 'Collaborator', id: string, fullName: string, email: string, phone?: string | null, role: UserRole, organizationId: string, createdAt: any, updatedAt: any, organization?: { __typename?: 'Organization', id: string, name: string, createdAt: any, updatedAt: any } | null } | null, organization?: { __typename?: 'Organization', id: string, name: string, createdAt: any, updatedAt: any } | null } };

export type GetCollaboratorsQueryVariables = Exact<{
  organizationId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetCollaboratorsQuery = { __typename?: 'Query', collaborators: Array<{ __typename?: 'Collaborator', id: string, email: string, fullName: string, role: UserRole, specialty?: string | null, phone?: string | null, address?: string | null, neighborhood?: string | null, zipCode?: string | null, profileImageUrl?: string | null, organizationId: string, createdAt: any, updatedAt: any, organization?: { __typename?: 'Organization', id: string, name: string, createdAt: any, updatedAt: any } | null }> };

export type GetCollaboratorQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetCollaboratorQuery = { __typename?: 'Query', collaborator: { __typename?: 'Collaborator', id: string, email: string, fullName: string, role: UserRole, specialty?: string | null, phone?: string | null, address?: string | null, neighborhood?: string | null, zipCode?: string | null, profileImageUrl?: string | null, organizationId: string, createdAt: any, updatedAt: any, organization?: { __typename?: 'Organization', id: string, name: string, createdAt: any, updatedAt: any } | null, clients?: Array<{ __typename?: 'Client', id: string, email: string, fullName: string, phone: string, birthDate?: any | null, notes?: string | null, collaboratorId: string, organizationId: string, createdAt: any, updatedAt: any, collaborator?: { __typename?: 'Collaborator', id: string, fullName: string, email: string, phone?: string | null, role: UserRole, organizationId: string, createdAt: any, updatedAt: any, organization?: { __typename?: 'Organization', id: string, name: string, createdAt: any, updatedAt: any } | null } | null, organization?: { __typename?: 'Organization', id: string, name: string, createdAt: any, updatedAt: any } | null }> | null } };

export type GetDashboardStatsQueryVariables = Exact<{
  organizationId: Scalars['ID']['input'];
  period: DashboardPeriod;
}>;


export type GetDashboardStatsQuery = { __typename?: 'Query', dashboardStats: { __typename?: 'DashboardStats', revenue: { __typename?: 'RevenueStats', total: number, currentPeriod: number, previousPeriod: number, growthPercentage: number, growthTrend: GrowthTrend }, sales: { __typename?: 'SalesStats', total: number, currentPeriod: number, previousPeriod: number, growthPercentage: number, growthTrend: GrowthTrend }, clients: { __typename?: 'ClientStats', total: number, currentPeriod: number, previousPeriod: number, growthPercentage: number, growthTrend: GrowthTrend }, products: { __typename?: 'ProductStats', total: number, active: number, inactive: number } } };

export type GetSalesHistoryQueryVariables = Exact<{
  organizationId: Scalars['ID']['input'];
  startDate: Scalars['DateTime']['input'];
  endDate: Scalars['DateTime']['input'];
  groupBy: HistoryGroupBy;
}>;


export type GetSalesHistoryQuery = { __typename?: 'Query', salesHistory: Array<{ __typename?: 'SalesHistoryData', date: any, revenue: number, salesCount: number, clientsCount: number }> };

export type GetOrganizationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOrganizationsQuery = { __typename?: 'Query', organizations: Array<{ __typename?: 'Organization', id: string, name: string, address?: string | null, city?: string | null, state?: string | null, neighborhood?: string | null, zipCode?: string | null, createdAt: any, updatedAt: any }> };

export type GetOrganizationQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetOrganizationQuery = { __typename?: 'Query', organization: { __typename?: 'Organization', id: string, name: string, address?: string | null, city?: string | null, state?: string | null, neighborhood?: string | null, zipCode?: string | null, createdAt: any, updatedAt: any } };

export type GetOrganizationAdminsQueryVariables = Exact<{
  organizationId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetOrganizationAdminsQuery = { __typename?: 'Query', organizationAdmins: Array<{ __typename?: 'OrganizationAdmin', id: string, email: string, fullName: string, role: UserRole, address?: string | null, neighborhood?: string | null, zipCode?: string | null, phone?: string | null, organizationId: string, createdAt: any, updatedAt: any }> };

export type GetOrganizationAdminQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetOrganizationAdminQuery = { __typename?: 'Query', organizationAdmin: { __typename?: 'OrganizationAdmin', id: string, email: string, fullName: string, role: UserRole, address?: string | null, neighborhood?: string | null, zipCode?: string | null, phone?: string | null, organizationId: string, createdAt: any, updatedAt: any } };

export type GetProductsQueryVariables = Exact<{
  organizationId: Scalars['ID']['input'];
}>;


export type GetProductsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'Product', id: string, name: string, description?: string | null, price: number, organizationId: string, productCategoryId: string, supplierId: string, createdAt: any, updatedAt: any, organization: { __typename?: 'Organization', id: string, name: string, createdAt: any, updatedAt: any }, productCategory: { __typename?: 'ProductCategory', id: string, name: string, description?: string | null, organizationId: string, createdAt: any, updatedAt: any, organization: { __typename?: 'Organization', id: string, name: string, createdAt: any, updatedAt: any } }, supplier: { __typename?: 'Supplier', id: string, name: string, description?: string | null, organizationId: string, createdAt: any, updatedAt: any, organization: { __typename?: 'Organization', id: string, name: string, createdAt: any, updatedAt: any } } }> };

export type GetProductQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  organizationId: Scalars['ID']['input'];
}>;


export type GetProductQuery = { __typename?: 'Query', product: { __typename?: 'Product', id: string, name: string, description?: string | null, price: number, organizationId: string, productCategoryId: string, supplierId: string, createdAt: any, updatedAt: any, organization: { __typename?: 'Organization', id: string, name: string, createdAt: any, updatedAt: any }, productCategory: { __typename?: 'ProductCategory', id: string, name: string, description?: string | null, organizationId: string, createdAt: any, updatedAt: any, organization: { __typename?: 'Organization', id: string, name: string, createdAt: any, updatedAt: any } }, supplier: { __typename?: 'Supplier', id: string, name: string, description?: string | null, organizationId: string, createdAt: any, updatedAt: any, organization: { __typename?: 'Organization', id: string, name: string, createdAt: any, updatedAt: any } } } };

export type GetSalesQueryVariables = Exact<{
  organizationId: Scalars['ID']['input'];
}>;


export type GetSalesQuery = { __typename?: 'Query', sales: Array<{ __typename?: 'Sale', id: string, price: number, quantity: number, total: number, paymentMethod: string, paymentStatus: string, paymentDate: any, clientId: string, collaboratorId: string, productId: string, organizationId: string, createdAt: any, updatedAt: any, organization: { __typename?: 'Organization', id: string, name: string, createdAt: any, updatedAt: any }, client: { __typename?: 'Client', id: string, fullName: string, email: string, phone: string, collaboratorId: string, organizationId: string, createdAt: any, updatedAt: any, collaborator?: { __typename?: 'Collaborator', id: string, fullName: string, email: string, phone?: string | null, role: UserRole, organizationId: string, createdAt: any, updatedAt: any, organization?: { __typename?: 'Organization', id: string, name: string, createdAt: any, updatedAt: any } | null } | null, organization?: { __typename?: 'Organization', id: string, name: string, createdAt: any, updatedAt: any } | null }, collaborator: { __typename?: 'Collaborator', id: string, fullName: string, email: string, phone?: string | null, role: UserRole, organizationId: string, createdAt: any, updatedAt: any, organization?: { __typename?: 'Organization', id: string, name: string, createdAt: any, updatedAt: any } | null }, product: { __typename?: 'Product', id: string, name: string, description?: string | null, price: number, organizationId: string, productCategoryId: string, supplierId: string, createdAt: any, updatedAt: any, organization: { __typename?: 'Organization', id: string, name: string, createdAt: any, updatedAt: any }, productCategory: { __typename?: 'ProductCategory', id: string, name: string, description?: string | null, organizationId: string, createdAt: any, updatedAt: any, organization: { __typename?: 'Organization', id: string, name: string, createdAt: any, updatedAt: any } }, supplier: { __typename?: 'Supplier', id: string, name: string, description?: string | null, organizationId: string, createdAt: any, updatedAt: any, organization: { __typename?: 'Organization', id: string, name: string, createdAt: any, updatedAt: any } } } }> };

export type GetSaleQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  organizationId: Scalars['ID']['input'];
}>;


export type GetSaleQuery = { __typename?: 'Query', sale: { __typename?: 'Sale', id: string, price: number, quantity: number, total: number, paymentMethod: string, paymentStatus: string, paymentDate: any, clientId: string, collaboratorId: string, productId: string, organizationId: string, createdAt: any, updatedAt: any, organization: { __typename?: 'Organization', id: string, name: string, createdAt: any, updatedAt: any }, client: { __typename?: 'Client', id: string, fullName: string, email: string, phone: string, birthDate?: any | null, collaboratorId: string, organizationId: string, createdAt: any, updatedAt: any, collaborator?: { __typename?: 'Collaborator', id: string, fullName: string, email: string, phone?: string | null, role: UserRole, organizationId: string, createdAt: any, updatedAt: any, organization?: { __typename?: 'Organization', id: string, name: string, createdAt: any, updatedAt: any } | null } | null, organization?: { __typename?: 'Organization', id: string, name: string, createdAt: any, updatedAt: any } | null }, collaborator: { __typename?: 'Collaborator', id: string, fullName: string, email: string, phone?: string | null, specialty?: string | null, role: UserRole, organizationId: string, createdAt: any, updatedAt: any, organization?: { __typename?: 'Organization', id: string, name: string, createdAt: any, updatedAt: any } | null }, product: { __typename?: 'Product', id: string, name: string, description?: string | null, price: number, organizationId: string, productCategoryId: string, supplierId: string, createdAt: any, updatedAt: any, organization: { __typename?: 'Organization', id: string, name: string, createdAt: any, updatedAt: any }, productCategory: { __typename?: 'ProductCategory', id: string, name: string, description?: string | null, organizationId: string, createdAt: any, updatedAt: any, organization: { __typename?: 'Organization', id: string, name: string, createdAt: any, updatedAt: any } }, supplier: { __typename?: 'Supplier', id: string, name: string, description?: string | null, organizationId: string, createdAt: any, updatedAt: any, organization: { __typename?: 'Organization', id: string, name: string, createdAt: any, updatedAt: any } } } } };

export type GetSuppliersQueryVariables = Exact<{
  organizationId: Scalars['ID']['input'];
}>;


export type GetSuppliersQuery = { __typename?: 'Query', suppliers: Array<{ __typename?: 'Supplier', id: string, name: string, description?: string | null, organizationId: string, createdAt: any, updatedAt: any, organization: { __typename?: 'Organization', id: string, name: string, createdAt: any, updatedAt: any }, products?: Array<{ __typename?: 'Product', id: string, name: string, description?: string | null, price: number, organizationId: string, productCategoryId: string, supplierId: string, createdAt: any, updatedAt: any, organization: { __typename?: 'Organization', id: string, name: string, createdAt: any, updatedAt: any }, productCategory: { __typename?: 'ProductCategory', id: string, name: string, description?: string | null, organizationId: string, createdAt: any, updatedAt: any, organization: { __typename?: 'Organization', id: string, name: string, createdAt: any, updatedAt: any } }, supplier: { __typename?: 'Supplier', id: string, name: string, description?: string | null, organizationId: string, createdAt: any, updatedAt: any, organization: { __typename?: 'Organization', id: string, name: string, createdAt: any, updatedAt: any } } }> | null }> };

export type GetSupplierQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  organizationId: Scalars['ID']['input'];
}>;


export type GetSupplierQuery = { __typename?: 'Query', supplier: { __typename?: 'Supplier', id: string, name: string, description?: string | null, organizationId: string, createdAt: any, updatedAt: any, organization: { __typename?: 'Organization', id: string, name: string, createdAt: any, updatedAt: any }, products?: Array<{ __typename?: 'Product', id: string, name: string, description?: string | null, price: number, organizationId: string, productCategoryId: string, supplierId: string, createdAt: any, updatedAt: any, organization: { __typename?: 'Organization', id: string, name: string, createdAt: any, updatedAt: any }, productCategory: { __typename?: 'ProductCategory', id: string, name: string, description?: string | null, organizationId: string, createdAt: any, updatedAt: any, organization: { __typename?: 'Organization', id: string, name: string, createdAt: any, updatedAt: any } }, supplier: { __typename?: 'Supplier', id: string, name: string, description?: string | null, organizationId: string, createdAt: any, updatedAt: any, organization: { __typename?: 'Organization', id: string, name: string, createdAt: any, updatedAt: any } } }> | null } };


export const LoginDocument = gql`
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
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginInput: // value for 'loginInput'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const CreateCategoryDocument = gql`
    mutation CreateCategory($createCategoryInput: CreateCategoryInput!, $organizationId: ID!) {
  createCategory(
    createCategoryInput: $createCategoryInput
    organizationId: $organizationId
  ) {
    id
    name
    description
    organizationId
    createdAt
    updatedAt
    products {
      id
      name
      price
    }
  }
}
    `;
export type CreateCategoryMutationFn = Apollo.MutationFunction<CreateCategoryMutation, CreateCategoryMutationVariables>;

/**
 * __useCreateCategoryMutation__
 *
 * To run a mutation, you first call `useCreateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCategoryMutation, { data, loading, error }] = useCreateCategoryMutation({
 *   variables: {
 *      createCategoryInput: // value for 'createCategoryInput'
 *      organizationId: // value for 'organizationId'
 *   },
 * });
 */
export function useCreateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateCategoryMutation, CreateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCategoryMutation, CreateCategoryMutationVariables>(CreateCategoryDocument, options);
      }
export type CreateCategoryMutationHookResult = ReturnType<typeof useCreateCategoryMutation>;
export type CreateCategoryMutationResult = Apollo.MutationResult<CreateCategoryMutation>;
export type CreateCategoryMutationOptions = Apollo.BaseMutationOptions<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const UpdateCategoryDocument = gql`
    mutation UpdateCategory($id: ID!, $organizationId: ID!, $updateCategoryInput: UpdateCategoryInput!) {
  updateCategory(
    id: $id
    organizationId: $organizationId
    updateCategoryInput: $updateCategoryInput
  ) {
    id
    name
    description
    organizationId
    createdAt
    updatedAt
    products {
      id
      name
      price
    }
  }
}
    `;
export type UpdateCategoryMutationFn = Apollo.MutationFunction<UpdateCategoryMutation, UpdateCategoryMutationVariables>;

/**
 * __useUpdateCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCategoryMutation, { data, loading, error }] = useUpdateCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *      organizationId: // value for 'organizationId'
 *      updateCategoryInput: // value for 'updateCategoryInput'
 *   },
 * });
 */
export function useUpdateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCategoryMutation, UpdateCategoryMutationVariables>(UpdateCategoryDocument, options);
      }
export type UpdateCategoryMutationHookResult = ReturnType<typeof useUpdateCategoryMutation>;
export type UpdateCategoryMutationResult = Apollo.MutationResult<UpdateCategoryMutation>;
export type UpdateCategoryMutationOptions = Apollo.BaseMutationOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>;
export const DeleteCategoryDocument = gql`
    mutation DeleteCategory($id: ID!, $organizationId: ID!) {
  deleteCategory(id: $id, organizationId: $organizationId)
}
    `;
export type DeleteCategoryMutationFn = Apollo.MutationFunction<DeleteCategoryMutation, DeleteCategoryMutationVariables>;

/**
 * __useDeleteCategoryMutation__
 *
 * To run a mutation, you first call `useDeleteCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCategoryMutation, { data, loading, error }] = useDeleteCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *      organizationId: // value for 'organizationId'
 *   },
 * });
 */
export function useDeleteCategoryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCategoryMutation, DeleteCategoryMutationVariables>(DeleteCategoryDocument, options);
      }
export type DeleteCategoryMutationHookResult = ReturnType<typeof useDeleteCategoryMutation>;
export type DeleteCategoryMutationResult = Apollo.MutationResult<DeleteCategoryMutation>;
export type DeleteCategoryMutationOptions = Apollo.BaseMutationOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>;
export const CreateClientDocument = gql`
    mutation CreateClient($createClientInput: CreateClientInput!) {
  createClient(createClientInput: $createClientInput) {
    id
    email
    fullName
    phone
    birthDate
    notes
    collaboratorId
    organizationId
    createdAt
    updatedAt
    collaborator {
      id
      fullName
      email
    }
  }
}
    `;
export type CreateClientMutationFn = Apollo.MutationFunction<CreateClientMutation, CreateClientMutationVariables>;

/**
 * __useCreateClientMutation__
 *
 * To run a mutation, you first call `useCreateClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createClientMutation, { data, loading, error }] = useCreateClientMutation({
 *   variables: {
 *      createClientInput: // value for 'createClientInput'
 *   },
 * });
 */
export function useCreateClientMutation(baseOptions?: Apollo.MutationHookOptions<CreateClientMutation, CreateClientMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateClientMutation, CreateClientMutationVariables>(CreateClientDocument, options);
      }
export type CreateClientMutationHookResult = ReturnType<typeof useCreateClientMutation>;
export type CreateClientMutationResult = Apollo.MutationResult<CreateClientMutation>;
export type CreateClientMutationOptions = Apollo.BaseMutationOptions<CreateClientMutation, CreateClientMutationVariables>;
export const UpdateClientDocument = gql`
    mutation UpdateClient($id: ID!, $updateClientInput: UpdateClientInput!) {
  updateClient(id: $id, updateClientInput: $updateClientInput) {
    id
    email
    fullName
    phone
    birthDate
    notes
    collaboratorId
    organizationId
    createdAt
    updatedAt
    collaborator {
      id
      fullName
      email
    }
  }
}
    `;
export type UpdateClientMutationFn = Apollo.MutationFunction<UpdateClientMutation, UpdateClientMutationVariables>;

/**
 * __useUpdateClientMutation__
 *
 * To run a mutation, you first call `useUpdateClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateClientMutation, { data, loading, error }] = useUpdateClientMutation({
 *   variables: {
 *      id: // value for 'id'
 *      updateClientInput: // value for 'updateClientInput'
 *   },
 * });
 */
export function useUpdateClientMutation(baseOptions?: Apollo.MutationHookOptions<UpdateClientMutation, UpdateClientMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateClientMutation, UpdateClientMutationVariables>(UpdateClientDocument, options);
      }
export type UpdateClientMutationHookResult = ReturnType<typeof useUpdateClientMutation>;
export type UpdateClientMutationResult = Apollo.MutationResult<UpdateClientMutation>;
export type UpdateClientMutationOptions = Apollo.BaseMutationOptions<UpdateClientMutation, UpdateClientMutationVariables>;
export const RemoveClientDocument = gql`
    mutation RemoveClient($id: ID!) {
  removeClient(id: $id) {
    id
    email
    fullName
  }
}
    `;
export type RemoveClientMutationFn = Apollo.MutationFunction<RemoveClientMutation, RemoveClientMutationVariables>;

/**
 * __useRemoveClientMutation__
 *
 * To run a mutation, you first call `useRemoveClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeClientMutation, { data, loading, error }] = useRemoveClientMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveClientMutation(baseOptions?: Apollo.MutationHookOptions<RemoveClientMutation, RemoveClientMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveClientMutation, RemoveClientMutationVariables>(RemoveClientDocument, options);
      }
export type RemoveClientMutationHookResult = ReturnType<typeof useRemoveClientMutation>;
export type RemoveClientMutationResult = Apollo.MutationResult<RemoveClientMutation>;
export type RemoveClientMutationOptions = Apollo.BaseMutationOptions<RemoveClientMutation, RemoveClientMutationVariables>;
export const CreateCollaboratorDocument = gql`
    mutation CreateCollaborator($createCollaboratorInput: CreateCollaboratorInput!) {
  createCollaborator(createCollaboratorInput: $createCollaboratorInput) {
    id
    email
    fullName
    role
    specialty
    phone
    address
    neighborhood
    zipCode
    profileImageUrl
    organizationId
    createdAt
    updatedAt
  }
}
    `;
export type CreateCollaboratorMutationFn = Apollo.MutationFunction<CreateCollaboratorMutation, CreateCollaboratorMutationVariables>;

/**
 * __useCreateCollaboratorMutation__
 *
 * To run a mutation, you first call `useCreateCollaboratorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCollaboratorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCollaboratorMutation, { data, loading, error }] = useCreateCollaboratorMutation({
 *   variables: {
 *      createCollaboratorInput: // value for 'createCollaboratorInput'
 *   },
 * });
 */
export function useCreateCollaboratorMutation(baseOptions?: Apollo.MutationHookOptions<CreateCollaboratorMutation, CreateCollaboratorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCollaboratorMutation, CreateCollaboratorMutationVariables>(CreateCollaboratorDocument, options);
      }
export type CreateCollaboratorMutationHookResult = ReturnType<typeof useCreateCollaboratorMutation>;
export type CreateCollaboratorMutationResult = Apollo.MutationResult<CreateCollaboratorMutation>;
export type CreateCollaboratorMutationOptions = Apollo.BaseMutationOptions<CreateCollaboratorMutation, CreateCollaboratorMutationVariables>;
export const UpdateCollaboratorDocument = gql`
    mutation UpdateCollaborator($id: ID!, $updateCollaboratorInput: UpdateCollaboratorInput!) {
  updateCollaborator(id: $id, updateCollaboratorInput: $updateCollaboratorInput) {
    id
    email
    fullName
    role
    specialty
    phone
    address
    neighborhood
    zipCode
    profileImageUrl
    organizationId
    createdAt
    updatedAt
  }
}
    `;
export type UpdateCollaboratorMutationFn = Apollo.MutationFunction<UpdateCollaboratorMutation, UpdateCollaboratorMutationVariables>;

/**
 * __useUpdateCollaboratorMutation__
 *
 * To run a mutation, you first call `useUpdateCollaboratorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCollaboratorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCollaboratorMutation, { data, loading, error }] = useUpdateCollaboratorMutation({
 *   variables: {
 *      id: // value for 'id'
 *      updateCollaboratorInput: // value for 'updateCollaboratorInput'
 *   },
 * });
 */
export function useUpdateCollaboratorMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCollaboratorMutation, UpdateCollaboratorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCollaboratorMutation, UpdateCollaboratorMutationVariables>(UpdateCollaboratorDocument, options);
      }
export type UpdateCollaboratorMutationHookResult = ReturnType<typeof useUpdateCollaboratorMutation>;
export type UpdateCollaboratorMutationResult = Apollo.MutationResult<UpdateCollaboratorMutation>;
export type UpdateCollaboratorMutationOptions = Apollo.BaseMutationOptions<UpdateCollaboratorMutation, UpdateCollaboratorMutationVariables>;
export const RemoveCollaboratorDocument = gql`
    mutation RemoveCollaborator($id: ID!) {
  removeCollaborator(id: $id) {
    id
    email
    fullName
  }
}
    `;
export type RemoveCollaboratorMutationFn = Apollo.MutationFunction<RemoveCollaboratorMutation, RemoveCollaboratorMutationVariables>;

/**
 * __useRemoveCollaboratorMutation__
 *
 * To run a mutation, you first call `useRemoveCollaboratorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveCollaboratorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeCollaboratorMutation, { data, loading, error }] = useRemoveCollaboratorMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveCollaboratorMutation(baseOptions?: Apollo.MutationHookOptions<RemoveCollaboratorMutation, RemoveCollaboratorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveCollaboratorMutation, RemoveCollaboratorMutationVariables>(RemoveCollaboratorDocument, options);
      }
export type RemoveCollaboratorMutationHookResult = ReturnType<typeof useRemoveCollaboratorMutation>;
export type RemoveCollaboratorMutationResult = Apollo.MutationResult<RemoveCollaboratorMutation>;
export type RemoveCollaboratorMutationOptions = Apollo.BaseMutationOptions<RemoveCollaboratorMutation, RemoveCollaboratorMutationVariables>;
export const CreateOrganizationDocument = gql`
    mutation CreateOrganization($createOrganizationInput: CreateOrganizationInput!) {
  createOrganization(createOrganizationInput: $createOrganizationInput) {
    id
    name
    address
    city
    state
    neighborhood
    zipCode
    createdAt
    updatedAt
  }
}
    `;
export type CreateOrganizationMutationFn = Apollo.MutationFunction<CreateOrganizationMutation, CreateOrganizationMutationVariables>;

/**
 * __useCreateOrganizationMutation__
 *
 * To run a mutation, you first call `useCreateOrganizationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrganizationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrganizationMutation, { data, loading, error }] = useCreateOrganizationMutation({
 *   variables: {
 *      createOrganizationInput: // value for 'createOrganizationInput'
 *   },
 * });
 */
export function useCreateOrganizationMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrganizationMutation, CreateOrganizationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrganizationMutation, CreateOrganizationMutationVariables>(CreateOrganizationDocument, options);
      }
export type CreateOrganizationMutationHookResult = ReturnType<typeof useCreateOrganizationMutation>;
export type CreateOrganizationMutationResult = Apollo.MutationResult<CreateOrganizationMutation>;
export type CreateOrganizationMutationOptions = Apollo.BaseMutationOptions<CreateOrganizationMutation, CreateOrganizationMutationVariables>;
export const UpdateOrganizationDocument = gql`
    mutation UpdateOrganization($id: ID!, $updateOrganizationInput: UpdateOrganizationInput!) {
  updateOrganization(id: $id, updateOrganizationInput: $updateOrganizationInput) {
    id
    name
    address
    city
    state
    neighborhood
    zipCode
    createdAt
    updatedAt
  }
}
    `;
export type UpdateOrganizationMutationFn = Apollo.MutationFunction<UpdateOrganizationMutation, UpdateOrganizationMutationVariables>;

/**
 * __useUpdateOrganizationMutation__
 *
 * To run a mutation, you first call `useUpdateOrganizationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOrganizationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOrganizationMutation, { data, loading, error }] = useUpdateOrganizationMutation({
 *   variables: {
 *      id: // value for 'id'
 *      updateOrganizationInput: // value for 'updateOrganizationInput'
 *   },
 * });
 */
export function useUpdateOrganizationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOrganizationMutation, UpdateOrganizationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOrganizationMutation, UpdateOrganizationMutationVariables>(UpdateOrganizationDocument, options);
      }
export type UpdateOrganizationMutationHookResult = ReturnType<typeof useUpdateOrganizationMutation>;
export type UpdateOrganizationMutationResult = Apollo.MutationResult<UpdateOrganizationMutation>;
export type UpdateOrganizationMutationOptions = Apollo.BaseMutationOptions<UpdateOrganizationMutation, UpdateOrganizationMutationVariables>;
export const RemoveOrganizationDocument = gql`
    mutation RemoveOrganization($id: ID!) {
  removeOrganization(id: $id) {
    id
    name
  }
}
    `;
export type RemoveOrganizationMutationFn = Apollo.MutationFunction<RemoveOrganizationMutation, RemoveOrganizationMutationVariables>;

/**
 * __useRemoveOrganizationMutation__
 *
 * To run a mutation, you first call `useRemoveOrganizationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveOrganizationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeOrganizationMutation, { data, loading, error }] = useRemoveOrganizationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveOrganizationMutation(baseOptions?: Apollo.MutationHookOptions<RemoveOrganizationMutation, RemoveOrganizationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveOrganizationMutation, RemoveOrganizationMutationVariables>(RemoveOrganizationDocument, options);
      }
export type RemoveOrganizationMutationHookResult = ReturnType<typeof useRemoveOrganizationMutation>;
export type RemoveOrganizationMutationResult = Apollo.MutationResult<RemoveOrganizationMutation>;
export type RemoveOrganizationMutationOptions = Apollo.BaseMutationOptions<RemoveOrganizationMutation, RemoveOrganizationMutationVariables>;
export const CreateOrganizationAdminDocument = gql`
    mutation CreateOrganizationAdmin($createOrganizationAdminInput: CreateOrganizationAdminInput!) {
  createOrganizationAdmin(
    createOrganizationAdminInput: $createOrganizationAdminInput
  ) {
    id
    email
    fullName
    role
    address
    neighborhood
    zipCode
    phone
    organizationId
    createdAt
    updatedAt
  }
}
    `;
export type CreateOrganizationAdminMutationFn = Apollo.MutationFunction<CreateOrganizationAdminMutation, CreateOrganizationAdminMutationVariables>;

/**
 * __useCreateOrganizationAdminMutation__
 *
 * To run a mutation, you first call `useCreateOrganizationAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrganizationAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrganizationAdminMutation, { data, loading, error }] = useCreateOrganizationAdminMutation({
 *   variables: {
 *      createOrganizationAdminInput: // value for 'createOrganizationAdminInput'
 *   },
 * });
 */
export function useCreateOrganizationAdminMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrganizationAdminMutation, CreateOrganizationAdminMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrganizationAdminMutation, CreateOrganizationAdminMutationVariables>(CreateOrganizationAdminDocument, options);
      }
export type CreateOrganizationAdminMutationHookResult = ReturnType<typeof useCreateOrganizationAdminMutation>;
export type CreateOrganizationAdminMutationResult = Apollo.MutationResult<CreateOrganizationAdminMutation>;
export type CreateOrganizationAdminMutationOptions = Apollo.BaseMutationOptions<CreateOrganizationAdminMutation, CreateOrganizationAdminMutationVariables>;
export const UpdateOrganizationAdminDocument = gql`
    mutation UpdateOrganizationAdmin($id: ID!, $updateOrganizationAdminInput: UpdateOrganizationAdminInput!) {
  updateOrganizationAdmin(
    id: $id
    updateOrganizationAdminInput: $updateOrganizationAdminInput
  ) {
    id
    email
    fullName
    role
    address
    neighborhood
    zipCode
    phone
    organizationId
    createdAt
    updatedAt
  }
}
    `;
export type UpdateOrganizationAdminMutationFn = Apollo.MutationFunction<UpdateOrganizationAdminMutation, UpdateOrganizationAdminMutationVariables>;

/**
 * __useUpdateOrganizationAdminMutation__
 *
 * To run a mutation, you first call `useUpdateOrganizationAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOrganizationAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOrganizationAdminMutation, { data, loading, error }] = useUpdateOrganizationAdminMutation({
 *   variables: {
 *      id: // value for 'id'
 *      updateOrganizationAdminInput: // value for 'updateOrganizationAdminInput'
 *   },
 * });
 */
export function useUpdateOrganizationAdminMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOrganizationAdminMutation, UpdateOrganizationAdminMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOrganizationAdminMutation, UpdateOrganizationAdminMutationVariables>(UpdateOrganizationAdminDocument, options);
      }
export type UpdateOrganizationAdminMutationHookResult = ReturnType<typeof useUpdateOrganizationAdminMutation>;
export type UpdateOrganizationAdminMutationResult = Apollo.MutationResult<UpdateOrganizationAdminMutation>;
export type UpdateOrganizationAdminMutationOptions = Apollo.BaseMutationOptions<UpdateOrganizationAdminMutation, UpdateOrganizationAdminMutationVariables>;
export const RemoveOrganizationAdminDocument = gql`
    mutation RemoveOrganizationAdmin($id: ID!) {
  removeOrganizationAdmin(id: $id) {
    id
    email
    fullName
  }
}
    `;
export type RemoveOrganizationAdminMutationFn = Apollo.MutationFunction<RemoveOrganizationAdminMutation, RemoveOrganizationAdminMutationVariables>;

/**
 * __useRemoveOrganizationAdminMutation__
 *
 * To run a mutation, you first call `useRemoveOrganizationAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveOrganizationAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeOrganizationAdminMutation, { data, loading, error }] = useRemoveOrganizationAdminMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveOrganizationAdminMutation(baseOptions?: Apollo.MutationHookOptions<RemoveOrganizationAdminMutation, RemoveOrganizationAdminMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveOrganizationAdminMutation, RemoveOrganizationAdminMutationVariables>(RemoveOrganizationAdminDocument, options);
      }
export type RemoveOrganizationAdminMutationHookResult = ReturnType<typeof useRemoveOrganizationAdminMutation>;
export type RemoveOrganizationAdminMutationResult = Apollo.MutationResult<RemoveOrganizationAdminMutation>;
export type RemoveOrganizationAdminMutationOptions = Apollo.BaseMutationOptions<RemoveOrganizationAdminMutation, RemoveOrganizationAdminMutationVariables>;
export const CreateProductDocument = gql`
    mutation CreateProduct($createProductInput: CreateProductInput!, $organizationId: ID!) {
  createProduct(
    createProductInput: $createProductInput
    organizationId: $organizationId
  ) {
    id
    name
    description
    price
    organizationId
    productCategoryId
    supplierId
    createdAt
    updatedAt
    productCategory {
      id
      name
    }
    supplier {
      id
      name
    }
  }
}
    `;
export type CreateProductMutationFn = Apollo.MutationFunction<CreateProductMutation, CreateProductMutationVariables>;

/**
 * __useCreateProductMutation__
 *
 * To run a mutation, you first call `useCreateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductMutation, { data, loading, error }] = useCreateProductMutation({
 *   variables: {
 *      createProductInput: // value for 'createProductInput'
 *      organizationId: // value for 'organizationId'
 *   },
 * });
 */
export function useCreateProductMutation(baseOptions?: Apollo.MutationHookOptions<CreateProductMutation, CreateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProductMutation, CreateProductMutationVariables>(CreateProductDocument, options);
      }
export type CreateProductMutationHookResult = ReturnType<typeof useCreateProductMutation>;
export type CreateProductMutationResult = Apollo.MutationResult<CreateProductMutation>;
export type CreateProductMutationOptions = Apollo.BaseMutationOptions<CreateProductMutation, CreateProductMutationVariables>;
export const UpdateProductDocument = gql`
    mutation UpdateProduct($id: ID!, $organizationId: ID!, $updateProductInput: UpdateProductInput!) {
  updateProduct(
    id: $id
    organizationId: $organizationId
    updateProductInput: $updateProductInput
  ) {
    id
    name
    description
    price
    organizationId
    productCategoryId
    supplierId
    createdAt
    updatedAt
    productCategory {
      id
      name
    }
    supplier {
      id
      name
    }
  }
}
    `;
export type UpdateProductMutationFn = Apollo.MutationFunction<UpdateProductMutation, UpdateProductMutationVariables>;

/**
 * __useUpdateProductMutation__
 *
 * To run a mutation, you first call `useUpdateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductMutation, { data, loading, error }] = useUpdateProductMutation({
 *   variables: {
 *      id: // value for 'id'
 *      organizationId: // value for 'organizationId'
 *      updateProductInput: // value for 'updateProductInput'
 *   },
 * });
 */
export function useUpdateProductMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProductMutation, UpdateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProductMutation, UpdateProductMutationVariables>(UpdateProductDocument, options);
      }
export type UpdateProductMutationHookResult = ReturnType<typeof useUpdateProductMutation>;
export type UpdateProductMutationResult = Apollo.MutationResult<UpdateProductMutation>;
export type UpdateProductMutationOptions = Apollo.BaseMutationOptions<UpdateProductMutation, UpdateProductMutationVariables>;
export const DeleteProductDocument = gql`
    mutation DeleteProduct($id: ID!, $organizationId: ID!) {
  deleteProduct(id: $id, organizationId: $organizationId) {
    id
    name
  }
}
    `;
export type DeleteProductMutationFn = Apollo.MutationFunction<DeleteProductMutation, DeleteProductMutationVariables>;

/**
 * __useDeleteProductMutation__
 *
 * To run a mutation, you first call `useDeleteProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProductMutation, { data, loading, error }] = useDeleteProductMutation({
 *   variables: {
 *      id: // value for 'id'
 *      organizationId: // value for 'organizationId'
 *   },
 * });
 */
export function useDeleteProductMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProductMutation, DeleteProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProductMutation, DeleteProductMutationVariables>(DeleteProductDocument, options);
      }
export type DeleteProductMutationHookResult = ReturnType<typeof useDeleteProductMutation>;
export type DeleteProductMutationResult = Apollo.MutationResult<DeleteProductMutation>;
export type DeleteProductMutationOptions = Apollo.BaseMutationOptions<DeleteProductMutation, DeleteProductMutationVariables>;
export const AddProductToCategoryDocument = gql`
    mutation AddProductToCategory($productId: ID!, $categoryId: ID!, $organizationId: ID!) {
  addProductToCategory(
    productId: $productId
    categoryId: $categoryId
    organizationId: $organizationId
  ) {
    id
    name
    description
    products {
      id
      name
      price
    }
  }
}
    `;
export type AddProductToCategoryMutationFn = Apollo.MutationFunction<AddProductToCategoryMutation, AddProductToCategoryMutationVariables>;

/**
 * __useAddProductToCategoryMutation__
 *
 * To run a mutation, you first call `useAddProductToCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddProductToCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addProductToCategoryMutation, { data, loading, error }] = useAddProductToCategoryMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *      categoryId: // value for 'categoryId'
 *      organizationId: // value for 'organizationId'
 *   },
 * });
 */
export function useAddProductToCategoryMutation(baseOptions?: Apollo.MutationHookOptions<AddProductToCategoryMutation, AddProductToCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddProductToCategoryMutation, AddProductToCategoryMutationVariables>(AddProductToCategoryDocument, options);
      }
export type AddProductToCategoryMutationHookResult = ReturnType<typeof useAddProductToCategoryMutation>;
export type AddProductToCategoryMutationResult = Apollo.MutationResult<AddProductToCategoryMutation>;
export type AddProductToCategoryMutationOptions = Apollo.BaseMutationOptions<AddProductToCategoryMutation, AddProductToCategoryMutationVariables>;
export const RemoveProductFromCategoryDocument = gql`
    mutation RemoveProductFromCategory($productId: ID!, $categoryId: ID!, $organizationId: ID!) {
  removeProductFromCategory(
    productId: $productId
    categoryId: $categoryId
    organizationId: $organizationId
  ) {
    id
    name
    description
    products {
      id
      name
      price
    }
  }
}
    `;
export type RemoveProductFromCategoryMutationFn = Apollo.MutationFunction<RemoveProductFromCategoryMutation, RemoveProductFromCategoryMutationVariables>;

/**
 * __useRemoveProductFromCategoryMutation__
 *
 * To run a mutation, you first call `useRemoveProductFromCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveProductFromCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeProductFromCategoryMutation, { data, loading, error }] = useRemoveProductFromCategoryMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *      categoryId: // value for 'categoryId'
 *      organizationId: // value for 'organizationId'
 *   },
 * });
 */
export function useRemoveProductFromCategoryMutation(baseOptions?: Apollo.MutationHookOptions<RemoveProductFromCategoryMutation, RemoveProductFromCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveProductFromCategoryMutation, RemoveProductFromCategoryMutationVariables>(RemoveProductFromCategoryDocument, options);
      }
export type RemoveProductFromCategoryMutationHookResult = ReturnType<typeof useRemoveProductFromCategoryMutation>;
export type RemoveProductFromCategoryMutationResult = Apollo.MutationResult<RemoveProductFromCategoryMutation>;
export type RemoveProductFromCategoryMutationOptions = Apollo.BaseMutationOptions<RemoveProductFromCategoryMutation, RemoveProductFromCategoryMutationVariables>;
export const CreateSaleDocument = gql`
    mutation CreateSale($createSaleInput: CreateSaleInput!, $organizationId: ID!) {
  createSale(createSaleInput: $createSaleInput, organizationId: $organizationId) {
    id
    price
    quantity
    total
    paymentMethod
    paymentStatus
    paymentDate
    clientId
    collaboratorId
    productId
    organizationId
    createdAt
    updatedAt
    client {
      id
      fullName
      email
    }
    collaborator {
      id
      fullName
      email
    }
    product {
      id
      name
      price
    }
  }
}
    `;
export type CreateSaleMutationFn = Apollo.MutationFunction<CreateSaleMutation, CreateSaleMutationVariables>;

/**
 * __useCreateSaleMutation__
 *
 * To run a mutation, you first call `useCreateSaleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSaleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSaleMutation, { data, loading, error }] = useCreateSaleMutation({
 *   variables: {
 *      createSaleInput: // value for 'createSaleInput'
 *      organizationId: // value for 'organizationId'
 *   },
 * });
 */
export function useCreateSaleMutation(baseOptions?: Apollo.MutationHookOptions<CreateSaleMutation, CreateSaleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSaleMutation, CreateSaleMutationVariables>(CreateSaleDocument, options);
      }
export type CreateSaleMutationHookResult = ReturnType<typeof useCreateSaleMutation>;
export type CreateSaleMutationResult = Apollo.MutationResult<CreateSaleMutation>;
export type CreateSaleMutationOptions = Apollo.BaseMutationOptions<CreateSaleMutation, CreateSaleMutationVariables>;
export const UpdateSaleDocument = gql`
    mutation UpdateSale($id: ID!, $organizationId: ID!, $updateSaleInput: UpdateSaleInput!) {
  updateSale(
    id: $id
    organizationId: $organizationId
    updateSaleInput: $updateSaleInput
  ) {
    id
    price
    quantity
    total
    paymentMethod
    paymentStatus
    paymentDate
    clientId
    collaboratorId
    productId
    organizationId
    createdAt
    updatedAt
    client {
      id
      fullName
      email
    }
    collaborator {
      id
      fullName
      email
    }
    product {
      id
      name
      price
    }
  }
}
    `;
export type UpdateSaleMutationFn = Apollo.MutationFunction<UpdateSaleMutation, UpdateSaleMutationVariables>;

/**
 * __useUpdateSaleMutation__
 *
 * To run a mutation, you first call `useUpdateSaleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSaleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSaleMutation, { data, loading, error }] = useUpdateSaleMutation({
 *   variables: {
 *      id: // value for 'id'
 *      organizationId: // value for 'organizationId'
 *      updateSaleInput: // value for 'updateSaleInput'
 *   },
 * });
 */
export function useUpdateSaleMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSaleMutation, UpdateSaleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSaleMutation, UpdateSaleMutationVariables>(UpdateSaleDocument, options);
      }
export type UpdateSaleMutationHookResult = ReturnType<typeof useUpdateSaleMutation>;
export type UpdateSaleMutationResult = Apollo.MutationResult<UpdateSaleMutation>;
export type UpdateSaleMutationOptions = Apollo.BaseMutationOptions<UpdateSaleMutation, UpdateSaleMutationVariables>;
export const DeleteSaleDocument = gql`
    mutation DeleteSale($id: ID!, $organizationId: ID!) {
  deleteSale(id: $id, organizationId: $organizationId)
}
    `;
export type DeleteSaleMutationFn = Apollo.MutationFunction<DeleteSaleMutation, DeleteSaleMutationVariables>;

/**
 * __useDeleteSaleMutation__
 *
 * To run a mutation, you first call `useDeleteSaleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSaleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSaleMutation, { data, loading, error }] = useDeleteSaleMutation({
 *   variables: {
 *      id: // value for 'id'
 *      organizationId: // value for 'organizationId'
 *   },
 * });
 */
export function useDeleteSaleMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSaleMutation, DeleteSaleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSaleMutation, DeleteSaleMutationVariables>(DeleteSaleDocument, options);
      }
export type DeleteSaleMutationHookResult = ReturnType<typeof useDeleteSaleMutation>;
export type DeleteSaleMutationResult = Apollo.MutationResult<DeleteSaleMutation>;
export type DeleteSaleMutationOptions = Apollo.BaseMutationOptions<DeleteSaleMutation, DeleteSaleMutationVariables>;
export const CreateSupplierDocument = gql`
    mutation CreateSupplier($createSupplierInput: CreateSupplierInput!, $organizationId: ID!) {
  createSupplier(
    createSupplierInput: $createSupplierInput
    organizationId: $organizationId
  ) {
    id
    name
    description
    createdAt
    updatedAt
    products {
      id
      name
      price
    }
  }
}
    `;
export type CreateSupplierMutationFn = Apollo.MutationFunction<CreateSupplierMutation, CreateSupplierMutationVariables>;

/**
 * __useCreateSupplierMutation__
 *
 * To run a mutation, you first call `useCreateSupplierMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSupplierMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSupplierMutation, { data, loading, error }] = useCreateSupplierMutation({
 *   variables: {
 *      createSupplierInput: // value for 'createSupplierInput'
 *      organizationId: // value for 'organizationId'
 *   },
 * });
 */
export function useCreateSupplierMutation(baseOptions?: Apollo.MutationHookOptions<CreateSupplierMutation, CreateSupplierMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSupplierMutation, CreateSupplierMutationVariables>(CreateSupplierDocument, options);
      }
export type CreateSupplierMutationHookResult = ReturnType<typeof useCreateSupplierMutation>;
export type CreateSupplierMutationResult = Apollo.MutationResult<CreateSupplierMutation>;
export type CreateSupplierMutationOptions = Apollo.BaseMutationOptions<CreateSupplierMutation, CreateSupplierMutationVariables>;
export const UpdateSupplierDocument = gql`
    mutation UpdateSupplier($id: ID!, $organizationId: ID!, $updateSupplierInput: UpdateSupplierInput!) {
  updateSupplier(
    id: $id
    organizationId: $organizationId
    updateSupplierInput: $updateSupplierInput
  ) {
    id
    name
    description
    createdAt
    updatedAt
    products {
      id
      name
      price
    }
  }
}
    `;
export type UpdateSupplierMutationFn = Apollo.MutationFunction<UpdateSupplierMutation, UpdateSupplierMutationVariables>;

/**
 * __useUpdateSupplierMutation__
 *
 * To run a mutation, you first call `useUpdateSupplierMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSupplierMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSupplierMutation, { data, loading, error }] = useUpdateSupplierMutation({
 *   variables: {
 *      id: // value for 'id'
 *      organizationId: // value for 'organizationId'
 *      updateSupplierInput: // value for 'updateSupplierInput'
 *   },
 * });
 */
export function useUpdateSupplierMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSupplierMutation, UpdateSupplierMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSupplierMutation, UpdateSupplierMutationVariables>(UpdateSupplierDocument, options);
      }
export type UpdateSupplierMutationHookResult = ReturnType<typeof useUpdateSupplierMutation>;
export type UpdateSupplierMutationResult = Apollo.MutationResult<UpdateSupplierMutation>;
export type UpdateSupplierMutationOptions = Apollo.BaseMutationOptions<UpdateSupplierMutation, UpdateSupplierMutationVariables>;
export const DeleteSupplierDocument = gql`
    mutation DeleteSupplier($id: ID!, $organizationId: ID!) {
  deleteSupplier(id: $id, organizationId: $organizationId) {
    id
    name
  }
}
    `;
export type DeleteSupplierMutationFn = Apollo.MutationFunction<DeleteSupplierMutation, DeleteSupplierMutationVariables>;

/**
 * __useDeleteSupplierMutation__
 *
 * To run a mutation, you first call `useDeleteSupplierMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSupplierMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSupplierMutation, { data, loading, error }] = useDeleteSupplierMutation({
 *   variables: {
 *      id: // value for 'id'
 *      organizationId: // value for 'organizationId'
 *   },
 * });
 */
export function useDeleteSupplierMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSupplierMutation, DeleteSupplierMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSupplierMutation, DeleteSupplierMutationVariables>(DeleteSupplierDocument, options);
      }
export type DeleteSupplierMutationHookResult = ReturnType<typeof useDeleteSupplierMutation>;
export type DeleteSupplierMutationResult = Apollo.MutationResult<DeleteSupplierMutation>;
export type DeleteSupplierMutationOptions = Apollo.BaseMutationOptions<DeleteSupplierMutation, DeleteSupplierMutationVariables>;
export const GetCategoriesDocument = gql`
    query GetCategories($organizationId: ID!) {
  categories(organizationId: $organizationId) {
    id
    name
    description
    organizationId
    createdAt
    updatedAt
    organization {
      id
      name
      createdAt
      updatedAt
    }
    products {
      id
      name
      description
      price
      organizationId
      productCategoryId
      supplierId
      createdAt
      updatedAt
      organization {
        id
        name
        createdAt
        updatedAt
      }
      productCategory {
        id
        name
        description
        organizationId
        createdAt
        updatedAt
        organization {
          id
          name
          createdAt
          updatedAt
        }
      }
      supplier {
        id
        name
        description
        organizationId
        createdAt
        updatedAt
        organization {
          id
          name
          createdAt
          updatedAt
        }
      }
    }
  }
}
    `;

/**
 * __useGetCategoriesQuery__
 *
 * To run a query within a React component, call `useGetCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesQuery({
 *   variables: {
 *      organizationId: // value for 'organizationId'
 *   },
 * });
 */
export function useGetCategoriesQuery(baseOptions: Apollo.QueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
      }
export function useGetCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
        }
export type GetCategoriesQueryHookResult = ReturnType<typeof useGetCategoriesQuery>;
export type GetCategoriesLazyQueryHookResult = ReturnType<typeof useGetCategoriesLazyQuery>;
export type GetCategoriesQueryResult = Apollo.QueryResult<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const GetCategoryDocument = gql`
    query GetCategory($id: ID!, $organizationId: ID!) {
  category(id: $id, organizationId: $organizationId) {
    id
    name
    description
    organizationId
    createdAt
    updatedAt
    organization {
      id
      name
      createdAt
      updatedAt
    }
    products {
      id
      name
      description
      price
      organizationId
      productCategoryId
      supplierId
      createdAt
      updatedAt
      organization {
        id
        name
        createdAt
        updatedAt
      }
      productCategory {
        id
        name
        description
        organizationId
        createdAt
        updatedAt
        organization {
          id
          name
          createdAt
          updatedAt
        }
      }
      supplier {
        id
        name
        description
        organizationId
        createdAt
        updatedAt
        organization {
          id
          name
          createdAt
          updatedAt
        }
      }
    }
  }
}
    `;

/**
 * __useGetCategoryQuery__
 *
 * To run a query within a React component, call `useGetCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoryQuery({
 *   variables: {
 *      id: // value for 'id'
 *      organizationId: // value for 'organizationId'
 *   },
 * });
 */
export function useGetCategoryQuery(baseOptions: Apollo.QueryHookOptions<GetCategoryQuery, GetCategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoryQuery, GetCategoryQueryVariables>(GetCategoryDocument, options);
      }
export function useGetCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoryQuery, GetCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoryQuery, GetCategoryQueryVariables>(GetCategoryDocument, options);
        }
export type GetCategoryQueryHookResult = ReturnType<typeof useGetCategoryQuery>;
export type GetCategoryLazyQueryHookResult = ReturnType<typeof useGetCategoryLazyQuery>;
export type GetCategoryQueryResult = Apollo.QueryResult<GetCategoryQuery, GetCategoryQueryVariables>;
export const GetClientsDocument = gql`
    query GetClients($organizationId: ID, $collaboratorId: ID) {
  clients(organizationId: $organizationId, collaboratorId: $collaboratorId) {
    id
    email
    fullName
    phone
    birthDate
    notes
    collaboratorId
    organizationId
    createdAt
    updatedAt
    collaborator {
      id
      fullName
      email
      phone
      role
      organizationId
      createdAt
      updatedAt
      organization {
        id
        name
        createdAt
        updatedAt
      }
    }
    organization {
      id
      name
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useGetClientsQuery__
 *
 * To run a query within a React component, call `useGetClientsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetClientsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetClientsQuery({
 *   variables: {
 *      organizationId: // value for 'organizationId'
 *      collaboratorId: // value for 'collaboratorId'
 *   },
 * });
 */
export function useGetClientsQuery(baseOptions?: Apollo.QueryHookOptions<GetClientsQuery, GetClientsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetClientsQuery, GetClientsQueryVariables>(GetClientsDocument, options);
      }
export function useGetClientsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetClientsQuery, GetClientsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetClientsQuery, GetClientsQueryVariables>(GetClientsDocument, options);
        }
export type GetClientsQueryHookResult = ReturnType<typeof useGetClientsQuery>;
export type GetClientsLazyQueryHookResult = ReturnType<typeof useGetClientsLazyQuery>;
export type GetClientsQueryResult = Apollo.QueryResult<GetClientsQuery, GetClientsQueryVariables>;
export const GetClientDocument = gql`
    query GetClient($id: ID!) {
  client(id: $id) {
    id
    email
    fullName
    phone
    birthDate
    notes
    collaboratorId
    organizationId
    createdAt
    updatedAt
    collaborator {
      id
      fullName
      email
      phone
      role
      organizationId
      createdAt
      updatedAt
      organization {
        id
        name
        createdAt
        updatedAt
      }
    }
    organization {
      id
      name
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useGetClientQuery__
 *
 * To run a query within a React component, call `useGetClientQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetClientQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetClientQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetClientQuery(baseOptions: Apollo.QueryHookOptions<GetClientQuery, GetClientQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetClientQuery, GetClientQueryVariables>(GetClientDocument, options);
      }
export function useGetClientLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetClientQuery, GetClientQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetClientQuery, GetClientQueryVariables>(GetClientDocument, options);
        }
export type GetClientQueryHookResult = ReturnType<typeof useGetClientQuery>;
export type GetClientLazyQueryHookResult = ReturnType<typeof useGetClientLazyQuery>;
export type GetClientQueryResult = Apollo.QueryResult<GetClientQuery, GetClientQueryVariables>;
export const GetCollaboratorsDocument = gql`
    query GetCollaborators($organizationId: ID) {
  collaborators(organizationId: $organizationId) {
    id
    email
    fullName
    role
    specialty
    phone
    address
    neighborhood
    zipCode
    profileImageUrl
    organizationId
    createdAt
    updatedAt
    organization {
      id
      name
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useGetCollaboratorsQuery__
 *
 * To run a query within a React component, call `useGetCollaboratorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCollaboratorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCollaboratorsQuery({
 *   variables: {
 *      organizationId: // value for 'organizationId'
 *   },
 * });
 */
export function useGetCollaboratorsQuery(baseOptions?: Apollo.QueryHookOptions<GetCollaboratorsQuery, GetCollaboratorsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCollaboratorsQuery, GetCollaboratorsQueryVariables>(GetCollaboratorsDocument, options);
      }
export function useGetCollaboratorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCollaboratorsQuery, GetCollaboratorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCollaboratorsQuery, GetCollaboratorsQueryVariables>(GetCollaboratorsDocument, options);
        }
export type GetCollaboratorsQueryHookResult = ReturnType<typeof useGetCollaboratorsQuery>;
export type GetCollaboratorsLazyQueryHookResult = ReturnType<typeof useGetCollaboratorsLazyQuery>;
export type GetCollaboratorsQueryResult = Apollo.QueryResult<GetCollaboratorsQuery, GetCollaboratorsQueryVariables>;
export const GetCollaboratorDocument = gql`
    query GetCollaborator($id: ID!) {
  collaborator(id: $id) {
    id
    email
    fullName
    role
    specialty
    phone
    address
    neighborhood
    zipCode
    profileImageUrl
    organizationId
    createdAt
    updatedAt
    organization {
      id
      name
      createdAt
      updatedAt
    }
    clients {
      id
      email
      fullName
      phone
      birthDate
      notes
      collaboratorId
      organizationId
      createdAt
      updatedAt
      collaborator {
        id
        fullName
        email
        phone
        role
        organizationId
        createdAt
        updatedAt
        organization {
          id
          name
          createdAt
          updatedAt
        }
      }
      organization {
        id
        name
        createdAt
        updatedAt
      }
    }
  }
}
    `;

/**
 * __useGetCollaboratorQuery__
 *
 * To run a query within a React component, call `useGetCollaboratorQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCollaboratorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCollaboratorQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCollaboratorQuery(baseOptions: Apollo.QueryHookOptions<GetCollaboratorQuery, GetCollaboratorQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCollaboratorQuery, GetCollaboratorQueryVariables>(GetCollaboratorDocument, options);
      }
export function useGetCollaboratorLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCollaboratorQuery, GetCollaboratorQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCollaboratorQuery, GetCollaboratorQueryVariables>(GetCollaboratorDocument, options);
        }
export type GetCollaboratorQueryHookResult = ReturnType<typeof useGetCollaboratorQuery>;
export type GetCollaboratorLazyQueryHookResult = ReturnType<typeof useGetCollaboratorLazyQuery>;
export type GetCollaboratorQueryResult = Apollo.QueryResult<GetCollaboratorQuery, GetCollaboratorQueryVariables>;
export const GetDashboardStatsDocument = gql`
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
 * __useGetDashboardStatsQuery__
 *
 * To run a query within a React component, call `useGetDashboardStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDashboardStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDashboardStatsQuery({
 *   variables: {
 *      organizationId: // value for 'organizationId'
 *      period: // value for 'period'
 *   },
 * });
 */
export function useGetDashboardStatsQuery(baseOptions: Apollo.QueryHookOptions<GetDashboardStatsQuery, GetDashboardStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDashboardStatsQuery, GetDashboardStatsQueryVariables>(GetDashboardStatsDocument, options);
      }
export function useGetDashboardStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDashboardStatsQuery, GetDashboardStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDashboardStatsQuery, GetDashboardStatsQueryVariables>(GetDashboardStatsDocument, options);
        }
export type GetDashboardStatsQueryHookResult = ReturnType<typeof useGetDashboardStatsQuery>;
export type GetDashboardStatsLazyQueryHookResult = ReturnType<typeof useGetDashboardStatsLazyQuery>;
export type GetDashboardStatsQueryResult = Apollo.QueryResult<GetDashboardStatsQuery, GetDashboardStatsQueryVariables>;
export const GetSalesHistoryDocument = gql`
    query GetSalesHistory($organizationId: ID!, $startDate: DateTime!, $endDate: DateTime!, $groupBy: HistoryGroupBy!) {
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

/**
 * __useGetSalesHistoryQuery__
 *
 * To run a query within a React component, call `useGetSalesHistoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSalesHistoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSalesHistoryQuery({
 *   variables: {
 *      organizationId: // value for 'organizationId'
 *      startDate: // value for 'startDate'
 *      endDate: // value for 'endDate'
 *      groupBy: // value for 'groupBy'
 *   },
 * });
 */
export function useGetSalesHistoryQuery(baseOptions: Apollo.QueryHookOptions<GetSalesHistoryQuery, GetSalesHistoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSalesHistoryQuery, GetSalesHistoryQueryVariables>(GetSalesHistoryDocument, options);
      }
export function useGetSalesHistoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSalesHistoryQuery, GetSalesHistoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSalesHistoryQuery, GetSalesHistoryQueryVariables>(GetSalesHistoryDocument, options);
        }
export type GetSalesHistoryQueryHookResult = ReturnType<typeof useGetSalesHistoryQuery>;
export type GetSalesHistoryLazyQueryHookResult = ReturnType<typeof useGetSalesHistoryLazyQuery>;
export type GetSalesHistoryQueryResult = Apollo.QueryResult<GetSalesHistoryQuery, GetSalesHistoryQueryVariables>;
export const GetOrganizationsDocument = gql`
    query GetOrganizations {
  organizations {
    id
    name
    address
    city
    state
    neighborhood
    zipCode
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetOrganizationsQuery__
 *
 * To run a query within a React component, call `useGetOrganizationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrganizationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrganizationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetOrganizationsQuery(baseOptions?: Apollo.QueryHookOptions<GetOrganizationsQuery, GetOrganizationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrganizationsQuery, GetOrganizationsQueryVariables>(GetOrganizationsDocument, options);
      }
export function useGetOrganizationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrganizationsQuery, GetOrganizationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrganizationsQuery, GetOrganizationsQueryVariables>(GetOrganizationsDocument, options);
        }
export type GetOrganizationsQueryHookResult = ReturnType<typeof useGetOrganizationsQuery>;
export type GetOrganizationsLazyQueryHookResult = ReturnType<typeof useGetOrganizationsLazyQuery>;
export type GetOrganizationsQueryResult = Apollo.QueryResult<GetOrganizationsQuery, GetOrganizationsQueryVariables>;
export const GetOrganizationDocument = gql`
    query GetOrganization($id: ID!) {
  organization(id: $id) {
    id
    name
    address
    city
    state
    neighborhood
    zipCode
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetOrganizationQuery__
 *
 * To run a query within a React component, call `useGetOrganizationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrganizationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrganizationQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetOrganizationQuery(baseOptions: Apollo.QueryHookOptions<GetOrganizationQuery, GetOrganizationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrganizationQuery, GetOrganizationQueryVariables>(GetOrganizationDocument, options);
      }
export function useGetOrganizationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrganizationQuery, GetOrganizationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrganizationQuery, GetOrganizationQueryVariables>(GetOrganizationDocument, options);
        }
export type GetOrganizationQueryHookResult = ReturnType<typeof useGetOrganizationQuery>;
export type GetOrganizationLazyQueryHookResult = ReturnType<typeof useGetOrganizationLazyQuery>;
export type GetOrganizationQueryResult = Apollo.QueryResult<GetOrganizationQuery, GetOrganizationQueryVariables>;
export const GetOrganizationAdminsDocument = gql`
    query GetOrganizationAdmins($organizationId: ID) {
  organizationAdmins(organizationId: $organizationId) {
    id
    email
    fullName
    role
    address
    neighborhood
    zipCode
    phone
    organizationId
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetOrganizationAdminsQuery__
 *
 * To run a query within a React component, call `useGetOrganizationAdminsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrganizationAdminsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrganizationAdminsQuery({
 *   variables: {
 *      organizationId: // value for 'organizationId'
 *   },
 * });
 */
export function useGetOrganizationAdminsQuery(baseOptions?: Apollo.QueryHookOptions<GetOrganizationAdminsQuery, GetOrganizationAdminsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrganizationAdminsQuery, GetOrganizationAdminsQueryVariables>(GetOrganizationAdminsDocument, options);
      }
export function useGetOrganizationAdminsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrganizationAdminsQuery, GetOrganizationAdminsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrganizationAdminsQuery, GetOrganizationAdminsQueryVariables>(GetOrganizationAdminsDocument, options);
        }
export type GetOrganizationAdminsQueryHookResult = ReturnType<typeof useGetOrganizationAdminsQuery>;
export type GetOrganizationAdminsLazyQueryHookResult = ReturnType<typeof useGetOrganizationAdminsLazyQuery>;
export type GetOrganizationAdminsQueryResult = Apollo.QueryResult<GetOrganizationAdminsQuery, GetOrganizationAdminsQueryVariables>;
export const GetOrganizationAdminDocument = gql`
    query GetOrganizationAdmin($id: ID!) {
  organizationAdmin(id: $id) {
    id
    email
    fullName
    role
    address
    neighborhood
    zipCode
    phone
    organizationId
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetOrganizationAdminQuery__
 *
 * To run a query within a React component, call `useGetOrganizationAdminQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrganizationAdminQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrganizationAdminQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetOrganizationAdminQuery(baseOptions: Apollo.QueryHookOptions<GetOrganizationAdminQuery, GetOrganizationAdminQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrganizationAdminQuery, GetOrganizationAdminQueryVariables>(GetOrganizationAdminDocument, options);
      }
export function useGetOrganizationAdminLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrganizationAdminQuery, GetOrganizationAdminQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrganizationAdminQuery, GetOrganizationAdminQueryVariables>(GetOrganizationAdminDocument, options);
        }
export type GetOrganizationAdminQueryHookResult = ReturnType<typeof useGetOrganizationAdminQuery>;
export type GetOrganizationAdminLazyQueryHookResult = ReturnType<typeof useGetOrganizationAdminLazyQuery>;
export type GetOrganizationAdminQueryResult = Apollo.QueryResult<GetOrganizationAdminQuery, GetOrganizationAdminQueryVariables>;
export const GetProductsDocument = gql`
    query GetProducts($organizationId: ID!) {
  products(organizationId: $organizationId) {
    id
    name
    description
    price
    organizationId
    productCategoryId
    supplierId
    createdAt
    updatedAt
    organization {
      id
      name
      createdAt
      updatedAt
    }
    productCategory {
      id
      name
      description
      organizationId
      createdAt
      updatedAt
      organization {
        id
        name
        createdAt
        updatedAt
      }
    }
    supplier {
      id
      name
      description
      organizationId
      createdAt
      updatedAt
      organization {
        id
        name
        createdAt
        updatedAt
      }
    }
  }
}
    `;

/**
 * __useGetProductsQuery__
 *
 * To run a query within a React component, call `useGetProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductsQuery({
 *   variables: {
 *      organizationId: // value for 'organizationId'
 *   },
 * });
 */
export function useGetProductsQuery(baseOptions: Apollo.QueryHookOptions<GetProductsQuery, GetProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument, options);
      }
export function useGetProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductsQuery, GetProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument, options);
        }
export type GetProductsQueryHookResult = ReturnType<typeof useGetProductsQuery>;
export type GetProductsLazyQueryHookResult = ReturnType<typeof useGetProductsLazyQuery>;
export type GetProductsQueryResult = Apollo.QueryResult<GetProductsQuery, GetProductsQueryVariables>;
export const GetProductDocument = gql`
    query GetProduct($id: ID!, $organizationId: ID!) {
  product(id: $id, organizationId: $organizationId) {
    id
    name
    description
    price
    organizationId
    productCategoryId
    supplierId
    createdAt
    updatedAt
    organization {
      id
      name
      createdAt
      updatedAt
    }
    productCategory {
      id
      name
      description
      organizationId
      createdAt
      updatedAt
      organization {
        id
        name
        createdAt
        updatedAt
      }
    }
    supplier {
      id
      name
      description
      organizationId
      createdAt
      updatedAt
      organization {
        id
        name
        createdAt
        updatedAt
      }
    }
  }
}
    `;

/**
 * __useGetProductQuery__
 *
 * To run a query within a React component, call `useGetProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductQuery({
 *   variables: {
 *      id: // value for 'id'
 *      organizationId: // value for 'organizationId'
 *   },
 * });
 */
export function useGetProductQuery(baseOptions: Apollo.QueryHookOptions<GetProductQuery, GetProductQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductQuery, GetProductQueryVariables>(GetProductDocument, options);
      }
export function useGetProductLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductQuery, GetProductQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductQuery, GetProductQueryVariables>(GetProductDocument, options);
        }
export type GetProductQueryHookResult = ReturnType<typeof useGetProductQuery>;
export type GetProductLazyQueryHookResult = ReturnType<typeof useGetProductLazyQuery>;
export type GetProductQueryResult = Apollo.QueryResult<GetProductQuery, GetProductQueryVariables>;
export const GetSalesDocument = gql`
    query GetSales($organizationId: ID!) {
  sales(organizationId: $organizationId) {
    id
    price
    quantity
    total
    paymentMethod
    paymentStatus
    paymentDate
    clientId
    collaboratorId
    productId
    organizationId
    createdAt
    updatedAt
    organization {
      id
      name
      createdAt
      updatedAt
    }
    client {
      id
      fullName
      email
      phone
      collaboratorId
      organizationId
      createdAt
      updatedAt
      collaborator {
        id
        fullName
        email
        phone
        role
        organizationId
        createdAt
        updatedAt
        organization {
          id
          name
          createdAt
          updatedAt
        }
      }
      organization {
        id
        name
        createdAt
        updatedAt
      }
    }
    collaborator {
      id
      fullName
      email
      phone
      role
      organizationId
      createdAt
      updatedAt
      organization {
        id
        name
        createdAt
        updatedAt
      }
    }
    product {
      id
      name
      description
      price
      organizationId
      productCategoryId
      supplierId
      createdAt
      updatedAt
      organization {
        id
        name
        createdAt
        updatedAt
      }
      productCategory {
        id
        name
        description
        organizationId
        createdAt
        updatedAt
        organization {
          id
          name
          createdAt
          updatedAt
        }
      }
      supplier {
        id
        name
        description
        organizationId
        createdAt
        updatedAt
        organization {
          id
          name
          createdAt
          updatedAt
        }
      }
    }
  }
}
    `;

/**
 * __useGetSalesQuery__
 *
 * To run a query within a React component, call `useGetSalesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSalesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSalesQuery({
 *   variables: {
 *      organizationId: // value for 'organizationId'
 *   },
 * });
 */
export function useGetSalesQuery(baseOptions: Apollo.QueryHookOptions<GetSalesQuery, GetSalesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSalesQuery, GetSalesQueryVariables>(GetSalesDocument, options);
      }
export function useGetSalesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSalesQuery, GetSalesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSalesQuery, GetSalesQueryVariables>(GetSalesDocument, options);
        }
export type GetSalesQueryHookResult = ReturnType<typeof useGetSalesQuery>;
export type GetSalesLazyQueryHookResult = ReturnType<typeof useGetSalesLazyQuery>;
export type GetSalesQueryResult = Apollo.QueryResult<GetSalesQuery, GetSalesQueryVariables>;
export const GetSaleDocument = gql`
    query GetSale($id: ID!, $organizationId: ID!) {
  sale(id: $id, organizationId: $organizationId) {
    id
    price
    quantity
    total
    paymentMethod
    paymentStatus
    paymentDate
    clientId
    collaboratorId
    productId
    organizationId
    createdAt
    updatedAt
    organization {
      id
      name
      createdAt
      updatedAt
    }
    client {
      id
      fullName
      email
      phone
      birthDate
      collaboratorId
      organizationId
      createdAt
      updatedAt
      collaborator {
        id
        fullName
        email
        phone
        role
        organizationId
        createdAt
        updatedAt
        organization {
          id
          name
          createdAt
          updatedAt
        }
      }
      organization {
        id
        name
        createdAt
        updatedAt
      }
    }
    collaborator {
      id
      fullName
      email
      phone
      specialty
      role
      organizationId
      createdAt
      updatedAt
      organization {
        id
        name
        createdAt
        updatedAt
      }
    }
    product {
      id
      name
      description
      price
      organizationId
      productCategoryId
      supplierId
      createdAt
      updatedAt
      organization {
        id
        name
        createdAt
        updatedAt
      }
      productCategory {
        id
        name
        description
        organizationId
        createdAt
        updatedAt
        organization {
          id
          name
          createdAt
          updatedAt
        }
      }
      supplier {
        id
        name
        description
        organizationId
        createdAt
        updatedAt
        organization {
          id
          name
          createdAt
          updatedAt
        }
      }
    }
  }
}
    `;

/**
 * __useGetSaleQuery__
 *
 * To run a query within a React component, call `useGetSaleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSaleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSaleQuery({
 *   variables: {
 *      id: // value for 'id'
 *      organizationId: // value for 'organizationId'
 *   },
 * });
 */
export function useGetSaleQuery(baseOptions: Apollo.QueryHookOptions<GetSaleQuery, GetSaleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSaleQuery, GetSaleQueryVariables>(GetSaleDocument, options);
      }
export function useGetSaleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSaleQuery, GetSaleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSaleQuery, GetSaleQueryVariables>(GetSaleDocument, options);
        }
export type GetSaleQueryHookResult = ReturnType<typeof useGetSaleQuery>;
export type GetSaleLazyQueryHookResult = ReturnType<typeof useGetSaleLazyQuery>;
export type GetSaleQueryResult = Apollo.QueryResult<GetSaleQuery, GetSaleQueryVariables>;
export const GetSuppliersDocument = gql`
    query GetSuppliers($organizationId: ID!) {
  suppliers(organizationId: $organizationId) {
    id
    name
    description
    organizationId
    createdAt
    updatedAt
    organization {
      id
      name
      createdAt
      updatedAt
    }
    products {
      id
      name
      description
      price
      organizationId
      productCategoryId
      supplierId
      createdAt
      updatedAt
      organization {
        id
        name
        createdAt
        updatedAt
      }
      productCategory {
        id
        name
        description
        organizationId
        createdAt
        updatedAt
        organization {
          id
          name
          createdAt
          updatedAt
        }
      }
      supplier {
        id
        name
        description
        organizationId
        createdAt
        updatedAt
        organization {
          id
          name
          createdAt
          updatedAt
        }
      }
    }
  }
}
    `;

/**
 * __useGetSuppliersQuery__
 *
 * To run a query within a React component, call `useGetSuppliersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSuppliersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSuppliersQuery({
 *   variables: {
 *      organizationId: // value for 'organizationId'
 *   },
 * });
 */
export function useGetSuppliersQuery(baseOptions: Apollo.QueryHookOptions<GetSuppliersQuery, GetSuppliersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSuppliersQuery, GetSuppliersQueryVariables>(GetSuppliersDocument, options);
      }
export function useGetSuppliersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSuppliersQuery, GetSuppliersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSuppliersQuery, GetSuppliersQueryVariables>(GetSuppliersDocument, options);
        }
export type GetSuppliersQueryHookResult = ReturnType<typeof useGetSuppliersQuery>;
export type GetSuppliersLazyQueryHookResult = ReturnType<typeof useGetSuppliersLazyQuery>;
export type GetSuppliersQueryResult = Apollo.QueryResult<GetSuppliersQuery, GetSuppliersQueryVariables>;
export const GetSupplierDocument = gql`
    query GetSupplier($id: ID!, $organizationId: ID!) {
  supplier(id: $id, organizationId: $organizationId) {
    id
    name
    description
    organizationId
    createdAt
    updatedAt
    organization {
      id
      name
      createdAt
      updatedAt
    }
    products {
      id
      name
      description
      price
      organizationId
      productCategoryId
      supplierId
      createdAt
      updatedAt
      organization {
        id
        name
        createdAt
        updatedAt
      }
      productCategory {
        id
        name
        description
        organizationId
        createdAt
        updatedAt
        organization {
          id
          name
          createdAt
          updatedAt
        }
      }
      supplier {
        id
        name
        description
        organizationId
        createdAt
        updatedAt
        organization {
          id
          name
          createdAt
          updatedAt
        }
      }
    }
  }
}
    `;

/**
 * __useGetSupplierQuery__
 *
 * To run a query within a React component, call `useGetSupplierQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSupplierQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSupplierQuery({
 *   variables: {
 *      id: // value for 'id'
 *      organizationId: // value for 'organizationId'
 *   },
 * });
 */
export function useGetSupplierQuery(baseOptions: Apollo.QueryHookOptions<GetSupplierQuery, GetSupplierQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSupplierQuery, GetSupplierQueryVariables>(GetSupplierDocument, options);
      }
export function useGetSupplierLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSupplierQuery, GetSupplierQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSupplierQuery, GetSupplierQueryVariables>(GetSupplierDocument, options);
        }
export type GetSupplierQueryHookResult = ReturnType<typeof useGetSupplierQuery>;
export type GetSupplierLazyQueryHookResult = ReturnType<typeof useGetSupplierLazyQuery>;
export type GetSupplierQueryResult = Apollo.QueryResult<GetSupplierQuery, GetSupplierQueryVariables>;