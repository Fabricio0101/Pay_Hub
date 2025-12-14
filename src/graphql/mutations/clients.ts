import { gql } from '@apollo/client';

/**
 * Mutation para criar um novo cliente
 */
export const CREATE_CLIENT_MUTATION = gql`
  mutation CreateClient($createClientInput: CreateClientInput!) {
    createClient(createClientInput: $createClientInput) {
      id
      email
      fullName
      phone
      birthDate
      notes
      collaboratorId
      organizationId
      createdAt
      updatedAt
      collaborator {
        id
        fullName
        email
      }
    }
  }
`;

/**
 * Mutation para atualizar um cliente
 */
export const UPDATE_CLIENT_MUTATION = gql`
  mutation UpdateClient($id: ID!, $updateClientInput: UpdateClientInput!) {
    updateClient(id: $id, updateClientInput: $updateClientInput) {
      id
      email
      fullName
      phone
      birthDate
      notes
      collaboratorId
      organizationId
      createdAt
      updatedAt
      collaborator {
        id
        fullName
        email
      }
    }
  }
`;

/**
 * Mutation para remover um cliente
 */
export const REMOVE_CLIENT_MUTATION = gql`
  mutation RemoveClient($id: ID!) {
    removeClient(id: $id) {
      id
      email
      fullName
    }
  }
`;
