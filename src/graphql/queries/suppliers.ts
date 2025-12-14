import { gql } from '@apollo/client';

/**
 * Query para buscar todos os fornecedores
 */
export const GET_SUPPLIERS = gql`
  query GetSuppliers($organizationId: ID!) {
    suppliers(organizationId: $organizationId) {
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
 * Query para buscar um fornecedor específico por ID
 */
export const GET_SUPPLIER = gql`
  query GetSupplier($id: ID!, $organizationId: ID!) {
    supplier(id: $id, organizationId: $organizationId) {
      id
      name
      description
      createdAt
      updatedAt
      products {
        id
        name
        description
        price
        productCategory {
          id
          name
        }
      }
    }
  }
`;
