"use client";

import { 
  useCreateSaleMutation, 
  useUpdateSaleMutation, 
  useDeleteSaleMutation 
} from "@/graphql/generated/graphql";
import { toast } from "sonner";

/**
 * Hook customizado para gerenciar mutations de vendas
 * 
 * @returns Funções de mutation para criar, atualizar e remover vendas
 */
export const useSaleMutations = () => {
  const [createSaleMutation, { loading: creating }] = useCreateSaleMutation();
  const [updateSaleMutation, { loading: updating }] = useUpdateSaleMutation();
  const [deleteSaleMutation, { loading: deleting }] = useDeleteSaleMutation();

  const handleCreateSale = async (organizationId: string, input: any) => {
    try {
      const result = await createSaleMutation({
        variables: { 
          organizationId,
          createSaleInput: input 
        },
        refetchQueries: ['GetSales'],
      });

      if (result.data?.createSale) {
        toast.success("Venda criada com sucesso!");
        return result.data.createSale;
      }
    } catch (error: unknown) {
      const errorMessage =
        (error as { graphQLErrors?: Array<{ message?: string }>; message?: string })?.graphQLErrors?.[0]?.message ||
        (error as { message?: string })?.message ||
        "Erro ao criar venda. Tente novamente.";

      toast.error(errorMessage);
      throw error;
    }
  };

  const handleUpdateSale = async (id: string, organizationId: string, input: any) => {
    try {
      const result = await updateSaleMutation({
        variables: { 
          id,
          organizationId,
          updateSaleInput: input 
        },
        refetchQueries: ['GetSales', 'GetSale'],
      });

      if (result.data?.updateSale) {
        toast.success("Venda atualizada com sucesso!");
        return result.data.updateSale;
      }
    } catch (error: unknown) {
      const errorMessage =
        (error as { graphQLErrors?: Array<{ message?: string }>; message?: string })?.graphQLErrors?.[0]?.message ||
        (error as { message?: string })?.message ||
        "Erro ao atualizar venda. Tente novamente.";

      toast.error(errorMessage);
      throw error;
    }
  };

  const handleDeleteSale = async (id: string, organizationId: string) => {
    try {
      const result = await deleteSaleMutation({
        variables: { 
          id,
          organizationId 
        },
        refetchQueries: ['GetSales'],
      });

      if (result.data?.deleteSale) {
        toast.success("Venda removida com sucesso!");
        return true;
      }
      return false;
    } catch (error: unknown) {
      const errorMessage =
        (error as { graphQLErrors?: Array<{ message?: string }>; message?: string })?.graphQLErrors?.[0]?.message ||
        (error as { message?: string })?.message ||
        "Erro ao remover venda. Tente novamente.";

      toast.error(errorMessage);
      throw error;
    }
  };

  return {
    createSale: handleCreateSale,
    updateSale: handleUpdateSale,
    deleteSale: handleDeleteSale,
    loading: creating || updating || deleting,
    creating,
    updating,
    deleting,
  };
};
