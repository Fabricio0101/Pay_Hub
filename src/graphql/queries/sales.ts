import { gql } from '@apollo/client';

/**
 * Query para buscar todas as vendas de uma organização
 */
export const GET_SALES = gql`
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
      client {
        id
        fullName
        email
        phone
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
 * Query para buscar uma venda específica por ID
 */
export const GET_SALE = gql`
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
      client {
        id
        fullName
        email
        phone
        birthDate
      }
      collaborator {
        id
        fullName
        email
        phone
        specialty
      }
      product {
        id
        name
        description
        price
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
  }
`;
