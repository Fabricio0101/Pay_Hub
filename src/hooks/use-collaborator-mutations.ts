"use client";

import { 
  useCreateCollaboratorMutation, 
  useUpdateCollaboratorMutation, 
  useRemoveCollaboratorMutation 
} from "@/graphql/generated/graphql";
import { toast } from "sonner";

/**
 * Hook customizado para gerenciar mutations de colaboradores
 * 
 * @returns Funções de mutation para criar, atualizar e remover colaboradores
 */
export const useCollaboratorMutations = () => {
  const [createCollaboratorMutation, { loading: creating }] = useCreateCollaboratorMutation();
  const [updateCollaboratorMutation, { loading: updating }] = useUpdateCollaboratorMutation();
  const [removeCollaboratorMutation, { loading: removing }] = useRemoveCollaboratorMutation();

  const handleCreateCollaborator = async (input: any) => {
    try {
      const result = await createCollaboratorMutation({
        variables: { createCollaboratorInput: input },
        refetchQueries: ['GetCollaborators'],
      });

      if (result.data?.createCollaborator) {
        toast.success("Colaborador criado com sucesso!");
        return result.data.createCollaborator;
      }
    } catch (error: unknown) {
      const errorMessage =
        (error as { graphQLErrors?: Array<{ message?: string }>; message?: string })?.graphQLErrors?.[0]?.message ||
        (error as { message?: string })?.message ||
        "Erro ao criar colaborador. Tente novamente.";

      toast.error(errorMessage);
      throw error;
    }
  };

  const handleUpdateCollaborator = async (id: string, input: any) => {
    try {
      const result = await updateCollaboratorMutation({
        variables: { 
          id,
          updateCollaboratorInput: input 
        },
        refetchQueries: ['GetCollaborators', 'GetCollaborator'],
      });

      if (result.data?.updateCollaborator) {
        toast.success("Colaborador atualizado com sucesso!");
        return result.data.updateCollaborator;
      }
    } catch (error: unknown) {
      const errorMessage =
        (error as { graphQLErrors?: Array<{ message?: string }>; message?: string })?.graphQLErrors?.[0]?.message ||
        (error as { message?: string })?.message ||
        "Erro ao atualizar colaborador. Tente novamente.";

      toast.error(errorMessage);
      throw error;
    }
  };

  const handleRemoveCollaborator = async (id: string) => {
    try {
      const result = await removeCollaboratorMutation({
        variables: { id },
        refetchQueries: ['GetCollaborators'],
      });

      if (result.data?.removeCollaborator) {
        toast.success("Colaborador removido com sucesso!");
        return result.data.removeCollaborator;
      }
    } catch (error: unknown) {
      const errorMessage =
        (error as { graphQLErrors?: Array<{ message?: string }>; message?: string })?.graphQLErrors?.[0]?.message ||
        (error as { message?: string })?.message ||
        "Erro ao remover colaborador. Tente novamente.";

      toast.error(errorMessage);
      throw error;
    }
  };

  return {
    createCollaborator: handleCreateCollaborator,
    updateCollaborator: handleUpdateCollaborator,
    removeCollaborator: handleRemoveCollaborator,
    loading: creating || updating || removing,
    creating,
    updating,
    removing,
  };
};
