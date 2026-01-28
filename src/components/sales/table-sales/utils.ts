export const formatDate = (date: string | Date | null | undefined): string => {
  if (!date) return "-";
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const formatPrice = (price: number | null | undefined): string => {
  if (!price && price !== 0) return "-";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
};

export const formatPaymentMethod = (method: string | null | undefined): string => {
  if (!method) return "-";
  const methods: Record<string, string> = {
    CASH: "Dinheiro",
    CREDIT_CARD: "Cartão de Crédito",
    DEBIT_CARD: "Cartão de Débito",
    PIX: "PIX",
    BANK_TRANSFER: "Transferência Bancária",
  };
  return methods[method] || method;
};

export const formatPaymentStatus = (status: string | null | undefined): string => {
  if (!status) return "-";
  const statuses: Record<string, string> = {
    PENDING: "Pendente",
    PAID: "Pago",
    CANCELLED: "Cancelado",
    REFUNDED: "Reembolsado",
  };
  return statuses[status] || status;
};
