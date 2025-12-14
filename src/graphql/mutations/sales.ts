import { gql } from '@apollo/client';

/**
 * Mutation para criar uma nova venda
 */
export const CREATE_SALE_MUTATION = gql`
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

/**
 * Mutation para atualizar uma venda
 */
export const UPDATE_SALE_MUTATION = gql`
  mutation UpdateSale($id: ID!, $organizationId: ID!, $updateSaleInput: UpdateSaleInput!) {
    updateSale(id: $id, organizationId: $organizationId, updateSaleInput: $updateSaleInput) {
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

/**
 * Mutation para remover uma venda
 */
export const DELETE_SALE_MUTATION = gql`
  mutation DeleteSale($id: ID!, $organizationId: ID!) {
    deleteSale(id: $id, organizationId: $organizationId)
  }
`;
