import { z } from "zod";

export const recoverPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email é obrigatório")
    .email("Email inválido"),
});

export type RecoverPasswordFormData = z.infer<typeof recoverPasswordSchema>;

