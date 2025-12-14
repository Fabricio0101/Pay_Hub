"use client";

import { 
  useCreateClientMutation, 
  useUpdateClientMutation, 
  useRemoveClientMutation 
} from "@/graphql/generated/graphql";
import { toast } from "sonner";

/**
 * Hook customizado para gerenciar mutations de clientes
 * 
 * @returns Funções de mutation para criar, atualizar e remover clientes
 */
export const useClientMutations = () => {
  const [createClientMutation, { loading: creating }] = useCreateClientMutation();
  const [updateClientMutation, { loading: updating }] = useUpdateClientMutation();
  const [removeClientMutation, { loading: removing }] = useRemoveClientMutation();

  const handleCreateClient = async (input: any) => {
    try {
      const result = await createClientMutation({
        variables: { createClientInput: input },
        refetchQueries: ['GetClients'],
      });

      if (result.data?.createClient) {
        toast.success("Cliente criado com sucesso!");
        return result.data.createClient;
      }
    } catch (error: unknown) {
      const errorMessage =
        (error as { graphQLErrors?: Array<{ message?: string }>; message?: string })?.graphQLErrors?.[0]?.message ||
        (error as { message?: string })?.message ||
        "Erro ao criar cliente. Tente novamente.";

      toast.error(errorMessage);
      throw error;
    }
  };

  const handleUpdateClient = async (id: string, input: any) => {
    try {
      const result = await updateClientMutation({
        variables: { 
          id,
          updateClientInput: input 
        },
        refetchQueries: ['GetClients', 'GetClient'],
      });

      if (result.data?.updateClient) {
        toast.success("Cliente atualizado com sucesso!");
        return result.data.updateClient;
      }
    } catch (error: unknown) {
      const errorMessage =
        (error as { graphQLErrors?: Array<{ message?: string }>; message?: string })?.graphQLErrors?.[0]?.message ||
        (error as { message?: string })?.message ||
        "Erro ao atualizar cliente. Tente novamente.";

      toast.error(errorMessage);
      throw error;
    }
  };

  const handleRemoveClient = async (id: string) => {
    try {
      const result = await removeClientMutation({
        variables: { id },
        refetchQueries: ['GetClients'],
      });

      if (result.data?.removeClient) {
        toast.success("Cliente removido com sucesso!");
        return result.data.removeClient;
      }
    } catch (error: unknown) {
      const errorMessage =
        (error as { graphQLErrors?: Array<{ message?: string }>; message?: string })?.graphQLErrors?.[0]?.message ||
        (error as { message?: string })?.message ||
        "Erro ao remover cliente. Tente novamente.";

      toast.error(errorMessage);
      throw error;
    }
  };

  return {
    createClient: handleCreateClient,
    updateClient: handleUpdateClient,
    removeClient: handleRemoveClient,
    loading: creating || updating || removing,
    creating,
    updating,
    removing,
  };
};
