"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { recoverPasswordSchema, type RecoverPasswordFormData } from "@/lib/schema/recover-password";

type RecoverPasswordStep = "email" | "otp" | "success";

interface RecoverPasswordContextType {
    form: ReturnType<typeof useForm<RecoverPasswordFormData>>;
    step: RecoverPasswordStep;
    email: string;
    handleRequestRecovery: (data: RecoverPasswordFormData) => Promise<void>;
    handleOTPVerified: () => void;
    handleBackToLogin: () => void;
}

const RecoverPasswordContext = createContext<RecoverPasswordContextType | undefined>(undefined);

export const RecoverPasswordProvider = ({ children }: { children: ReactNode }) => {
    const router = useRouter();
    const [step, setStep] = useState<RecoverPasswordStep>("email");
    const [email, setEmail] = useState<string>("");

    const form = useForm<RecoverPasswordFormData>({
        resolver: zodResolver(recoverPasswordSchema),
    });

    const handleRequestRecovery = async (data: RecoverPasswordFormData) => {
        try {
            // TODO: Chamar mutation GraphQL quando disponível
            // Por enquanto, apenas simula o sucesso
            setEmail(data.email);
            setStep("otp");
            toast.success("Código de verificação enviado para seu email!");
        } catch (error: unknown) {
            const errorMessage =
                (error as { graphQLErrors?: Array<{ message?: string }>; message?: string })?.graphQLErrors?.[0]?.message ||
                (error as { message?: string })?.message ||
                "Erro ao solicitar recuperação de senha. Tente novamente.";

            toast.error(errorMessage);
        }
    };

    const handleOTPVerified = () => {
        setStep("success");
        toast.success("Senha redefinida com sucesso!");
    };

    const handleBackToLogin = () => {
        router.push("/login");
    };

    return (
        <RecoverPasswordContext.Provider
            value={{
                form,
                step,
                email,
                handleRequestRecovery,
                handleOTPVerified,
                handleBackToLogin,
            }}
        >
            {children}
        </RecoverPasswordContext.Provider>
    );
};

export const useRecoverPassword = () => {
    const context = useContext(RecoverPasswordContext);
    if (context === undefined) {
        throw new Error("useRecoverPassword must be used within a RecoverPasswordProvider");
    }
    return context;
};

