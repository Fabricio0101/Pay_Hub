import { gql } from '@apollo/client';

/**
 * Mutation para criar um novo colaborador
 */
export const CREATE_COLLABORATOR_MUTATION = gql`
  mutation CreateCollaborator($createCollaboratorInput: CreateCollaboratorInput!) {
    createCollaborator(createCollaboratorInput: $createCollaboratorInput) {
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
 * Mutation para atualizar um colaborador
 */
export const UPDATE_COLLABORATOR_MUTATION = gql`
  mutation UpdateCollaborator($id: ID!, $updateCollaboratorInput: UpdateCollaboratorInput!) {
    updateCollaborator(id: $id, updateCollaboratorInput: $updateCollaboratorInput) {
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
 * Mutation para remover um colaborador
 */
export const REMOVE_COLLABORATOR_MUTATION = gql`
  mutation RemoveCollaborator($id: ID!) {
    removeCollaborator(id: $id) {
      id
      email
      fullName
    }
  }
`;
