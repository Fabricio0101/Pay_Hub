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
 * Query para buscar um fornecedor específico por ID
 */
export const GET_SUPPLIER = gql`
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
