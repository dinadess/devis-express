import { useQuoteFormContext } from "@/lib/QuoteFormContext";
import React from "react";

const ProgressItem = ({ step, label }) => {
  const { currentStep } = useQuoteFormContext();

  const isActive = step <= currentStep;

  return (
    <div className="flex items-center gap-2">
      <div
        className={`size-6 text-sm rounded-full text-white flex justify-center items-center ${
          isActive ? "bg-black-400" : "bg-gray-100"
        }`}
      >
        {step}
      </div>
      <p>{label}</p>
    </div>
  );
};

export default ProgressItem;
