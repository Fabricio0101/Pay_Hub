"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import AppSidebar from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        // Verificar autenticação apenas para rotas privadas
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

    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
        >
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}
