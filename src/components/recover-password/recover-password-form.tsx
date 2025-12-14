"use client";

import { cn } from "@/lib/utils/index";
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldGroup,
    FieldLabel
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useRecoverPassword } from "@/contexts/recover-password-context";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export const RecoverPasswordForm = ({
    className,
    ...props
}: React.ComponentProps<"form">) => {
    const { form, handleRequestRecovery } = useRecoverPassword();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = form;

    return (
        <form
            className={cn("flex flex-col gap-6", className)}
            onSubmit={handleSubmit(handleRequestRecovery)}
            {...props}
        >
            <FieldGroup>
                <div className="flex flex-col w-full items-center gap-10 text-center">
                    <div className="flex w-full justify-start items-center gap-2">
                        <Link className="flex w-8 bg-muted-foreground/10 p-2 rounded-full hover:bg-muted-foreground/20 transition-colors" href="/login">
                            <ArrowLeftIcon className="size-4" />
                        </Link>
                        <p className="text-sm text-foreground">Voltar para o login</p>
                    </div>
                    <div className="flex flex-col w-full items-center gap-1 text-center">
                        <h1 className="text-2xl font-bold">Recuperar senha</h1>
                        <p className="text-muted-foreground text-sm">
                            Digite seu email para receber um código de verificação
                        </p>
                    </div>
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
                <Field className="flex flex-col gap-3">
                    <Button type="submit">
                        Recuperar senha
                    </Button>
                </Field>
            </FieldGroup>
        </form>
    );
};

