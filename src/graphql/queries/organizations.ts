import { gql } from '@apollo/client';

/**
 * Query para buscar todas as organizações
 */
export const GET_ORGANIZATIONS = gql`
  query GetOrganizations {
    organizations {
      id
      name
      address
      city
      state
      neighborhood
      zipCode
      createdAt
      updatedAt
    }
  }
`;

/**
 * Query para buscar uma organização específica por ID
 */
export const GET_ORGANIZATION = gql`
  query GetOrganization($id: ID!) {
    organization(id: $id) {
      id
      name
      address
      city
      state
      neighborhood
      zipCode
      createdAt
      updatedAt
    }
  }
`;

/**
 * Query para buscar administradores de uma organização
 */
export const GET_ORGANIZATION_ADMINS = gql`
  query GetOrganizationAdmins($organizationId: ID) {
    organizationAdmins(organizationId: $organizationId) {
      id
      email
      fullName
      role
      address
      neighborhood
      zipCode
      phone
      organizationId
      createdAt
      updatedAt
    }
  }
`;

/**
 * Query para buscar um administrador específico por ID
 */
export const GET_ORGANIZATION_ADMIN = gql`
  query GetOrganizationAdmin($id: ID!) {
    organizationAdmin(id: $id) {
      id
      email
      fullName
      role
      address
      neighborhood
      zipCode
      phone
      organizationId
      createdAt
      updatedAt
    }
  }
`;
