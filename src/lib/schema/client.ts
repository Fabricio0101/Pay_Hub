import { z } from "zod";

export const createClientSchema = z.object({
  fullName: z.string().min(2, {
    message: "Nome deve ter pelo menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor, insira um endereço de email válido.",
  }),
  phone: z.string().min(10, {
    message: "Telefone deve ter pelo menos 10 caracteres.",
  }),
  birthDate: z.string().optional().or(z.literal("")),
  notes: z.string().optional().or(z.literal("")),
  collaboratorId: z.string().min(1, {
    message: "Colaborador é obrigatório.",
  }),
  organizationId: z.string().min(1, {
    message: "Organização é obrigatória.",
  }),
});

export const updateClientSchema = z.object({
  fullName: z.string().min(2, {
    message: "Nome deve ter pelo menos 2 caracteres.",
  }).optional(),
  email: z.string().email({
    message: "Por favor, insira um endereço de email válido.",
  }).optional(),
  phone: z.string().min(10, {
    message: "Telefone deve ter pelo menos 10 caracteres.",
  }).optional(),
  birthDate: z.string().optional().or(z.literal("")),
  notes: z.string().optional().or(z.literal("")),
  collaboratorId: z.string().min(1, {
    message: "Colaborador é obrigatório.",
  }).optional(),
});

export type CreateClientFormData = z.infer<typeof createClientSchema>;
export type UpdateClientFormData = z.infer<typeof updateClientSchema>;
