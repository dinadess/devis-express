import { createContext, useContext, useState } from "react";
import { Quote } from "@/types/quote";
import { Product } from "@/types/product";

interface QuoteFormContextType {
  currentStep: number;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
  quote: Quote;
  updateQuoteData: (quote: Partial<Quote>) => void;
  updateQuoteProducts: (product: Product, quantity: string) => void;
  deleteQuoteProduct: (product: Product) => void;
  resetQuoteForm: () => void;
}

const initialValues: Quote = {
  clientType: "particulier",
  clientLastName: "",
  clientFirstName: "",
  clientPhoneNumber: "",
  clientEmailAddress: "",
  clientPhysicalAddress: "",
  eventName: "",
  companyName: "",
  tvaNumber: "",
  siretNumber: "",
  totalPrice: 0,
  products: [],
};

const QuoteFormContext = createContext<QuoteFormContextType | null>(null);

export function QuoteFormProvider({ children }) {
  const [currentStep, setCurrentStep] = useState(1);

  const [quote, setQuote] = useState(initialValues);

  const handleNextStep = function () {
    if (currentStep < 3) {
      setCurrentStep((s) => s + 1);
    }
  };

  const handlePreviousStep = function () {
    if (currentStep > 1) {
      setCurrentStep((s) => s - 1);
    }
  };

  const updateQuoteData = function (values: Partial<Quote>) {
    setQuote({ ...quote, ...values });
  };

  const getProductTotalPrice = function (
    unitPrice: number,
    vatRate: number,
    quantity: number
  ) {
    return parseFloat(
      (unitPrice * quantity + unitPrice * quantity * (vatRate / 100)).toFixed(2)
    );
  };

  const getQuoteTotalPrice = function (quoteProducts: Product[]) {
    const quoteTotalPrice = quoteProducts.reduce(
      (acc, curVal) => acc + curVal.totalPrice,
      0
    );

    return quoteTotalPrice;
  };

  const updateQuoteProducts = function (
    productToAdd: Product,
    newQuantity: string
  ) {
    const validQuantity = parseInt(newQuantity)
      ? Math.max(1, parseInt(newQuantity))
      : null;

    setQuote((prevQuote) => {
      const seletedProducts = prevQuote.products;

      const product = seletedProducts.find(
        (p) => p.productId === productToAdd.productId
      );

      if (product) {
        const updatedSeletedProducts = seletedProducts.map((item) =>
          item.productId === product.productId
            ? {
                ...item,
                quantity: validQuantity ? validQuantity : item.quantity + 1,
                totalPrice: getProductTotalPrice(
                  Number(item.unitPrice),
                  Number(item.vatRate),
                  validQuantity ? validQuantity : item.quantity + 1
                ),
              }
            : item
        );
        return { ...prevQuote, products: updatedSeletedProducts };
      } else {
        return {
          ...prevQuote,
          products: [
            ...seletedProducts,
            {
              ...productToAdd,
              quantity: 1,
              totalPrice: getProductTotalPrice(
                Number(productToAdd.unitPrice),
                Number(productToAdd.vatRate),
                1
              ),
            },
          ],
        };
      }
    });
    setQuote((prevQuote) => {
      const seletedProducts = prevQuote.products;

      const quoteTotalPrice = getQuoteTotalPrice(seletedProducts);

      return {
        ...prevQuote,
        totalPrice: quoteTotalPrice,
        products: seletedProducts,
      };
    });
  };

  const deleteQuoteProduct = function (product: Product) {
    setQuote((prevQuote) => {
      const seletedProducts = prevQuote.products;

      const updatedProducts = seletedProducts.filter(
        (p) => p.productId !== product.productId
      );
      const quoteTotalPrice = getQuoteTotalPrice(updatedProducts);

      return {
        ...prevQuote,
        totalPrice: quoteTotalPrice,
        products: updatedProducts,
      };
    });
  };

  const resetQuoteForm = function () {
    setQuote(initialValues);
    setCurrentStep(1);
  };

  return (
    <QuoteFormContext
      value={{
        currentStep,
        handleNextStep,
        handlePreviousStep,
        quote,
        updateQuoteData,
        updateQuoteProducts,
        deleteQuoteProduct,
        resetQuoteForm,
      }}
    >
      {children}
    </QuoteFormContext>
  );
}

export const useQuoteFormContext = function () {
  const context = useContext(QuoteFormContext);

  if (!context) {
    throw new Error(
      "useQuoteFormContext must be called inside a QuoteFormContext"
    );
  }

  return context;
};
