"use client";

import { 
  useCreateProductMutation, 
  useUpdateProductMutation, 
  useDeleteProductMutation,
  useAddProductToCategoryMutation,
  useRemoveProductFromCategoryMutation
} from "@/graphql/generated/graphql";
import { toast } from "sonner";

/**
 * Hook customizado para gerenciar mutations de produtos
 * 
 * @returns Funções de mutation para criar, atualizar, remover produtos e gerenciar categorias
 */
export const useProductMutations = () => {
  const [createProductMutation, { loading: creating }] = useCreateProductMutation();
  const [updateProductMutation, { loading: updating }] = useUpdateProductMutation();
  const [deleteProductMutation, { loading: deleting }] = useDeleteProductMutation();
  const [addToCategoryMutation, { loading: addingToCategory }] = useAddProductToCategoryMutation();
  const [removeFromCategoryMutation, { loading: removingFromCategory }] = useRemoveProductFromCategoryMutation();

  const handleCreateProduct = async (organizationId: string, input: any) => {
    try {
      const result = await createProductMutation({
        variables: { 
          organizationId,
          createProductInput: input 
        },
        refetchQueries: ['GetProducts'],
      });

      if (result.data?.createProduct) {
        toast.success("Produto criado com sucesso!");
        return result.data.createProduct;
      }
    } catch (error: unknown) {
      const errorMessage =
        (error as { graphQLErrors?: Array<{ message?: string }>; message?: string })?.graphQLErrors?.[0]?.message ||
        (error as { message?: string })?.message ||
        "Erro ao criar produto. Tente novamente.";

      toast.error(errorMessage);
      throw error;
    }
  };

  const handleUpdateProduct = async (id: string, organizationId: string, input: any) => {
    try {
      const result = await updateProductMutation({
        variables: { 
          id,
          organizationId,
          updateProductInput: input 
        },
        refetchQueries: ['GetProducts', 'GetProduct'],
      });

      if (result.data?.updateProduct) {
        toast.success("Produto atualizado com sucesso!");
        return result.data.updateProduct;
      }
    } catch (error: unknown) {
      const errorMessage =
        (error as { graphQLErrors?: Array<{ message?: string }>; message?: string })?.graphQLErrors?.[0]?.message ||
        (error as { message?: string })?.message ||
        "Erro ao atualizar produto. Tente novamente.";

      toast.error(errorMessage);
      throw error;
    }
  };

  const handleDeleteProduct = async (id: string, organizationId: string) => {
    try {
      const result = await deleteProductMutation({
        variables: { 
          id,
          organizationId 
        },
        refetchQueries: ['GetProducts'],
      });

      if (result.data?.deleteProduct) {
        toast.success("Produto removido com sucesso!");
        return result.data.deleteProduct;
      }
    } catch (error: unknown) {
      const errorMessage =
        (error as { graphQLErrors?: Array<{ message?: string }>; message?: string })?.graphQLErrors?.[0]?.message ||
        (error as { message?: string })?.message ||
        "Erro ao remover produto. Tente novamente.";

      toast.error(errorMessage);
      throw error;
    }
  };

  const handleAddToCategory = async (productId: string, categoryId: string, organizationId: string) => {
    try {
      const result = await addToCategoryMutation({
        variables: { 
          productId,
          categoryId,
          organizationId 
        },
        refetchQueries: ['GetProducts', 'GetCategories'],
      });

      if (result.data?.addProductToCategory) {
        toast.success("Produto adicionado à categoria com sucesso!");
        return result.data.addProductToCategory;
      }
    } catch (error: unknown) {
      const errorMessage =
        (error as { graphQLErrors?: Array<{ message?: string }>; message?: string })?.graphQLErrors?.[0]?.message ||
        (error as { message?: string })?.message ||
        "Erro ao adicionar produto à categoria. Tente novamente.";

      toast.error(errorMessage);
      throw error;
    }
  };

  const handleRemoveFromCategory = async (productId: string, categoryId: string, organizationId: string) => {
    try {
      const result = await removeFromCategoryMutation({
        variables: { 
          productId,
          categoryId,
          organizationId 
        },
        refetchQueries: ['GetProducts', 'GetCategories'],
      });

      if (result.data?.removeProductFromCategory) {
        toast.success("Produto removido da categoria com sucesso!");
        return result.data.removeProductFromCategory;
      }
    } catch (error: unknown) {
      const errorMessage =
        (error as { graphQLErrors?: Array<{ message?: string }>; message?: string })?.graphQLErrors?.[0]?.message ||
        (error as { message?: string })?.message ||
        "Erro ao remover produto da categoria. Tente novamente.";

      toast.error(errorMessage);
      throw error;
    }
  };

  return {
    createProduct: handleCreateProduct,
    updateProduct: handleUpdateProduct,
    deleteProduct: handleDeleteProduct,
    addToCategory: handleAddToCategory,
    removeFromCategory: handleRemoveFromCategory,
    loading: creating || updating || deleting || addingToCategory || removingFromCategory,
    creating,
    updating,
    deleting,
    addingToCategory,
    removingFromCategory,
  };
};
