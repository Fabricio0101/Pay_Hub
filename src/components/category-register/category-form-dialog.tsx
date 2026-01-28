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
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCategorySchema, type CreateCategoryFormData } from "@/lib/schema/category";
import { type CategoryFormValues } from "./table-categories/types";
import { useIsMobile } from "@/hooks/use-mobile";
import { DrawerClose } from "@/components/ui/drawer";

interface CategoryFormDialogProps {
  onAddCategory: (categoryData: CategoryFormValues) => void;
  loading?: boolean;
}

export const CategoryFormDialog = ({ onAddCategory, loading }: CategoryFormDialogProps) => {
  const [open, setOpen] = useState(false);
  const [organizationId, setOrganizationId] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const orgId = localStorage.getItem("organizationId") || "";
      setOrganizationId(orgId);
    }
  }, []);

  const form = useForm<CreateCategoryFormData>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: "",
      description: "",
      organizationId: organizationId,
    },
  });

  // Atualizar organizationId quando disponível
  useEffect(() => {
    if (organizationId) {
      form.setValue("organizationId", organizationId);
    }
  }, [organizationId, form]);

  const handleSubmit = (data: CreateCategoryFormData) => {
    if (!organizationId) {
      form.setError("root", {
        message: "OrganizationId não encontrado. Por favor, faça login novamente.",
      });
      return;
    }

    onAddCategory({
      ...data,
      organizationId,
    });
    form.reset({
      name: "",
      description: "",
      organizationId: organizationId,
    });
    setOpen(false);
  };

  const isMobile = useIsMobile();

  const trigger = (
    <Button className="cursor-pointer">
      <Plus className="mr-2 h-4 w-4" />
      Adicionar Categoria
    </Button>
  );

  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={setOpen}
      trigger={trigger}
      title="Adicionar Nova Categoria"
      description="Crie uma nova categoria. Preencha os campos abaixo e clique em salvar quando terminar."
      contentClassName="sm:max-w-2xl max-h-[90vh]"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome da Categoria</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o nome da categoria" {...field} />
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
                    placeholder="Digite uma descrição para a categoria (opcional)"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
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
              {loading ? "Salvando..." : "Salvar Categoria"}
            </Button>
          </div>
        </form>
      </Form>
    </ResponsiveDialog>
  );
};
