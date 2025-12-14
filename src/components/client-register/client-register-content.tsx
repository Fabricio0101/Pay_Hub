"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/client-register/data-table";
import { useClients } from "@/hooks/use-clients";
import { useClientMutations } from "@/hooks/use-client-mutations";
import { ClientFormValues } from "@/components/client-register/table-clients/types";

export const ClientRegisterContent = () => {
  const [organizationId, setOrganizationId] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const orgId = localStorage.getItem("organizationId") || undefined;
      setOrganizationId(orgId);
    }
  }, []);

  const { clients, loading, error, refetch } = useClients(organizationId);
  const { createClient, removeClient, loading: mutationsLoading } =
    useClientMutations();

  const handleAddClient = async (clientData: ClientFormValues) => {
    try {
      await createClient({
        fullName: clientData.fullName,
        email: clientData.email,
        phone: clientData.phone,
        birthDate: clientData.birthDate
          ? new Date(clientData.birthDate).toISOString()
          : undefined,
        notes: clientData.notes || undefined,
        collaboratorId: clientData.collaboratorId,
        organizationId: clientData.organizationId,
      });
      await refetch();
    } catch (error) {
      console.error("Erro ao criar cliente:", error);
    }
  };

  const handleDeleteClient = async (id: string) => {
    try {
      await removeClient(id);
      await refetch();
    } catch (error) {
      console.error("Erro ao remover cliente:", error);
    }
  };

  const handleEditClient = (client: any) => {
    // TODO: Implementar edição quando disponível
    console.log("Edit client:", client);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Carregando clientes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-destructive">
          Erro ao carregar clientes: {error.message}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 p-4 lg:p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Bem-vindo de volta!</h1>
        <p className="text-muted-foreground text-lg">
          Aqui está uma lista de seus clientes para este mês.
        </p>
      </div>

      <DataTable
        clients={clients}
        onDeleteClient={handleDeleteClient}
        onEditClient={handleEditClient}
        onAddClient={handleAddClient}
        loading={mutationsLoading}
      />
    </div>
  );
};
