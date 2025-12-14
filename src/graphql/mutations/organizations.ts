import { gql } from '@apollo/client';

/**
 * Mutation para criar uma nova organização
 */
export const CREATE_ORGANIZATION_MUTATION = gql`
  mutation CreateOrganization($createOrganizationInput: CreateOrganizationInput!) {
    createOrganization(createOrganizationInput: $createOrganizationInput) {
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
 * Mutation para atualizar uma organização
 */
export const UPDATE_ORGANIZATION_MUTATION = gql`
  mutation UpdateOrganization($id: ID!, $updateOrganizationInput: UpdateOrganizationInput!) {
    updateOrganization(id: $id, updateOrganizationInput: $updateOrganizationInput) {
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
 * Mutation para remover uma organização
 */
export const REMOVE_ORGANIZATION_MUTATION = gql`
  mutation RemoveOrganization($id: ID!) {
    removeOrganization(id: $id) {
      id
      name
    }
  }
`;

/**
 * Mutation para criar um administrador de organização
 */
export const CREATE_ORGANIZATION_ADMIN_MUTATION = gql`
  mutation CreateOrganizationAdmin($createOrganizationAdminInput: CreateOrganizationAdminInput!) {
    createOrganizationAdmin(createOrganizationAdminInput: $createOrganizationAdminInput) {
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
 * Mutation para atualizar um administrador de organização
 */
export const UPDATE_ORGANIZATION_ADMIN_MUTATION = gql`
  mutation UpdateOrganizationAdmin($id: ID!, $updateOrganizationAdminInput: UpdateOrganizationAdminInput!) {
    updateOrganizationAdmin(id: $id, updateOrganizationAdminInput: $updateOrganizationAdminInput) {
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
 * Mutation para remover um administrador de organização
 */
export const REMOVE_ORGANIZATION_ADMIN_MUTATION = gql`
  mutation RemoveOrganizationAdmin($id: ID!) {
    removeOrganizationAdmin(id: $id) {
      id
      email
      fullName
    }
  }
`;
