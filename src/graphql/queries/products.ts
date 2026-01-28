import { gql } from '@apollo/client';

/**
 * Query para buscar todos os produtos de uma organização
 */
export const GET_PRODUCTS = gql`
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
 * Query para buscar um produto específico por ID
 */
export const GET_PRODUCT = gql`
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
