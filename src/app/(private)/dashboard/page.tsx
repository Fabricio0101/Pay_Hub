"use client";

import { useEffect, useState } from "react";
import { ChartAreaInteractive } from "@/components/dashboard/chart-area-interactive";
import { RecentSalesTable } from "@/components/dashboard/recent-sales-table";
import { SectionCards } from "@/components/dashboard/section-cards";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useDashboardStats, type DashboardPeriod } from "@/hooks/use-dashboard-stats";

export default function DashboardPage() {
  const [organizationId, setOrganizationId] = useState<string>("");
  const [period, setPeriod] = useState<DashboardPeriod>("MONTH");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const orgId = localStorage.getItem("organizationId") || "";
      setOrganizationId(orgId);
    }
  }, []);

  const { refetch } = useDashboardStats(organizationId, period);

  useEffect(() => {
    if (organizationId) {
      refetch();
    }
  }, [period, organizationId, refetch]);

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="px-4 lg:px-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground text-sm">
                Visão geral do seu negócio
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="period-select">Período:</Label>
              <Select value={period} onValueChange={(value) => setPeriod(value as DashboardPeriod)}>
                <SelectTrigger id="period-select" className="w-[180px] cursor-pointer">
                  <SelectValue placeholder="Selecione o período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TODAY" className="cursor-pointer">Hoje</SelectItem>
                  <SelectItem value="WEEK" className="cursor-pointer">Esta Semana</SelectItem>
                  <SelectItem value="MONTH" className="cursor-pointer">Este Mês</SelectItem>
                  <SelectItem value="QUARTER" className="cursor-pointer">Este Trimestre</SelectItem>
                  <SelectItem value="YEAR" className="cursor-pointer">Este Ano</SelectItem>
                  <SelectItem value="ALL_TIME" className="cursor-pointer">Todo o Período</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <SectionCards period={period} />
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div>
          {organizationId && (
            <div className="px-4 lg:px-6">
              <RecentSalesTable organizationId={organizationId} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
