"use client";

import { useGetCollaboratorsQuery, useGetCollaboratorQuery } from "@/graphql/generated/graphql";

/**
 * Hook customizado para buscar todos os colaboradores
 * 
 * @param organizationId - ID da organização (opcional)
 * @returns Dados e estado da query de colaboradores
 */
export const useCollaborators = (organizationId?: string) => {
  const { data, loading, error, refetch } = useGetCollaboratorsQuery({
    variables: {
      organizationId: organizationId || undefined,
    },
    skip: !organizationId,
  });

  return {
    collaborators: data?.collaborators || [],
    loading,
    error,
    refetch,
  };
};

/**
 * Hook customizado para buscar um colaborador específico
 * 
 * @param id - ID do colaborador
 * @returns Dados e estado da query do colaborador
 */
export const useCollaborator = (id: string) => {
  const { data, loading, error, refetch } = useGetCollaboratorQuery({
    variables: { id },
    skip: !id,
  });

  return {
    collaborator: data?.collaborator,
    loading,
    error,
    refetch,
  };
};
