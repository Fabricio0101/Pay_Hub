"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/index";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useLogin } from "@/hooks/use-login";

export const LoginForm = ({
  className,
  ...props
}: React.ComponentProps<"form">) => {
  const { form, handleLogin, loading } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit(handleLogin)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col w-full items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Faça login para continuar</h1>
          <p className="text-muted-foreground text-sm">
            Digite suas credenciais para entrar na sua conta
          </p>
        </div>
        <Field className="flex flex-col gap-1">
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            {...register("email")}
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className="text-sm text-destructive mt-1">
              {errors.email.message}
            </p>
          )}
        </Field>
        <Field className="flex flex-col gap-1">
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Senha</FieldLabel>
            <Link
              href="/recover-password"
              className="ml-auto text-sm underline-offset-4 hover:underline"
              tabIndex={0}
              aria-label="Esqueceu sua senha?"
            >
              Esqueceu sua senha?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              aria-invalid={errors.password ? "true" : "false"}
              aria-describedby={errors.password ? "password-error" : undefined}
              className="pr-10"
            />
            <button
              type="button"
              onClick={handleTogglePassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
              tabIndex={0}
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p id="password-error" className="text-sm text-destructive mt-1">
              {errors.password.message}
            </p>
          )}
        </Field>
        <Field className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Manter-me conectado</Label>
          </div>
          <Button variant="secondary" type="submit" disabled={loading}>
            {loading ?
              <div className="flex items-center gap-2">
                <Loader2 className="size-4 animate-spin" />
                Entrando...
              </div>
              :
              "Entrar"
            }
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
};
