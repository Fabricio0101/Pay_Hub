import { gql } from '@apollo/client';

/**
 * Mutation para criar uma nova categoria
 */
export const CREATE_CATEGORY_MUTATION = gql`
  mutation CreateCategory($createCategoryInput: CreateCategoryInput!, $organizationId: ID!) {
    createCategory(createCategoryInput: $createCategoryInput, organizationId: $organizationId) {
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

/**
 * Mutation para atualizar uma categoria
 */
export const UPDATE_CATEGORY_MUTATION = gql`
  mutation UpdateCategory($id: ID!, $organizationId: ID!, $updateCategoryInput: UpdateCategoryInput!) {
    updateCategory(id: $id, organizationId: $organizationId, updateCategoryInput: $updateCategoryInput) {
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

/**
 * Mutation para remover uma categoria
 */
export const DELETE_CATEGORY_MUTATION = gql`
  mutation DeleteCategory($id: ID!, $organizationId: ID!) {
    deleteCategory(id: $id, organizationId: $organizationId)
  }
`;
