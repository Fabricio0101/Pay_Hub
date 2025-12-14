"use client";

import { GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";
import { RecoverPasswordForm } from "@/components/recover-password/recover-password-form";
import { RecoverPasswordOTPForm } from "@/components/recover-password/recover-password-otp-form";
import { RecoverPasswordSuccess } from "@/components/recover-password/recover-password-success";
import { RecoverPasswordProvider, useRecoverPassword } from "@/contexts/recover-password-context";

function RecoverPasswordContent() {
    const { step, email } = useRecoverPassword();

    const renderStep = () => {
        switch (step) {
            case "email":
                return <RecoverPasswordForm />;
            case "otp":
                return <RecoverPasswordOTPForm email={email} />;
            case "success":
                return <RecoverPasswordSuccess />;
            default:
                return <RecoverPasswordForm />;
        }
    };

    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <Link href="/" className="flex items-center gap-2 font-medium">
                        <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                            <GalleryVerticalEnd className="size-4" />
                        </div>
                        Sorriso Perfeito
                    </Link>
                </div>

                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        {renderStep()}
                    </div>
                </div>

                <div className="flex justify-center gap-2 text-sm text-muted-foreground/80">
                    <div>
                        <p>Todos os direitos reservados © 2025 Sorriso Perfeito</p>
                    </div>
                    <div>
                        <Link className="hover:underline" href="/#">Política de privacidade</Link>
                    </div>
                    <div>
                        <Link className="hover:underline" href="/#">Termos de uso</Link>
                    </div>
                </div>
            </div>

            <div className="relative hidden lg:block overflow-hidden bg-background">
                <video
                    className="absolute inset-0 h-full w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="none"
                    poster="/placeholder.svg"
                >
                    <source src="/video/Smile.mp4" type="video/mp4" />
                </video>

                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <defs>
                        <mask id="gridMask">
                            <rect width="100%" height="100%" fill="white" />
                            {Array.from({ length: 16 }).map((_, index) => {
                                const row = Math.floor(index / 4);
                                const col = index % 4;
                                const gap = 0.5;
                                const cellSize = 25;
                                const rectSize = cellSize - gap;
                                const x = `${col * cellSize + gap / 2}%`;
                                const y = `${row * cellSize + gap / 2}%`;

                                return (
                                    <rect
                                        key={index}
                                        x={x}
                                        y={y}
                                        width={`${rectSize}%`}
                                        height={`${rectSize}%`}
                                        fill="black"
                                        rx="12"
                                    />
                                );
                            })}
                        </mask>
                    </defs>

                    <rect
                        width="100%"
                        height="100%"
                        className="fill-background"
                        mask="url(#gridMask)"
                    />
                </svg>
            </div>
        </div>
    );
}

export default function RecoverPasswordPage() {
    return (
        <RecoverPasswordProvider>
            <RecoverPasswordContent />
        </RecoverPasswordProvider>
    );
}

