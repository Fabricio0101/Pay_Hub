"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ResponsiveDialog } from "@/components/ui/responsive-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, ArrowRight, ArrowLeft, Check } from "lucide-react";
import { useClients } from "@/hooks/use-clients";
import { useProducts } from "@/hooks/use-products";
import { useCollaborators } from "@/hooks/use-collaborators";
import { type SaleFormValues, type SaleItem } from "./table-sales/types";
import { SalesFormStep1 } from "./sales-form-step1";
import { SalesFormStep2 } from "./sales-form-step2";
import { SalesFormStep3 } from "./sales-form-step3";
import { SalesFormStep4 } from "./sales-form-step4";
import { useIsMobile } from "@/hooks/use-mobile";
import { DrawerClose } from "@/components/ui/drawer";

interface SalesFormDrawerProps {
  onAddSale: (saleData: SaleFormValues) => void;
  loading?: boolean;
}

export const SalesFormDrawer = ({ onAddSale, loading }: SalesFormDrawerProps) => {
  const [open, setOpen] = useState(false);
  const [organizationId, setOrganizationId] = useState<string>("");
  const [currentStep, setCurrentStep] = useState("1");
  const [formData, setFormData] = useState<Partial<SaleFormValues>>({
    items: [],
  });
  const isMobile = useIsMobile();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const orgId = localStorage.getItem("organizationId") || "";
      setOrganizationId(orgId);
    }
  }, []);

  const { clients, loading: loadingClients } = useClients(organizationId || undefined);
  const { products, loading: loadingProducts } = useProducts(organizationId || "");
  const { collaborators, loading: loadingCollaborators } = useCollaborators(organizationId || undefined);

  const handleNext = () => {
    const step = parseInt(currentStep);
    if (step < 4) {
      setCurrentStep((step + 1).toString());
    }
  };

  const handlePrevious = () => {
    const step = parseInt(currentStep);
    if (step > 1) {
      setCurrentStep((step - 1).toString());
    }
  };

  const handleSubmit = () => {
    if (!organizationId || !formData.clientId || !formData.items || formData.items.length === 0) {
      return;
    }

    // Se não houver collaboratorId, usar o primeiro disponível ou deixar vazio
    const collaboratorId = formData.collaboratorId || (collaborators.length > 0 ? collaborators[0].id : "");

    onAddSale({
      clientId: formData.clientId,
      collaboratorId,
      items: formData.items,
      paymentMethod: formData.paymentMethod || "CASH",
      paymentStatus: formData.paymentStatus || "PENDING",
      organizationId,
    });

    setFormData({ items: [] });
    setCurrentStep("1");
    setOpen(false);
  };

  const canProceed = () => {
    switch (currentStep) {
      case "1":
        return !!formData.clientId;
      case "2":
        return formData.items && formData.items.length > 0;
      case "3":
        return formData.items && formData.items.every(item => item.quantity > 0);
      case "4":
        return true;
      default:
        return false;
    }
  };

  const trigger = (
    <Button className="cursor-pointer">
      <Plus className="mr-2 h-4 w-4" />
      Nova Venda
    </Button>
  );

  const footer = (
    <div className="flex justify-between gap-2">
      <div>
        {currentStep !== "1" && (
          <Button
            variant="outline"
            onClick={handlePrevious}
            className="cursor-pointer"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Anterior
          </Button>
        )}
      </div>
      <div className="flex gap-2">
        {isMobile ? (
          <DrawerClose asChild>
            <Button variant="outline" className="cursor-pointer">
              Cancelar
            </Button>
          </DrawerClose>
        ) : (
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="cursor-pointer"
          >
            Cancelar
          </Button>
        )}
        {currentStep !== "4" ? (
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="cursor-pointer"
          >
            Próximo
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={!canProceed() || loading}
            className="cursor-pointer"
          >
            {loading ? "Salvando..." : (
              <>
                <Check className="mr-2 h-4 w-4" />
                Finalizar Venda
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={setOpen}
      trigger={trigger}
      title="Nova Venda"
      description="Complete as etapas abaixo para registrar uma nova venda."
      footer={footer}
      contentClassName="max-h-[90vh]"
    >
      <div>
        <Tabs value={currentStep} onValueChange={setCurrentStep} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="1" className="cursor-pointer">
              Cliente
            </TabsTrigger>
            <TabsTrigger value="2" className="cursor-pointer">
              Produtos
            </TabsTrigger>
            <TabsTrigger value="3" className="cursor-pointer">
              Quantidades
            </TabsTrigger>
            <TabsTrigger value="4" className="cursor-pointer">
              Resumo
            </TabsTrigger>
          </TabsList>

          <TabsContent value="1" className="mt-0">
            <SalesFormStep1
              clients={clients as any}
              loading={loadingClients}
              selectedClientId={formData.clientId}
              onSelectClient={(clientId: string) => setFormData({ ...formData, clientId })}
            />
          </TabsContent>

          <TabsContent value="2" className="mt-0">
            <SalesFormStep2
              products={products as any}
              loading={loadingProducts}
              selectedItems={formData.items || []}
              onSelectItems={(items: SaleItem[]) => setFormData({ ...formData, items })}
            />
          </TabsContent>

          <TabsContent value="3" className="mt-0">
            <SalesFormStep3
              items={formData.items || []}
              onUpdateItems={(items: SaleItem[]) => setFormData({ ...formData, items })}
            />
          </TabsContent>

          <TabsContent value="4" className="mt-0">
            <SalesFormStep4
              formData={{
                ...formData,
                collaboratorId: formData.collaboratorId || (collaborators.length > 0 ? collaborators[0].id : ""),
              } as SaleFormValues}
              clients={clients as any}
              collaborators={collaborators as any}
              onUpdatePayment={(paymentMethod: string, paymentStatus: string) =>
                setFormData({ ...formData, paymentMethod, paymentStatus })
              }
            />
          </TabsContent>
        </Tabs>
      </div>
    </ResponsiveDialog>
  );
};
