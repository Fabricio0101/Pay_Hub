import { gql } from '@apollo/client';

/**
 * Mutation para criar um novo fornecedor
 */
export const CREATE_SUPPLIER_MUTATION = gql`
  mutation CreateSupplier($createSupplierInput: CreateSupplierInput!, $organizationId: ID!) {
    createSupplier(createSupplierInput: $createSupplierInput, organizationId: $organizationId) {
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

/**
 * Mutation para atualizar um fornecedor
 */
export const UPDATE_SUPPLIER_MUTATION = gql`
  mutation UpdateSupplier($id: ID!, $organizationId: ID!, $updateSupplierInput: UpdateSupplierInput!) {
    updateSupplier(id: $id, organizationId: $organizationId, updateSupplierInput: $updateSupplierInput) {
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

/**
 * Mutation para remover um fornecedor
 */
export const DELETE_SUPPLIER_MUTATION = gql`
  mutation DeleteSupplier($id: ID!, $organizationId: ID!) {
    deleteSupplier(id: $id, organizationId: $organizationId) {
      id
      name
    }
  }
`;
