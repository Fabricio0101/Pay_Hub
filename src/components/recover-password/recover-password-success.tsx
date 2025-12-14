"use client";

import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRecoverPassword } from "@/contexts/recover-password-context";

export const RecoverPasswordSuccess = () => {
    const { handleBackToLogin } = useRecoverPassword();

    return (
        <div className="flex flex-col items-center gap-6 text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle2 className="size-8 text-primary" />
            </div>
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold">Senha redefinida com sucesso!</h1>
                <p className="text-muted-foreground text-sm">
                    Sua senha foi redefinida. Agora você pode fazer login com sua nova senha.
                </p>
            </div>
            <Button onClick={handleBackToLogin} className="w-full">
                Voltar e realizar o login
            </Button>
        </div>
    );
};

