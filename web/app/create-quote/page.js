"use client";

import BackToDashboard from "@/components/BackToDashboard";
import FormNextButton from "@/components/FormNextButton";
import FormPrevButton from "@/components/FormPrevButton";
import FormProgress from "@/components/FormProgress";
import QuoteFormStepOne from "@/components/QuoteFormStepOne";
import QuoteFormStepThree from "@/components/QuoteFormStepThree";
import QuoteFormStepTwo from "@/components/QuoteFormStepTwo";
import { useQuoteFormContext } from "@/lib/QuoteFormContext";
import React from "react";

const CreateQuotePage = () => {
  const { currentStep, quote } = useQuoteFormContext();

  return (
    <div className="container flex flex-col gap-6 py-12 xl:w-[80dvw] xl:max-w-5xl">
      <div>
        <BackToDashboard />
      </div>

      <div className="bg-white rounded-[0.625rem] px-4 py-5 flex flex-col gap-8">
        <h1 className="font-playfair font-extrabold text-2xl">Nouveau devis</h1>

        <FormProgress currentStep={currentStep} />
      </div>

      <div className="bg-white rounded-[0.625rem] px-4 py-5">
        {currentStep === 1 && <QuoteFormStepOne />}
        {currentStep === 2 && <QuoteFormStepTwo />}
        {currentStep === 3 && <QuoteFormStepThree />}
      </div>

      <div className="flex justify-between items-center gap-4">
        {currentStep > 1 && <FormPrevButton />}

        {currentStep < 3 && (
          <div className="ml-auto">
            <FormNextButton />
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateQuotePage;
