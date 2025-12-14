"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/index";
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRecoverPassword } from "@/contexts/recover-password-context";
import { toast } from "sonner";

export const RecoverPasswordOTPForm = ({
    className,
    email,
    ...props
}: React.ComponentProps<"div"> & { email: string }) => {
    const { handleOTPVerified } = useRecoverPassword();
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (otp.length !== 6) {
            toast.error("Por favor, digite o código de 6 dígitos");
            return;
        }

        setLoading(true);
        try {
            // TODO: Chamar mutation GraphQL para verificar OTP e redefinir senha
            // Por enquanto, apenas simula o sucesso
            await new Promise((resolve) => setTimeout(resolve, 1000));
            handleOTPVerified();
        } catch (error: unknown) {
            const errorMessage =
                (error as { message?: string })?.message ||
                "Código inválido. Tente novamente.";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        try {
            // TODO: Chamar mutation para reenviar código
            toast.success("Código reenviado para seu email!");
        } catch (error) {
            toast.error("Erro ao reenviar código. Tente novamente.");
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <form onSubmit={handleSubmit}>
                <FieldGroup>
                    <div className="flex flex-col items-center gap-1 text-center">
                        <h1 className="text-2xl font-bold">Código de verificação</h1>
                        <p className="text-muted-foreground text-sm text-balance">
                            Enviamos um código de 6 dígitos para {email}
                        </p>
                    </div>
                    <Field>
                        <FieldLabel htmlFor="otp" className="sr-only">
                            Código de verificação
                        </FieldLabel>
                        <InputOTP
                            maxLength={6}
                            id="otp"
                            required
                            value={otp}
                            onChange={(value) => setOtp(value)}
                        >
                            <InputOTPGroup className="gap-2 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup className="gap-2 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup className="gap-2 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                        <FieldDescription className="text-center">
                            Digite o código de 6 dígitos enviado para seu email.
                        </FieldDescription>
                    </Field>
                    <Button type="submit" disabled={loading}>
                        {loading ? "Verificando..." : "Verificar"}
                    </Button>
                    <FieldDescription className="text-center">
                        Não recebeu o código?{" "}
                        <button
                            type="button"
                            onClick={handleResend}
                            className="underline-offset-4 hover:underline"
                        >
                            Reenviar
                        </button>
                    </FieldDescription>
                </FieldGroup>
            </form>
        </div>
    );
};

