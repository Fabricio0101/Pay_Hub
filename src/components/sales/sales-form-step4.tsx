"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { type SaleFormValues } from "./table-sales/types";
import { type Client, type Collaborator } from "@/graphql/generated/graphql";
import { formatPrice, formatDate } from "./table-sales/utils";

interface SalesFormStep4Props {
  formData: SaleFormValues;
  clients: Client[];
  collaborators: Collaborator[];
  onUpdatePayment: (paymentMethod: string, paymentStatus: string) => void;
}

export const SalesFormStep4 = ({
  formData,
  clients,
  collaborators,
  onUpdatePayment,
}: SalesFormStep4Props) => {
  const selectedClient = clients.find((c) => c.id === formData.clientId);
  const selectedCollaborator = formData.collaboratorId
    ? collaborators.find((c) => c.id === formData.collaboratorId)
    : (collaborators.length > 0 ? collaborators[0] : null);
  const total = formData.items.reduce((sum, item) => sum + item.subtotal, 0);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Resumo da Venda</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Revise as informações e finalize a venda.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Cliente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <p className="font-medium">{selectedClient?.fullName || "-"}</p>
              <p className="text-sm text-muted-foreground">{selectedClient?.email || "-"}</p>
              <p className="text-sm text-muted-foreground">{selectedClient?.phone || "-"}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Colaborador</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <p className="font-medium">{selectedCollaborator?.fullName || "-"}</p>
              <p className="text-sm text-muted-foreground">{selectedCollaborator?.email || "-"}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Produtos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {formData.items.map((item) => (
              <div key={item.productId} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{item.productName}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.quantity}x {formatPrice(item.price)}
                  </p>
                </div>
                <p className="font-semibold">{formatPrice(item.subtotal)}</p>
              </div>
            ))}
            <Separator />
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold">Total:</p>
              <p className="text-2xl font-bold">{formatPrice(total)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="paymentMethod">Método de Pagamento</Label>
          <Select
            value={formData.paymentMethod || "CASH"}
            onValueChange={(value) =>
              onUpdatePayment(value, formData.paymentStatus || "PENDING")
            }
          >
            <SelectTrigger id="paymentMethod" className="cursor-pointer">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CASH">Dinheiro</SelectItem>
              <SelectItem value="CREDIT_CARD">Cartão de Crédito</SelectItem>
              <SelectItem value="DEBIT_CARD">Cartão de Débito</SelectItem>
              <SelectItem value="PIX">PIX</SelectItem>
              <SelectItem value="BANK_TRANSFER">Transferência Bancária</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="paymentStatus">Status do Pagamento</Label>
          <Select
            value={formData.paymentStatus || "PENDING"}
            onValueChange={(value) =>
              onUpdatePayment(formData.paymentMethod || "CASH", value)
            }
          >
            <SelectTrigger id="paymentStatus" className="cursor-pointer">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PENDING">Pendente</SelectItem>
              <SelectItem value="PAID">Pago</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
