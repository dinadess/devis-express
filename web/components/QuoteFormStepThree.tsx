import React from "react";
import Logo from "@/public/images/lheritage-logo.png";
import { useQuoteFormContext } from "@/lib/QuoteFormContext";
import Image from "next/image";
import PreviewProductsTable from "./PreviewProductsTable";
import DownloadQuote from "./DownloadQuote";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Quote } from "@/types/quote";

const QuoteFormStepThree = () => {
  const router = useRouter();

  const quoteTempId = `DEV-${new Date().getFullYear()}-00X`;

  const { quote } = useQuoteFormContext();

  const formattedDate = new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "full",
  }).format(new Date());

  const createQuote = async function (quoteData: Quote) {
    const res = await fetch(`http://localhost:1337/api/quotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: quoteData }),
    });

    const json = await res.json();

    if (!json.data) {
      throw new Error(json?.error?.message || "Une erreur est survenue.");
    }

    return json.data;
  };

  const mutation = useMutation({
    mutationFn: createQuote,
    onSuccess: () => {
      toast.success("Devis ajouté avec succès.");
      router.push("/");
    },
    onError: () => {
      toast.error("Une erreur est survenue lors de l'ajout du devis.");
    },
  });

  function handleClick() {
    mutation.mutate(quote);
  }

  return (
    <div>
      <section className="flex justify-between items-center flex-wrap gap-4 mb-8">
        <h2 className="font-playfair font-bold text-xl">
          Prévisualisation du devis
        </h2>

        <DownloadQuote eventName={quote?.eventName} onSaveQuote={handleClick} />
      </section>

      <section
        id="devisPreview"
        className="max-w-2xl border border-black-100 p-8 flex flex-col gap-10 mx-auto"
      >
        <div className="flex justify-between items-center flex-wrap gap-4">
          <Image src={Logo} alt="L'Héritage 105" />

          <div className="flex flex-col gap-1.5">
            <h2 className="font-extrabold font-playfair text-2xl">
              Devis {quote?.eventName}
            </h2>
            <p className="text-xs">{quoteTempId}</p>
            <p className="text-xs capitalize">{formattedDate}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <section className="flex flex-col gap-1.5">
            <h3 className="font-playfair font-bold text-xl">
              L&#39;Héritage 105
            </h3>
            <p className="text-xs">
              105 Rue du Faubourg Saint-Honoré <br /> 75008 PARIS 08, France
            </p>
            <p className="text-xs">Tel : +33 9 66 82 41 08</p>
            <p className="text-xs">direction@lheritage105.com</p>
            <p className="text-xs">
              N° TVA Intracommunautaire : <br /> FR74984132274
            </p>
            <p className="text-xs">N° SIRET : 98413227400023</p>
            <p className="text-xs">Code NAF : 5610A</p>
            <p className="text-xs">RCS : Paris</p>
            <p className="text-xs">Capital : 1 000 €</p>
          </section>

          <section className="flex flex-col gap-1.5">
            <h3 className="font-playfair font-bold text-xl">
              {quote.clientLastName + " " + quote.clientFirstName}
            </h3>
            <p className="text-xs">{quote.clientPhoneNumber}</p>
            <p className="text-xs">{quote.clientEmailAddress}</p>
            <p className="text-xs">{quote.clientPhysicalAddress}</p>
            <p className="text-xs">{quote?.companyName}</p>
            <p className="text-xs">{quote?.tvaNumber}</p>
            <p className="text-xs">{quote?.siretNumber}</p>
          </section>
        </div>

        <PreviewProductsTable />

        <hr className="bg-black-50" />

        <div className="mb-8">
          <p className="text-primary-color-500 text-xs text-center">
            Merci de choisir L&#39;Héritage 105 pour votre événement
          </p>
        </div>
      </section>
    </div>
  );
};

export default QuoteFormStepThree;
