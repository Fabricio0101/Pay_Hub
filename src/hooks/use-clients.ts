"use client";

import { useGetClientsQuery, useGetClientQuery } from "@/graphql/generated/graphql";

/**
 * Hook customizado para buscar todos os clientes
 * 
 * @param organizationId - ID da organização (opcional)
 * @param collaboratorId - ID do colaborador (opcional)
 * @returns Dados e estado da query de clientes
 */
export const useClients = (organizationId?: string, collaboratorId?: string) => {
  const { data, loading, error, refetch } = useGetClientsQuery({
    variables: {
      organizationId: organizationId || undefined,
      collaboratorId: collaboratorId || undefined,
    },
    skip: !organizationId && !collaboratorId,
  });

  return {
    clients: data?.clients || [],
    loading,
    error,
    refetch,
  };
};

/**
 * Hook customizado para buscar um cliente específico
 * 
 * @param id - ID do cliente
 * @returns Dados e estado da query do cliente
 */
export const useClient = (id: string) => {
  const { data, loading, error, refetch } = useGetClientQuery({
    variables: { id },
    skip: !id,
  });

  return {
    client: data?.client,
    loading,
    error,
    refetch,
  };
};
