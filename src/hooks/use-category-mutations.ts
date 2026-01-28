"use client";

import { 
  useCreateCategoryMutation, 
  useUpdateCategoryMutation, 
  useDeleteCategoryMutation 
} from "@/graphql/generated/graphql";
import { toast } from "sonner";

/**
 * Hook customizado para gerenciar mutations de categorias
 * 
 * @returns Funções de mutation para criar, atualizar e remover categorias
 */
export const useCategoryMutations = () => {
  const [createCategoryMutation, { loading: creating }] = useCreateCategoryMutation();
  const [updateCategoryMutation, { loading: updating }] = useUpdateCategoryMutation();
  const [deleteCategoryMutation, { loading: deleting }] = useDeleteCategoryMutation();

  const handleCreateCategory = async (organizationId: string, input: any) => {
    try {
      const result = await createCategoryMutation({
        variables: { 
          organizationId,
          createCategoryInput: input 
        },
        refetchQueries: ['GetCategories'],
      });

      if (result.data?.createCategory) {
        toast.success("Categoria criada com sucesso!");
        return result.data.createCategory;
      }
    } catch (error: unknown) {
      const errorMessage =
        (error as { graphQLErrors?: Array<{ message?: string }>; message?: string })?.graphQLErrors?.[0]?.message ||
        (error as { message?: string })?.message ||
        "Erro ao criar categoria. Tente novamente.";

      toast.error(errorMessage);
      throw error;
    }
  };

  const handleUpdateCategory = async (id: string, organizationId: string, input: any) => {
    try {
      const result = await updateCategoryMutation({
        variables: { 
          id,
          organizationId,
          updateCategoryInput: input 
        },
        refetchQueries: ['GetCategories', 'GetCategory'],
      });

      if (result.data?.updateCategory) {
        toast.success("Categoria atualizada com sucesso!");
        return result.data.updateCategory;
      }
    } catch (error: unknown) {
      const errorMessage =
        (error as { graphQLErrors?: Array<{ message?: string }>; message?: string })?.graphQLErrors?.[0]?.message ||
        (error as { message?: string })?.message ||
        "Erro ao atualizar categoria. Tente novamente.";

      toast.error(errorMessage);
      throw error;
    }
  };

  const handleDeleteCategory = async (id: string, organizationId: string) => {
    try {
      const result = await deleteCategoryMutation({
        variables: { 
          id,
          organizationId 
        },
        refetchQueries: ['GetCategories'],
      });

      if (result.data?.deleteCategory) {
        toast.success("Categoria removida com sucesso!");
        return result.data.deleteCategory;
      }
    } catch (error: unknown) {
      const errorMessage =
        (error as { graphQLErrors?: Array<{ message?: string }>; message?: string })?.graphQLErrors?.[0]?.message ||
        (error as { message?: string })?.message ||
        "Erro ao remover categoria. Tente novamente.";

      toast.error(errorMessage);
      throw error;
    }
  };

  return {
    createCategory: handleCreateCategory,
    updateCategory: handleUpdateCategory,
    deleteCategory: handleDeleteCategory,
    loading: creating || updating || deleting,
    creating,
    updating,
    deleting,
  };
};
