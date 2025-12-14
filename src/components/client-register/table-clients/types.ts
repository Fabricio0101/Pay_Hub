import { type Client } from "@/graphql/generated/graphql";

export interface ClientTableType extends Client {}

export interface ClientFormValues {
  fullName: string;
  email: string;
  phone: string;
  birthDate?: string;
  notes?: string;
  collaboratorId: string;
  organizationId: string;
}

export interface DataTableProps {
  clients: ClientTableType[];
  onDeleteClient: (id: string) => void;
  onEditClient: (client: ClientTableType) => void;
  onAddClient: (clientData: ClientFormValues) => void;
  loading?: boolean;
}
