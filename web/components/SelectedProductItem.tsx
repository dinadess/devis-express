import { Trash2 } from "lucide-react";
import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useQuoteFormContext } from "@/lib/QuoteFormContext";

const SelectedProductItem = ({ product }) => {
  const quoteFormContext = useQuoteFormContext();

  return (
    <div className="flex flex-col gap-6 p-4 border-b border-b-primary-color-50">
      <section className="flex justify-between items-center flex-wrap gap-4">
        <p>{product.name}</p>
        <button
          onClick={() => quoteFormContext.deleteQuoteProduct(product)}
          className="cursor-pointer"
        >
          <Trash2 className="text-primary-red" />
        </button>
      </section>
      <div className="grid grid-cols-3 gap-4">
        <div className="grid w-full max-w-sm items-center gap-2">
          <Label htmlFor={`${product.name}-quantity`} className="font-medium">
            Quantité
          </Label>
          <Input
            type="number"
            id={`${product.name}-quantity`}
            value={product.quantity}
            onChange={(e) => {
              const parsedValue = parseInt(e.target.value, 10);

              if (!isNaN(parsedValue)) {
                quoteFormContext.updateQuoteProducts(product, e.target.value);
              }
            }}
            min="1"
            className="text-primary-color-900 h-12"
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-2">
          <Label htmlFor={`${product.name}-unitPrice`} className="font-medium">
            Prix unit (€)
          </Label>
          <Input
            type="text"
            id={`${product.name}-unitPrice`}
            value={product.unitPrice}
            readOnly
            className="text-primary-color-900 h-12 cursor-not-allowed"
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-2">
          <Label htmlFor={`${product.name}-vatRate`} className="font-medium">
            VAT (%)
          </Label>
          <Input
            type="text"
            id={`${product.name}-vatRate`}
            value={product.vatRate}
            readOnly
            className="text-primary-color-900 h-12 cursor-not-allowed"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <p className="font-playfair font-extrabold text-2xl">
          {product.totalPrice} €
        </p>
      </div>
    </div>
  );
};

export default SelectedProductItem;
