import { useQuoteFormContext } from "@/lib/QuoteFormContext";
import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const PreviewProductsTable = () => {
  const {
    quote: { products, totalPrice },
  } = useQuoteFormContext();

  const sousTotal = products
    ?.reduce((acc, curVal) => acc + curVal.quantity * curVal.unitPrice, 0)
    ?.toFixed(2);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className="font-bold font-playfair text-xl leading-loose border-b-2 border-b-black-400 hover:bg-transparent">
            <TableHead className="w-[200px]">Produit</TableHead>
            <TableHead>Qté</TableHead>
            <TableHead>Prix unit</TableHead>
            <TableHead className="">VAT</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow
              key={product.id}
              className="font-medium hover:bg-transparent border-b-0"
            >
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>{product.unitPrice}€</TableCell>
              <TableCell>{product.vatRate}%</TableCell>
              <TableCell className="text-right">
                {product.totalPrice}€
              </TableCell>
            </TableRow>
          ))}

          <TableRow className="font-medium hover:bg-transparent border-b-0">
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell colSpan="2">Sous-total</TableCell>
            <TableCell className="text-right">{sousTotal}€</TableCell>
          </TableRow>

          <TableRow className="font-medium hover:bg-transparent border-b-0">
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell colSpan="2" className="border-b border-b-black-50">
              Total VAT
            </TableCell>
            <TableCell className="text-right border-b border-b-black-50">
              {(totalPrice - sousTotal).toFixed(2)}€
            </TableCell>
          </TableRow>

          <TableRow className="font-bold font-playfair text-xl hover:bg-transparent border-b-0">
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell colSpan="2">Total (VAT inclus)</TableCell>
            <TableCell className="text-right">{totalPrice}€</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default PreviewProductsTable;
