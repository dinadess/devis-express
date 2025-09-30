import React from "react";
import AppButton from "./AppButton";
import html2pdf from "html2pdf.js";

const DownloadQuote = ({ eventName }) => {
  const generatePDF = function () {
    const content = document.getElementById("devisPreview");

    html2pdf(content, {
      margin: 10,
      filename: `Devis-${eventName}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, windowWidth: 1024 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    });
  };

  return (
    <div>
      <AppButton onClick={generatePDF}>Télécharger le devis</AppButton>
    </div>
  );
};

export default DownloadQuote;
