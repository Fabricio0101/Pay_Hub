import { gql } from '@apollo/client';

/**
 * Query para buscar todas as categorias de produtos
 */
export const GET_CATEGORIES = gql`
  query GetCategories($organizationId: ID!) {
    categories(organizationId: $organizationId) {
      id
      name
      description
      organizationId
      createdAt
      updatedAt
      products {
        id
        name
        description
        price
      }
    }
  }
`;

/**
 * Query para buscar uma categoria específica por ID
 */
export const GET_CATEGORY = gql`
  query GetCategory($id: ID!, $organizationId: ID!) {
    category(id: $id, organizationId: $organizationId) {
      id
      name
      description
      organizationId
      createdAt
      updatedAt
      products {
        id
        name
        description
        price
        supplier {
          id
          name
        }
      }
    }
  }
`;
