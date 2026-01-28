"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type Client } from "@/graphql/generated/graphql";

interface SalesFormStep1Props {
  clients: Client[];
  loading: boolean;
  selectedClientId?: string;
  onSelectClient: (clientId: string) => void;
}

export const SalesFormStep1 = ({
  clients,
  loading,
  selectedClientId,
  onSelectClient,
}: SalesFormStep1Props) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Selecione o Cliente</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Escolha o cliente para esta venda.
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="client">Cliente</Label>
        <Select
          value={selectedClientId}
          onValueChange={onSelectClient}
          disabled={loading}
        >
          <SelectTrigger id="client" className="cursor-pointer">
            <SelectValue placeholder="Selecione um cliente" />
          </SelectTrigger>
          <SelectContent>
            {clients.map((client) => (
              <SelectItem key={client.id} value={client.id}>
                {client.fullName} - {client.email}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
