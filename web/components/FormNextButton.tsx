import React, { useEffect, useState } from "react";
import AppButton from "./AppButton";
import { useQuoteFormContext } from "@/lib/QuoteFormContext";

const FormNextButton = () => {
  const { currentStep, quote, handleNextStep } = useQuoteFormContext();

  const disabled = currentStep === 2 && quote.products.length === 0;

  function handleSubmit() {
    if (currentStep === 1) {
      const form = document.querySelector(
        "form[name='step-1'"
      ) as HTMLFormElement;
      form?.requestSubmit();
    }
    if (currentStep === 2) {
      if (quote.products.length > 0) {
        handleNextStep();
      }
    }
  }

  return (
    <AppButton type="submit" onClick={handleSubmit} disabled={disabled}>
      Suivant
    </AppButton>
  );
};

export default FormNextButton;
