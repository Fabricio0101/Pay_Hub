import { gql } from '@apollo/client';

/**
 * Query para buscar todos os clientes
 */
export const GET_CLIENTS = gql`
  query GetClients($organizationId: ID, $collaboratorId: ID) {
    clients(organizationId: $organizationId, collaboratorId: $collaboratorId) {
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
      organization {
        id
        name
      }
    }
  }
`;

/**
 * Query para buscar um cliente específico por ID
 */
export const GET_CLIENT = gql`
  query GetClient($id: ID!) {
    client(id: $id) {
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
        phone
      }
      organization {
        id
        name
      }
    }
  }
`;
