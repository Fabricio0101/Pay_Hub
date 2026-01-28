"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, TrendingUp, Users, Package } from "lucide-react";

interface ReportsQuickActionsProps {
  onQuickReport: (type: string) => void;
}

export const ReportsQuickActions = ({ onQuickReport }: ReportsQuickActionsProps) => {
  const quickReports = [
    {
      id: "sales-day",
      title: "Vendas do Dia",
      description: "Relatório de todas as vendas realizadas hoje",
      icon: Calendar,
      action: () => onQuickReport("sales-day"),
    },
    {
      id: "sales-month",
      title: "Vendas do Mês",
      description: "Relatório de todas as vendas do mês atual",
      icon: TrendingUp,
      action: () => onQuickReport("sales-month"),
    },
    {
      id: "top-products",
      title: "Produtos Mais Vendidos",
      description: "Lista dos produtos com maior volume de vendas",
      icon: Package,
      action: () => onQuickReport("top-products"),
    },
    {
      id: "top-clients",
      title: "Clientes com Mais Compras",
      description: "Lista dos clientes que mais compraram",
      icon: Users,
      action: () => onQuickReport("top-clients"),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {quickReports.map((report) => {
        const Icon = report.icon;
        return (
          <Card key={report.id} className="cursor-pointer hover:bg-accent transition-colors">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Icon className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">{report.title}</CardTitle>
              </div>
              <CardDescription>{report.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={report.action}
                variant="outline"
                className="w-full cursor-pointer"
              >
                Gerar Relatório
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
