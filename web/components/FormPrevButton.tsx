import React from "react";
import AppButton from "./AppButton";
import { useQuoteFormContext } from "@/lib/QuoteFormContext";

const FormPrevButton = () => {
  const quoteFormContext = useQuoteFormContext();

  function handleSubmit() {
    quoteFormContext.handlePreviousStep();
  }

  return (
    <AppButton type="button" variant="outline" onClick={handleSubmit}>
      Précédent
    </AppButton>
  );
};

export default FormPrevButton;
