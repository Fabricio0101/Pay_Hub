"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Download, Trash2 } from "lucide-react";
import { formatDate } from "@/components/sales/table-sales/utils";

interface Report {
  id: string;
  name: string;
  type: string;
  period: string;
  createdAt: string;
}

interface ReportsListProps {
  reports: Report[];
  onDeleteReport: (id: string) => void;
}

export const ReportsList = ({ reports, onDeleteReport }: ReportsListProps) => {
  const handleView = (id: string) => {
    // TODO: Implementar visualização de relatório
    console.log("Visualizar relatório:", id);
  };

  const handleExport = (id: string) => {
    // TODO: Implementar exportação de relatório
    console.log("Exportar relatório:", id);
  };

  const formatReportType = (type: string) => {
    const types: Record<string, string> = {
      "sales": "Vendas",
      "products": "Produtos",
      "clients": "Clientes",
      "categories": "Categorias",
      "sales-day": "Vendas do Dia",
      "sales-month": "Vendas do Mês",
      "top-products": "Produtos Mais Vendidos",
      "top-clients": "Clientes com Mais Compras",
    };
    return types[type] || type;
  };

  const formatPeriod = (period: string) => {
    const periods: Record<string, string> = {
      "today": "Hoje",
      "week": "Esta Semana",
      "month": "Este Mês",
      "quarter": "Este Trimestre",
      "year": "Este Ano",
      "custom": "Personalizado",
    };
    return periods[period] || period;
  };

  if (reports.length === 0) {
    return (
      <div className="rounded-md border p-8 text-center">
        <p className="text-muted-foreground">
          Nenhum relatório criado ainda. Use os atalhos acima ou crie um relatório personalizado.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome do Relatório</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Período</TableHead>
            <TableHead>Data de Criação</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reports.map((report) => (
            <TableRow key={report.id}>
              <TableCell className="font-medium">{report.name}</TableCell>
              <TableCell>{formatReportType(report.type)}</TableCell>
              <TableCell>{formatPeriod(report.period)}</TableCell>
              <TableCell>{formatDate(report.createdAt)}</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 cursor-pointer"
                    onClick={() => handleView(report.id)}
                    aria-label="Visualizar relatório"
                    tabIndex={0}
                  >
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">Visualizar relatório</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 cursor-pointer"
                    onClick={() => handleExport(report.id)}
                    aria-label="Exportar relatório"
                    tabIndex={0}
                  >
                    <Download className="h-4 w-4" />
                    <span className="sr-only">Exportar relatório</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 cursor-pointer text-destructive hover:text-destructive"
                    onClick={() => onDeleteReport(report.id)}
                    aria-label="Excluir relatório"
                    tabIndex={0}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Excluir relatório</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
