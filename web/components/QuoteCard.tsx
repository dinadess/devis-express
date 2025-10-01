import { Download, Eye } from "lucide-react";
import React from "react";

const QuoteCard = ({
  id,
  slug,
  clientLastName,
  clientFirstName,
  eventName,
  totalPrice,
  createdAt,
}) => {
  const formattedDate = new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "short",
  }).format(new Date(createdAt));
  const formattedPrice = new Intl.NumberFormat("fr-FR").format(totalPrice);

  return (
    <div className="border-2 border-gray-100 bg-white rounded-[0.625rem] px-3 py-4 flex flex-row flex-wrap justify-between gap-4">
      <section className="flex flex-col gap-1.5">
        <p className="font-medium uppercase">
          {slug
            ? slug
            : `DEV-${new Date().getFullYear()}-${String(id).padStart(3, "0")}`}
        </p>
        <p className="text-xs">{clientLastName + " " + clientFirstName}</p>
        <p className="text-xs">{eventName}</p>
      </section>
      <section className="flex items-center gap-8">
        <div>
          <p className="font-semibold text-xl">{formattedPrice} €</p>
          <p className="text-xs">{formattedDate}</p>
        </div>
        <div className="flex items-center gap-5">
          <button className="cursor-pointer p-1">
            <Eye className="text-primary-color-500 text-2xl" />
            <span className="sr-only">Voir</span>
          </button>
          <button className="cursor-pointer p-1">
            <Download className="text-primary-color-500 text-2xl" />
            <span className="sr-only">Télécharger</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default QuoteCard;
