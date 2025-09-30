import React, { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { SearchProductResults } from "./SearchProductResults";
import SelectedProductItem from "./SelectedProductItem";
import { useQuoteFormContext } from "@/lib/QuoteFormContext";
import { AddProductDialog } from "./AddProductDialog";

const QuoteFormStepTwo = () => {
  const quoteFormContext = useQuoteFormContext();

  const selectedProducts = quoteFormContext.quote.products;

  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (!searchText) {
      setProductData([]);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetch("/product-data.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        const filteredData = jsonData.filter((product) =>
          product.name.toLowerCase().includes(searchText)
        );

        const productsByCategory = Object.groupBy(
          filteredData,
          (product) => product.category
        );
        setProductData(productsByCategory);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const timeoutId = setTimeout(() => {
      fetchData();
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchText]);

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
            loading={loading}
            error={error}
            productData={productData}
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
          <SelectedProductItem key={product.id} product={product} />
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
