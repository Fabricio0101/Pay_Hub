"use client";

import { useMemo, useState } from "react";
import {
    type ColumnDef,
    type ColumnFiltersState,
    type SortingState,
    type VisibilityState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { formatDate, formatPrice, formatPaymentStatus } from "@/components/sales/table-sales/utils";
import { useSales } from "@/hooks/use-sales";
import { type GetSalesQuery } from "@/graphql/generated/graphql";

type Sale = GetSalesQuery['sales'][number];

const createColumns = (): ColumnDef<Sale>[] => [
    {
        accessorKey: "client.fullName",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="h-8 px-2 lg:px-3"
                >
                    Cliente
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const clientName = row.original.client?.fullName || "-";
            return <div className="font-medium">{clientName}</div>;
        },
        accessorFn: (row) => row.client?.fullName || "",
    },
    {
        accessorKey: "product.name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="h-8 px-2 lg:px-3"
                >
                    Produto
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const productName = row.original.product?.name || "-";
            return <div>{productName}</div>;
        },
        accessorFn: (row) => row.product?.name || "",
    },
    {
        accessorKey: "total",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="h-8 px-2 lg:px-3"
                >
                    Valor
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            return <div className="font-medium">{formatPrice(row.original.total)}</div>;
        },
    },
    {
        accessorKey: "paymentStatus",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="h-8 px-2 lg:px-3"
                >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const status = row.original.paymentStatus;
            const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
                PAID: { label: "Pago", variant: "default" },
                PENDING: { label: "Pendente", variant: "secondary" },
                CANCELLED: { label: "Cancelado", variant: "destructive" },
                REFUNDED: { label: "Reembolsado", variant: "outline" },
            };
            const statusInfo = statusMap[status] || { label: formatPaymentStatus(status), variant: "outline" as const };

            return (
                <Badge variant={statusInfo.variant}>
                    {statusInfo.label}
                </Badge>
            );
        },
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="h-8 px-2 lg:px-3"
                >
                    Data
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            return <div>{formatDate(row.original.createdAt)}</div>;
        },
    },
];

export const RecentSalesTable = ({ organizationId }: { organizationId: string }) => {
    const { sales, loading, error } = useSales(organizationId);
    const [sorting, setSorting] = useState<SortingState>([
        { id: "createdAt", desc: true }, // Ordenar por data mais recente primeiro
    ]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

    const columns = useMemo(() => createColumns(), []);

    // Limitar a 10 vendas mais recentes
    const recentSales = useMemo(() => {
        if (!sales) return [];
        return [...sales]
            .sort((a, b) => {
                const dateA = new Date(a.createdAt).getTime();
                const dateB = new Date(b.createdAt).getTime();
                return dateB - dateA;
            })
            .slice(0, 10);
    }, [sales]);

    const table = useReactTable({
        data: recentSales,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
        },
        initialState: {
            pagination: {
                pageSize: 10,
            },
        },
    });

    if (loading) {
        return (
            <div className="rounded-lg border p-4">
                <div className="text-center text-muted-foreground">Carregando vendas recentes...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-lg border p-4">
                <div className="text-center text-destructive">
                    Erro ao carregar vendas recentes
                </div>
            </div>
        );
    }

    if (recentSales.length === 0) {
        return (
            <div className="rounded-lg border p-4">
                <div className="text-center text-muted-foreground">
                    Nenhuma venda encontrada
                </div>
            </div>
        );
    }

    return (
        <div className="w-full space-y-4">
            <div className="flex items-center justify-between px-4 lg:px-6">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Vendas Recentes</h2>
                    <p className="text-muted-foreground text-sm">
                        Últimas 10 vendas realizadas
                    </p>
                </div>
            </div>
            <div className="rounded-lg border px-4 lg:px-6">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : typeof header.column.columnDef.header === 'function'
                                                    ? header.column.columnDef.header(header.getContext())
                                                    : header.column.columnDef.header}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {typeof cell.column.columnDef.cell === 'function'
                                                ? cell.column.columnDef.cell(cell.getContext())
                                                : cell.column.columnDef.cell}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    Nenhum resultado encontrado.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};
