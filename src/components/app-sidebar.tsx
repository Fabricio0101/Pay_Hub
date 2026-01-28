"use client";

import {
  LayoutDashboard,
  ShoppingBasket,
  Users,
  Images,
  FileText,
  Box,
  Logs
} from "lucide-react";
import type * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import Image from "next/image";

const operacoesNav = [
  {
    title: "Visão Geral",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Vendas",
    url: "/sales",
    icon: ShoppingBasket,
  },
  {
    title: "Relatórios",
    url: "/reports",
    icon: FileText,
  },
];

const cadastrosNav = [
  {
    title: "Cadastro de Produtos",
    url: "/product-register",
    icon: Box,
  },
  {
    title: "Clientes",
    url: "/client-register",
    icon: Users,
  },
  {
    title: "Categorias",
    url: "/category-register",
    icon: Logs,
  },
];

export default function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const isMobile = useIsMobile();

  const cadastrosItems = isMobile ? [] : cadastrosNav;

  const operacoesItems = isMobile
    ? operacoesNav.filter(
      (item) => item.title === "Visão Geral" || item.title === "Vendas"
    )
    : operacoesNav;

  return (
    <Sidebar
      className="border-primary/10"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex items-center gap-2">
                  <Image src="/Icon_PayHub.png" alt="PayHub" width={30} height={30} />
                  <div className="flex flex-col">
                    <span className="truncate font-medium">PayHub</span>
                    <span className="truncate text-xs">Sistema de Gestão Vendas</span>
                  </div>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {operacoesItems.length > 0 && (
          <NavMain items={operacoesItems} label="Administrativo" />
        )}
        {cadastrosItems.length > 0 && <NavMain items={cadastrosItems} label="Cadastros" />}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}