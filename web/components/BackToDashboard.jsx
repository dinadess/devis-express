import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import { useQuoteFormContext } from "@/lib/QuoteFormContext";
import { useRouter } from "next/navigation";

const BackToDashboard = () => {
  const { resetQuoteForm } = useQuoteFormContext();
  const router = useRouter();

  const handleClick = function () {
    router.push("/");
    resetQuoteForm();
  };

  return (
    <AlertDialog className="!max-w-[28rem] px-4 py-6">
      <AlertDialogTrigger className="font-medium flex items-center gap-2.5 w-fit cursor-pointer">
        <ArrowLeft />
        Retour au dashboard
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-playfair font-bold text-xl">
            Êtes-vous sûr de vouloir partir ?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-black-400">
            Ce devis sera supprimé et cette action sera irréversible. Toute
            votre progression sera perdue.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button
              variant="outline"
              className="px-6 py-3 h-auto cursor-pointer hover:text-white hover:bg-black-400 transition-colors"
            >
              Annuler
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              type="submit"
              className="text-white bg-primary-red hover:text-primary-color-900 hover:bg-secondary-color-500 py-3 h-auto cursor-pointer"
              onClick={handleClick}
            >
              Oui, supprimer le devis
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default BackToDashboard;
