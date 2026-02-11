"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import { useSalesHistory, HistoryGroupBy } from "@/hooks/use-sales-history";
import { formatPrice } from "@/components/sales/table-sales/utils";

export const description = "An interactive area chart";

const chartConfig = {
  revenue: {
    label: "Receita",
    color: "var(--primary)",
  },
  salesCount: {
    label: "Vendas",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const calculateDateRange = (days: number) => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  return {
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
  };
};

export function ChartAreaInteractive() {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("30d");
  const [groupBy, setGroupBy] = React.useState<HistoryGroupBy>(HistoryGroupBy.Day);
  const [organizationId, setOrganizationId] = React.useState<string>("");

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const orgId = localStorage.getItem("organizationId") || "";
      setOrganizationId(orgId);
    }
  }, []);

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d");
    }
  }, [isMobile]);

  const getDaysFromRange = (range: string) => {
    switch (range) {
      case "7d":
        return 7;
      case "30d":
        return 30;
      case "90d":
        return 90;
      default:
        return 30;
    }
  };

  const getGroupByFromRange = (range: string): HistoryGroupBy => {
    if (range === "7d") return HistoryGroupBy.Day;
    if (range === "30d") return HistoryGroupBy.Day;
    if (range === "90d") return HistoryGroupBy.Week;
    return HistoryGroupBy.Day;
  };

  const days = getDaysFromRange(timeRange);
  const calculatedGroupBy = getGroupByFromRange(timeRange);

  React.useEffect(() => {
    setGroupBy(calculatedGroupBy);
  }, [timeRange, calculatedGroupBy]);

  const { startDate, endDate } = calculateDateRange(days);
  const { history, loading, error } = useSalesHistory(
    organizationId,
    startDate,
    endDate,
    groupBy
  );

  if (error) {
    const errorMessage = (error as unknown as { graphQLErrors?: Array<{ message?: string }>; message?: string })?.graphQLErrors?.[0]?.message ||
      (error as { message?: string })?.message ||
      "Erro ao carregar histórico";

    if (errorMessage.includes("ORGANIZATION_NOT_FOUND") || errorMessage.includes("401") || errorMessage.includes("Não autorizado")) {
      router.push("/login");
      return null;
    }

    if (errorMessage.includes("INVALID_DATE_RANGE") || errorMessage.includes("DATE_RANGE_TOO_LARGE")) {
      return (
        <Card className="@container/card">
          <CardHeader>
            <CardTitle>Erro ao carregar histórico</CardTitle>
            <CardDescription>{errorMessage}</CardDescription>
          </CardHeader>
        </Card>
      );
    }
  }

  const chartData = history.map((item) => ({
    date: item.date,
    revenue: item.revenue || 0,
    salesCount: item.salesCount || 0,
  }));

  const getRangeLabel = (range: string) => {
    switch (range) {
      case "7d":
        return "Últimos 7 dias";
      case "30d":
        return "Últimos 30 dias";
      case "90d":
        return "Últimos 3 meses";
      default:
        return "Últimos 30 dias";
    }
  };

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Histórico de Vendas</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Receita e quantidade de vendas para o período selecionado
          </span>
          <span className="@[540px]/card:hidden">Histórico de vendas</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:px-4! @[767px]/card:flex"
          >
            <ToggleGroupItem value="7d" className="cursor-pointer">Últimos 7 dias</ToggleGroupItem>
            <ToggleGroupItem value="30d" className="cursor-pointer">Últimos 30 dias</ToggleGroupItem>
            <ToggleGroupItem value="90d" className="cursor-pointer">Últimos 3 meses</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden cursor-pointer"
              size="sm"
              aria-label="Selecione um período"
            >
              <SelectValue placeholder={getRangeLabel(timeRange)} />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="7d" className="rounded-lg cursor-pointer">
                Últimos 7 dias
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg cursor-pointer">
                Últimos 30 dias
              </SelectItem>
              <SelectItem value="90d" className="rounded-lg cursor-pointer">
                Últimos 3 meses
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        {!organizationId ? (
          <div className="flex items-center justify-center h-[250px]">
            <p className="text-muted-foreground">Carregando organização...</p>
          </div>
        ) : loading ? (
          <div className="flex items-center justify-center h-[250px]">
            <p className="text-muted-foreground">Carregando dados...</p>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-[250px]">
            <p className="text-destructive">
              {error instanceof Error ? error.message : "Erro ao carregar histórico de vendas"}
            </p>
          </div>
        ) : chartData.length === 0 ? (
          <div className="flex items-center justify-center h-[250px]">
            <p className="text-muted-foreground">Nenhum dado disponível para o período selecionado</p>
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-revenue)"
                    stopOpacity={1.0}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-revenue)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id="fillSalesCount" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-salesCount)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-salesCount)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("pt-BR", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("pt-BR", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      });
                    }}
                    indicator="dot"
                    formatter={(value, name) => {
                      if (name === "revenue") {
                        return [formatPrice(Number(value)), "Receita"];
                      }
                      if (name === "salesCount") {
                        return [value, "Vendas"];
                      }
                      return [value, name];
                    }}
                  />
                }
              />
              <Area
                dataKey="salesCount"
                type="natural"
                fill="url(#fillSalesCount)"
                stroke="var(--color-salesCount)"
                stackId="a"
              />
              <Area
                dataKey="revenue"
                type="natural"
                fill="url(#fillRevenue)"
                stroke="var(--color-revenue)"
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
