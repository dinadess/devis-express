import React from "react";
import { Progress } from "./ui/progress";
import ProgressItem from "./ProgressItem";

const progressItems = [
  {
    step: 1,
    label: "Informations du client",
  },
  {
    step: 2,
    label: "Sélection des produits",
  },
  {
    step: 3,
    label: "Prévisualisation",
  },
];

const INITIAL_PROGRESS_VALUE = 25;

const FormProgress = ({ currentStep }) => {
  return (
    <div className="flex flex-col gap-6">
      <Progress
        value={INITIAL_PROGRESS_VALUE * currentStep}
        className="bg-gray-50 [&>div]:bg-primary-color-500"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {progressItems.map((item) => (
          <ProgressItem key={item.step} step={item.step} label={item.label} />
        ))}
      </div>
    </div>
  );
};

export default FormProgress;
