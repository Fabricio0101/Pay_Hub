"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ResponsiveDialog } from "@/components/ui/responsive-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProductSchema, type CreateProductFormData } from "@/lib/schema/product";
import { useCategories } from "@/hooks/use-categories";
import { useSuppliers } from "@/hooks/use-suppliers";
import { type ProductFormValues } from "./table-products/types";
import { useIsMobile } from "@/hooks/use-mobile";
import { DrawerClose } from "@/components/ui/drawer";

interface ProductFormDialogProps {
  onAddProduct: (productData: ProductFormValues) => void;
  loading?: boolean;
}

export const ProductFormDialog = ({ onAddProduct, loading }: ProductFormDialogProps) => {
  const [open, setOpen] = useState(false);
  const [organizationId, setOrganizationId] = useState<string>("");
  const isMobile = useIsMobile();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const orgId = localStorage.getItem("organizationId") || "";
      setOrganizationId(orgId);
    }
  }, []);

  const { categories, loading: loadingCategories } = useCategories(
    organizationId || ""
  );
  const { suppliers, loading: loadingSuppliers } = useSuppliers(
    organizationId || ""
  );

  const form = useForm<CreateProductFormData>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      productCategoryId: "",
      supplierId: "",
      organizationId: organizationId,
    },
  });

  // Atualizar organizationId quando disponível
  useEffect(() => {
    if (organizationId) {
      form.setValue("organizationId", organizationId);
    }
  }, [organizationId, form]);

  const handleSubmit = (data: CreateProductFormData) => {
    if (!organizationId) {
      form.setError("root", {
        message: "OrganizationId não encontrado. Por favor, faça login novamente.",
      });
      return;
    }

    onAddProduct({
      ...data,
      organizationId,
    });
    form.reset({
      name: "",
      description: "",
      price: "",
      productCategoryId: "",
      supplierId: "",
      organizationId: organizationId,
    });
    setOpen(false);
  };

  const trigger = (
    <Button className="cursor-pointer">
      <Plus className="mr-2 h-4 w-4" />
      Adicionar Produto
    </Button>
  );

  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={setOpen}
      trigger={trigger}
      title="Adicionar Novo Produto"
      description="Crie um novo produto. Preencha os campos abaixo e clique em salvar quando terminar."
      contentClassName="sm:max-w-2xl max-h-[90vh]"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Produto</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o nome do produto" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Digite uma descrição para o produto (opcional)"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="productCategoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={loadingCategories}
                  >
                    <FormControl>
                      <SelectTrigger className="cursor-pointer w-full">
                        <SelectValue placeholder="Selecionar categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={category.id}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="supplierId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fornecedor (Opcional)</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={loadingSuppliers}
                >
                  <FormControl>
                    <SelectTrigger className="cursor-pointer w-full">
                      <SelectValue placeholder="Selecionar fornecedor (opcional)" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {suppliers.map((supplier) => (
                      <SelectItem
                        key={supplier.id}
                        value={supplier.id}
                      >
                        {supplier.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {form.formState.errors.root && (
            <p className="text-sm font-medium text-destructive">
              {form.formState.errors.root.message}
            </p>
          )}
          <div className={`flex gap-2 ${isMobile ? "flex-col" : "justify-end"} py-4`}>
            {isMobile ? (
              <DrawerClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="cursor-pointer w-full"
                >
                  Cancelar
                </Button>
              </DrawerClose>
            ) : (
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="cursor-pointer"
              >
                Cancelar
              </Button>
            )}
            <Button type="submit" className="cursor-pointer" disabled={loading}>
              {loading ? "Salvando..." : "Salvar Produto"}
            </Button>
          </div>
        </form>
      </Form>
    </ResponsiveDialog>
  );
};
