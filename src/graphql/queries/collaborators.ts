import { gql } from '@apollo/client';

/**
 * Query para buscar todos os colaboradores
 */
export const GET_COLLABORATORS = gql`
  query GetCollaborators($organizationId: ID) {
    collaborators(organizationId: $organizationId) {
      id
      email
      fullName
      role
      specialty
      phone
      address
      neighborhood
      zipCode
      profileImageUrl
      organizationId
      createdAt
      updatedAt
    }
  }
`;

/**
 * Query para buscar um colaborador específico por ID
 */
export const GET_COLLABORATOR = gql`
  query GetCollaborator($id: ID!) {
    collaborator(id: $id) {
      id
      email
      fullName
      role
      specialty
      phone
      address
      neighborhood
      zipCode
      profileImageUrl
      organizationId
      createdAt
      updatedAt
      clients {
        id
        email
        fullName
        phone
        birthDate
        notes
      }
    }
  }
`;
