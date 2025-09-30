import React from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { useQuoteFormContext } from "@/lib/QuoteFormContext";

const SearchProductItem = ({ product }) => {
  const quoteFormContext = useQuoteFormContext();

  const handleClick = function (product) {
    const newProduct = {
      productId: product.id,
      name: product.name,
      category: product.category,
      unitPrice: product.unitPrice,
      vatRate: product.vatRate,
    };

    quoteFormContext.updateQuoteProducts(newProduct);
  };

  return (
    <li className="border border-b-black-50 p-3 rounded-primary-button">
      <h3 className="font-medium mb-3">{product.name}</h3>
      <div className="flex justify-between items-center gap-4">
        <p className="font-playfair font-extrabold text-2xl">
          {product.unitPrice} €
        </p>
        <Button
          variant="secondary"
          size="icon"
          className="size-8 bg-primary-color-50 cursor-pointer"
          onClick={() => handleClick(product)}
        >
          <Plus />
        </Button>
      </div>
    </li>
  );
};

export default SearchProductItem;
