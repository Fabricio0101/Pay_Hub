"use client";

import { useEffect, useState } from "react";
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDashboardStats, type DashboardPeriod } from "@/hooks/use-dashboard-stats";
import { formatPrice } from "@/components/sales/table-sales/utils";

interface SectionCardsProps {
  period?: DashboardPeriod;
}

export function SectionCards({ period = "MONTH" }: SectionCardsProps) {
  const router = useRouter();
  const [organizationId, setOrganizationId] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const orgId = localStorage.getItem("organizationId") || "";
      setOrganizationId(orgId);
    }
  }, []);

  const { stats, loading, error } = useDashboardStats(organizationId, period);

  if (error) {
    const errorMessage = (error as unknown as { graphQLErrors?: Array<{ message?: string }>; message?: string })?.graphQLErrors?.[0]?.message ||
      (error as { message?: string })?.message ||
      "Erro ao carregar estatísticas";

    if (errorMessage.includes("ORGANIZATION_NOT_FOUND") || errorMessage.includes("401") || errorMessage.includes("Não autorizado")) {
      router.push("/login");
      return null;
    }
  }

  const getTrendIcon = (trend: string | null | undefined) => {
    if (trend === "UP") return <IconTrendingUp />;
    if (trend === "DOWN") return <IconTrendingDown />;
    return null;
  };

  const getTrendColor = (trend: string | null | undefined) => {
    if (trend === "UP") return "text-green-600 dark:text-green-500";
    if (trend === "DOWN") return "text-red-600 dark:text-red-500";
    return "text-muted-foreground";
  };

  const getTrendText = (trend: string | null | undefined, percentage: number | null | undefined) => {
    if (trend === "UP") return `+${percentage?.toFixed(2) || "0.00"}%`;
    if (trend === "DOWN") return `${percentage?.toFixed(2) || "0.00"}%`;
    return "0.00%";
  };

  const formatNumber = (num: number | null | undefined) => {
    if (num === null || num === undefined) return "0";
    return new Intl.NumberFormat("pt-BR").format(num);
  };

  const translatePeriod = (period: string) => {
    const periodMap: Record<string, string> = {
      day: "dia",
      week: "semana",
      month: "mês",
      year: "ano",
    };
    return periodMap[period.toLowerCase()] || period.toLowerCase();
  };

  if (loading) {
    return (
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="@container/card">
            <CardHeader>
              <CardDescription>Carregando...</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                ...
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Receita Total</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats?.revenue ? formatPrice(stats.revenue.total) : "$0.00"}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className={getTrendColor(stats?.revenue?.growthTrend)}>
              {getTrendIcon(stats?.revenue?.growthTrend)}
              {getTrendText(stats?.revenue?.growthTrend, stats?.revenue?.growthPercentage)}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {stats?.revenue?.growthTrend === "UP" && (
              <>
                Crescendo neste {translatePeriod(period)} <IconTrendingUp className="size-4" />
              </>
            )}
            {stats?.revenue?.growthTrend === "DOWN" && (
              <>
                Caiu {stats.revenue.growthPercentage?.toFixed(2) || "0.00"}% neste {translatePeriod(period)} <IconTrendingDown className="size-4" />
              </>
            )}
            {stats?.revenue?.growthTrend === "STABLE" && (
              <>
                Desempenho estável <IconTrendingUp className="size-4" />
              </>
            )}
          </div>
          <div className="text-muted-foreground">
            Receita para o período selecionado
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total de Vendas</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {formatNumber(stats?.sales?.total)}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className={getTrendColor(stats?.sales?.growthTrend)}>
              {getTrendIcon(stats?.sales?.growthTrend)}
              {getTrendText(stats?.sales?.growthTrend, stats?.sales?.growthPercentage)}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {stats?.sales?.growthTrend === "UP" && (
              <>
                Aumentou {stats.sales.growthPercentage?.toFixed(2) || "0.00"}% neste {translatePeriod(period)} <IconTrendingUp className="size-4" />
              </>
            )}
            {stats?.sales?.growthTrend === "DOWN" && (
              <>
                Caiu {stats.sales.growthPercentage?.toFixed(2) || "0.00"}% neste {translatePeriod(period)} <IconTrendingDown className="size-4" />
              </>
            )}
            {stats?.sales?.growthTrend === "STABLE" && (
              <>
                Vendas estáveis <IconTrendingUp className="size-4" />
              </>
            )}
          </div>
          <div className="text-muted-foreground">
            Quantidade de vendas para o período selecionado
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total de Clientes</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {formatNumber(stats?.clients?.total)}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className={getTrendColor(stats?.clients?.growthTrend)}>
              {getTrendIcon(stats?.clients?.growthTrend)}
              {getTrendText(stats?.clients?.growthTrend, stats?.clients?.growthPercentage)}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {stats?.clients?.growthTrend === "UP" && (
              <>
                Aumentou {stats.clients.growthPercentage?.toFixed(2) || "0.00"}% neste {translatePeriod(period)} <IconTrendingUp className="size-4" />
              </>
            )}
            {stats?.clients?.growthTrend === "DOWN" && (
              <>
                Caiu {stats.clients.growthPercentage?.toFixed(2) || "0.00"}% neste {translatePeriod(period)} <IconTrendingDown className="size-4" />
              </>
            )}
            {stats?.clients?.growthTrend === "STABLE" && (
              <>
                Base de clientes estável <IconTrendingUp className="size-4" />
              </>
            )}
          </div>
          <div className="text-muted-foreground">
            Total de clientes cadastrados
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total de Produtos</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {formatNumber(stats?.products?.total)}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {formatNumber(stats?.products?.active || 0)} ativos
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {formatNumber(stats?.products?.active || 0)} produtos ativos
          </div>
          <div className="text-muted-foreground">
            {formatNumber(stats?.products?.inactive || 0)} inativos
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
