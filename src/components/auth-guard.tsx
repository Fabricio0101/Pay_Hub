"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        // Rotas públicas que não precisam de autenticação
        const publicRoutes = ["/login", "/otp", "/recover-password"]
        const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route))

        if (isPublicRoute) {
            return
        }

        // Verificar se está tentando acessar rota privada
        const isPrivateRoute =
            pathname.startsWith("/dashboard") ||
            pathname.startsWith("/user-register") ||
            pathname.startsWith("/sales") ||
            pathname.startsWith("/finance") ||
            pathname.startsWith("/mockups")

        if (isPrivateRoute) {
            const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null

            if (!token) {
                router.replace(`/login?redirect=${encodeURIComponent(pathname)}`)
            }
        }
    }, [pathname, router])

    return <>{children}</>
}

