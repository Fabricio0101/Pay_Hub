import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(2, {
    message: "Nome deve ter pelo menos 2 caracteres.",
  }),
  description: z.string().optional().or(z.literal("")),
  price: z.string().min(1, {
    message: "Preço é obrigatório.",
  }).refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num > 0;
  }, {
    message: "Preço deve ser um número válido maior que zero.",
  }),
  productCategoryId: z.string().min(1, {
    message: "Categoria é obrigatória.",
  }),
  organizationId: z.string().min(1, {
    message: "Organização é obrigatória.",
  }),
  supplierId: z.string().optional().or(z.literal("")),
});

export const updateProductSchema = z.object({
  name: z.string().min(2, {
    message: "Nome deve ter pelo menos 2 caracteres.",
  }).optional(),
  description: z.string().optional().or(z.literal("")),
  price: z.string().min(1, {
    message: "Preço é obrigatório.",
  }).refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num > 0;
  }, {
    message: "Preço deve ser um número válido maior que zero.",
  }).optional(),
  productCategoryId: z.string().min(1, {
    message: "Categoria é obrigatória.",
  }).optional(),
  supplierId: z.string().optional().or(z.literal("")),
});

export type CreateProductFormData = z.infer<typeof createProductSchema>;
export type UpdateProductFormData = z.infer<typeof updateProductSchema>;
