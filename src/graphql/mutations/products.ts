import { gql } from '@apollo/client';

/**
 * Mutation para criar um novo produto
 */
export const CREATE_PRODUCT_MUTATION = gql`
  mutation CreateProduct($createProductInput: CreateProductInput!, $organizationId: ID!) {
    createProduct(createProductInput: $createProductInput, organizationId: $organizationId) {
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

/**
 * Mutation para atualizar um produto
 */
export const UPDATE_PRODUCT_MUTATION = gql`
  mutation UpdateProduct($id: ID!, $organizationId: ID!, $updateProductInput: UpdateProductInput!) {
    updateProduct(id: $id, organizationId: $organizationId, updateProductInput: $updateProductInput) {
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

/**
 * Mutation para remover um produto
 */
export const DELETE_PRODUCT_MUTATION = gql`
  mutation DeleteProduct($id: ID!, $organizationId: ID!) {
    deleteProduct(id: $id, organizationId: $organizationId) {
      id
      name
    }
  }
`;

/**
 * Mutation para adicionar um produto a uma categoria
 */
export const ADD_PRODUCT_TO_CATEGORY_MUTATION = gql`
  mutation AddProductToCategory($productId: ID!, $categoryId: ID!, $organizationId: ID!) {
    addProductToCategory(productId: $productId, categoryId: $categoryId, organizationId: $organizationId) {
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

/**
 * Mutation para remover um produto de uma categoria
 */
export const REMOVE_PRODUCT_FROM_CATEGORY_MUTATION = gql`
  mutation RemoveProductFromCategory($productId: ID!, $categoryId: ID!, $organizationId: ID!) {
    removeProductFromCategory(productId: $productId, categoryId: $categoryId, organizationId: $organizationId) {
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
