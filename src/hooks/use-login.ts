"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "@/graphql/generated/graphql";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { loginSchema, type LoginFormData } from "@/lib/schema/login";

export const useLogin = () => {
  const router = useRouter();
  const [loginMutation, { loading }] = useLoginMutation();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (data: LoginFormData) => {
    try {
      const result = await loginMutation({
        variables: {
          loginInput: {
            email: data.email,
            password: data.password,
          },
        },
      });

      if (result.data?.login) {
        const { accessToken, userId, email, fullName, role } = result.data.login;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("userId", userId);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("fullName", fullName);
        localStorage.setItem("userRole", role);

        document.cookie = `accessToken=${accessToken}; path=/; max-age=86400; SameSite=Lax`;

        toast.success("Login realizado com sucesso!");

        router.push("/dashboard");
      }
    } catch (error: unknown) {
      const errorMessage =
        (error as { graphQLErrors?: Array<{ message?: string }>; message?: string })?.graphQLErrors?.[0]?.message ||
        (error as { message?: string })?.message ||
        "Erro ao fazer login. Verifique suas credenciais.";

      toast.error(errorMessage);
    }
  };

  return {
    form,
    handleLogin,
    loading,
  };
};
