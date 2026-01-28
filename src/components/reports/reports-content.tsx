"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, TrendingUp, Users, Package, Plus } from "lucide-react";
import { ReportsQuickActions } from "./reports-quick-actions";
import { ReportsCustomDialog } from "./reports-custom-dialog";
import { ReportsList } from "./reports-list";

export const ReportsContent = () => {
  const [reports, setReports] = useState<any[]>([]);

  const handleQuickReport = (type: string) => {
    // TODO: Implementar geração de relatórios rápidos
    console.log("Gerar relatório rápido:", type);
    // Por enquanto, apenas adiciona um relatório mockado
    const newReport = {
      id: Date.now().toString(),
      name: `Relatório ${type}`,
      type,
      period: "Hoje",
      createdAt: new Date().toISOString(),
    };
    setReports([...reports, newReport]);
  };

  const handleCreateCustomReport = (reportData: any) => {
    // TODO: Implementar criação de relatório personalizado
    console.log("Criar relatório personalizado:", reportData);
    const newReport = {
      id: Date.now().toString(),
      ...reportData,
      createdAt: new Date().toISOString(),
    };
    setReports([...reports, newReport]);
  };

  const handleDeleteReport = (id: string) => {
    setReports(reports.filter((r) => r.id !== id));
  };

  return (
    <div className="flex flex-col gap-8 p-4 lg:p-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Relatórios</h1>
        <p className="text-muted-foreground text-sm">
          Crie, visualize e gerencie relatórios do seu negócio.
        </p>
      </div>

      {/* Área 1: Atalhos de Relatórios Rápidos */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Relatórios Rápidos</h2>
        <ReportsQuickActions onQuickReport={handleQuickReport} />
      </div>

      {/* Área 2: Criar Relatório Personalizado */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Criar Relatório Personalizado</h2>
          <ReportsCustomDialog onCreateReport={handleCreateCustomReport} />
        </div>
      </div>

      {/* Área 3: Listagem de Relatórios Criados */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Relatórios Criados</h2>
        <ReportsList reports={reports} onDeleteReport={handleDeleteReport} />
      </div>
    </div>
  );
};
