import { gql } from '@apollo/client';

/**
 * Mutation para realizar login
 */
export const LOGIN_MUTATION = gql`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      accessToken
      userId
      email
      fullName
      role
      organizationId
    }
  }
`;
