import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(2, {
    message: "Nome deve ter pelo menos 2 caracteres.",
  }),
  description: z.string().optional().or(z.literal("")),
  organizationId: z.string().min(1, {
    message: "Organização é obrigatória.",
  }),
});

export const updateCategorySchema = z.object({
  name: z.string().min(2, {
    message: "Nome deve ter pelo menos 2 caracteres.",
  }).optional(),
  description: z.string().optional().or(z.literal("")),
});

export type CreateCategoryFormData = z.infer<typeof createCategorySchema>;
export type UpdateCategoryFormData = z.infer<typeof updateCategorySchema>;
