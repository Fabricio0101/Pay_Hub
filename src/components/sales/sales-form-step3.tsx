"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type SaleItem } from "./table-sales/types";
import { formatPrice } from "./table-sales/utils";

interface SalesFormStep3Props {
  items: SaleItem[];
  onUpdateItems: (items: SaleItem[]) => void;
}

export const SalesFormStep3 = ({ items, onUpdateItems }: SalesFormStep3Props) => {
  const handleQuantityChange = (productId: string, quantity: number) => {
    const updatedItems = items.map((item) => {
      if (item.productId === productId) {
        const qty = Math.max(1, quantity);
        return {
          ...item,
          quantity: qty,
          subtotal: item.price * qty,
        };
      }
      return item;
    });
    onUpdateItems(updatedItems);
  };

  const total = items.reduce((sum, item) => sum + item.subtotal, 0);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Defina as Quantidades</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Ajuste a quantidade de cada produto selecionado.
        </p>
      </div>
      <div className="space-y-4 max-h-[400px] overflow-y-auto">
        {items.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            Nenhum produto selecionado. Volte à etapa anterior para selecionar produtos.
          </p>
        ) : (
          items.map((item) => (
            <Card key={item.productId}>
              <CardHeader>
                <CardTitle className="text-base">{item.productName}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`quantity-${item.productId}`}>Quantidade</Label>
                      <Input
                        id={`quantity-${item.productId}`}
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(item.productId, parseInt(e.target.value) || 1)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Preço Unitário</Label>
                      <div className="flex items-center h-10 px-3 border rounded-md bg-muted">
                        {formatPrice(item.price)}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="text-right">
                      <span className="text-sm text-muted-foreground">Subtotal: </span>
                      <span className="text-lg font-semibold">
                        {formatPrice(item.subtotal)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
      {items.length > 0 && (
        <div className="border-t pt-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-2xl font-bold">{formatPrice(total)}</span>
          </div>
        </div>
      )}
    </div>
  );
};
