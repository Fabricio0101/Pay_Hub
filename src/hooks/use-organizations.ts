"use client";

import { 
  useGetOrganizationsQuery, 
  useGetOrganizationQuery,
  useGetOrganizationAdminsQuery,
  useGetOrganizationAdminQuery 
} from "@/graphql/generated/graphql";

/**
 * Hook customizado para buscar todas as organizações
 * 
 * @returns Dados e estado da query de organizações
 */
export const useOrganizations = () => {
  const { data, loading, error, refetch } = useGetOrganizationsQuery();

  return {
    organizations: data?.organizations || [],
    loading,
    error,
    refetch,
  };
};

/**
 * Hook customizado para buscar uma organização específica
 * 
 * @param id - ID da organização
 * @returns Dados e estado da query da organização
 */
export const useOrganization = (id: string) => {
  const { data, loading, error, refetch } = useGetOrganizationQuery({
    variables: { id },
    skip: !id,
  });

  return {
    organization: data?.organization,
    loading,
    error,
    refetch,
  };
};

/**
 * Hook customizado para buscar administradores de uma organização
 * 
 * @param organizationId - ID da organização (opcional)
 * @returns Dados e estado da query de administradores
 */
export const useOrganizationAdmins = (organizationId?: string) => {
  const { data, loading, error, refetch } = useGetOrganizationAdminsQuery({
    variables: {
      organizationId: organizationId || undefined,
    },
    skip: !organizationId,
  });

  return {
    organizationAdmins: data?.organizationAdmins || [],
    loading,
    error,
    refetch,
  };
};

/**
 * Hook customizado para buscar um administrador específico
 * 
 * @param id - ID do administrador
 * @returns Dados e estado da query do administrador
 */
export const useOrganizationAdmin = (id: string) => {
  const { data, loading, error, refetch } = useGetOrganizationAdminQuery({
    variables: { id },
    skip: !id,
  });

  return {
    organizationAdmin: data?.organizationAdmin,
    loading,
    error,
    refetch,
  };
};
