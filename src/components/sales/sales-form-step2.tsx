"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type Product } from "@/graphql/generated/graphql";
import { type SaleItem } from "./table-sales/types";
import { formatPrice } from "./table-sales/utils";

interface SalesFormStep2Props {
  products: Product[];
  loading: boolean;
  selectedItems: SaleItem[];
  onSelectItems: (items: SaleItem[]) => void;
}

export const SalesFormStep2 = ({
  products,
  loading,
  selectedItems,
  onSelectItems,
}: SalesFormStep2Props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleProduct = (product: Product) => {
    const existingItem = selectedItems.find((item) => item.productId === product.id);
    
    if (existingItem) {
      onSelectItems(selectedItems.filter((item) => item.productId !== product.id));
    } else {
      onSelectItems([
        ...selectedItems,
        {
          productId: product.id,
          productName: product.name,
          price: product.price,
          quantity: 1,
          subtotal: product.price,
        },
      ]);
    }
  };

  const isProductSelected = (productId: string) => {
    return selectedItems.some((item) => item.productId === productId);
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Selecione os Produtos</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Escolha os produtos que serão vendidos.
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="search">Buscar Produto</Label>
        <Input
          id="search"
          placeholder="Digite o nome do produto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto">
        {loading ? (
          <p className="text-muted-foreground">Carregando produtos...</p>
        ) : filteredProducts.length === 0 ? (
          <p className="text-muted-foreground">Nenhum produto encontrado.</p>
        ) : (
          filteredProducts.map((product) => {
            const isSelected = isProductSelected(product.id);
            return (
              <Card
                key={product.id}
                className={`cursor-pointer transition-colors ${
                  isSelected ? "border-primary bg-primary/5" : ""
                }`}
                onClick={() => handleToggleProduct(product)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-base">{product.name}</CardTitle>
                      {product.description && (
                        <CardDescription className="mt-1">
                          {product.description}
                        </CardDescription>
                      )}
                    </div>
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => handleToggleProduct(product)}
                      className="mt-1"
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {product.productCategory?.name || "Sem categoria"}
                    </span>
                    <span className="text-lg font-semibold">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};
