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
