import AppButton from "@/components/AppButton";
import QuoteCard from "@/components/QuoteCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function Home() {
  const res = await fetch(`http://content:1337/api/quotes`);
  const { data } = await res.json();
  const quotes = data;

  return (
    <div className="container flex flex-col items-center gap-12 py-12">
      <section className="flex flex-col items-center gap-6 text-center">
        <h1 className="text-4xl font-bold font-playfair">
          Générez votre nouveau devis
        </h1>
        <p className="">Générez votre nouveau devis</p>
        <AppButton link>
          <Link href="/create-quote">Créer un nouveau devis</Link>
        </AppButton>
      </section>
      <div>
        <h2 className="font-semibold">
          Vous avez généré{" "}
          <span className="text-secondary-color-500">
            {quotes?.length || "0"} devis
          </span>{" "}
          au total
        </h2>
      </div>
      <div className="flex flex-col gap-6">
        <h2 className="font-extrabold text-2xl">Récemment générés</h2>

        <div className="max-w-2xl w-[80dvw]">
          <div className="mb-6">
            <Label htmlFor="searchQuote" className="sr-only">
              Rechercher un devis
            </Label>
            <Input
              type="search"
              id="searchQuote"
              placeholder="Rechercher un devis"
              className="font-medium py-2 h-auto bg-white placeholder:text-black-400"
            />
          </div>

          {quotes?.length > 0 ? (
            <div className="flex flex-col gap-3">
              {quotes?.map((quote) => (
                <QuoteCard key={quote.id} {...quote} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-center">Aucun devis créé.</p>
          )}
        </div>

        {quotes?.length > 0 && (
          <div className="flex justify-center">
            <Link
              href="/"
              className="font-semibold text-primary-color-500 border-b-2 border-b-primary-color-500"
            >
              Voir plus
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
