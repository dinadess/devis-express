import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { SearchProductResults } from "./SearchProductResults";
import SelectedProductItem from "./SelectedProductItem";
import { useQuoteFormContext } from "@/lib/QuoteFormContext";
import { AddProductDialog } from "./AddProductDialog";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/app/hooks/useDebounce";
import { Product } from "@/types/product";

const API_URL = "http://localhost:1337/api";

const fetchProducts = async function (searchText: string) {
  if (!searchText) {
    return [];
  }

  const response = await fetch(
    `${API_URL}/products?filters[name][$containsi]=${searchText}`
  );

  return response.json();
};

const QuoteFormStepTwo = () => {
  const quoteFormContext = useQuoteFormContext();

  const selectedProducts = quoteFormContext.quote.products;

  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 500);

  const { isPending, data, error } = useQuery({
    queryKey: ["products", debouncedSearchText],
    queryFn: () => fetchProducts(debouncedSearchText),
    select: (res) => {
      if (res.data) {
        const productsByCategory = Object.groupBy(
          res?.data,
          (product: Product) => product.category
        );
        return productsByCategory;
      }
      return {};
    },
  });

  return (
    <div className="grid md:grid-cols-[1fr_2px_1fr] gap-8">
      <div className="flex flex-col gap-3 pb-8">
        <h2 className="font-playfair font-bold text-xl mb-5">
          Sélection des produits
        </h2>

        <div className="">
          <Label htmlFor="searchProduct" className="sr-only">
            Rechercher un élément du menu
          </Label>
          <Input
            type="search"
            id="searchProduct"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Rechercher un élément du menu"
            className="font-medium py-2 h-auto bg-white placeholder:text-black-400"
          />
        </div>

        <AddProductDialog />

        {searchText.length > 0 && (
          <SearchProductResults
            isPending={isPending}
            error={error?.message}
            productData={data}
            searchText={searchText}
          />
        )}
      </div>

      <hr className="bg-gray-50 w-0.5 h-auto" />

      <div className="flex flex-col gap-5">
        <h2 className="font-playfair font-bold text-xl">
          Produits sélectionnés
        </h2>

        {selectedProducts?.map((product) => (
          <SelectedProductItem key={product.productId} product={product} />
        ))}

        {selectedProducts?.length > 0 && (
          <div className="font-playfair flex justify-between items-center gap-4">
            <p className="font-black text-xl">Total (VAT inclu)</p>
            <p className="font-extrabold text-2xl">
              {quoteFormContext.quote.totalPrice} €
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuoteFormStepTwo;
