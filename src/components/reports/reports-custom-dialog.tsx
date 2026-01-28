"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const createReportSchema = z.object({
  name: z.string().min(2, {
    message: "Nome deve ter pelo menos 2 caracteres.",
  }),
  type: z.string().min(1, {
    message: "Tipo de relatório é obrigatório.",
  }),
  period: z.string().min(1, {
    message: "Período é obrigatório.",
  }),
  entities: z.array(z.string()).optional(),
});

type CreateReportFormData = z.infer<typeof createReportSchema>;

interface ReportsCustomDialogProps {
  onCreateReport: (reportData: any) => void;
}

export const ReportsCustomDialog = ({ onCreateReport }: ReportsCustomDialogProps) => {
  const [open, setOpen] = useState(false);

  const form = useForm<CreateReportFormData>({
    resolver: zodResolver(createReportSchema),
    defaultValues: {
      name: "",
      type: "",
      period: "",
      entities: [],
    },
  });

  const handleSubmit = (data: CreateReportFormData) => {
    onCreateReport(data);
    form.reset({
      name: "",
      type: "",
      period: "",
      entities: [],
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">
          <Plus className="mr-2 h-4 w-4" />
          Criar Relatório
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Criar Relatório Personalizado</DialogTitle>
          <DialogDescription>
            Configure um relatório personalizado com os filtros desejados.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Relatório</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o nome do relatório" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Relatório</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="cursor-pointer">
                          <SelectValue placeholder="Selecionar tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="sales">Vendas</SelectItem>
                        <SelectItem value="products">Produtos</SelectItem>
                        <SelectItem value="clients">Clientes</SelectItem>
                        <SelectItem value="categories">Categorias</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="period"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Período</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="cursor-pointer">
                          <SelectValue placeholder="Selecionar período" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="today">Hoje</SelectItem>
                        <SelectItem value="week">Esta Semana</SelectItem>
                        <SelectItem value="month">Este Mês</SelectItem>
                        <SelectItem value="quarter">Este Trimestre</SelectItem>
                        <SelectItem value="year">Este Ano</SelectItem>
                        <SelectItem value="custom">Personalizado</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="cursor-pointer"
              >
                Cancelar
              </Button>
              <Button type="submit" className="cursor-pointer">
                Criar Relatório
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
