import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";
import productCategories from "@/lib/data/category-data";

const tauxTVAValides = ["0", "2.1", "5.5", "10", "20"];

const productSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  category: z.string().min(1, "La catégorie est requise"),
  unitPrice: z.coerce
    .number()
    .min(1, "Le prix unitaire doit être au minimum de 1€"),
  vatRate: z.preprocess(
    (val) => (typeof val === "string" ? parseFloat(val) : val),
    z.number().refine((val) => tauxTVAValides.includes(String(val)), {
      message: "Taux de TVA invalide.",
    })
  ),
});

const defaultValues = {
  name: "",
  category: "",
  unitPrice: "",
  vatRate: "",
};

export function AddProductDialog() {
  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues,
  });

  const mutation = useMutation({
    mutationFn: (formData) => {
      return fetch(`http://localhost:1337/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: formData }),
      });
    },
    onSuccess: () => {
      toast.success("Produit ajouté avec succès.");
      form.reset();
      setOpen(false);
    },
    onError: () => {
      toast.error("Une erreur est survenue lors de l'ajout du produit.");
    },
  });

  function onSubmit(data) {
    mutation.mutate(data);
  }

  const onError = (errors) => {
    console.log("Validation errors", errors);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="px-6 py-3 h-auto cursor-pointer hover:text-white hover:bg-black-400 transition-colors w-fit"
        >
          <Plus />
          Ajouter un produit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] overflow-y-scroll max-h-screen">
        <DialogHeader>
          <DialogTitle className="font-bold text-xl font-playfair">
            Ajouter un nouveau produit
          </DialogTitle>
          <DialogDescription className="text-black-400">
            Ajouter un produit n'existant pas dans le menu
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            onError={onError}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom du produit</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nom du produit"
                      className="placeholder:text-primary-color-900 h-12"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Catégorie</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="!h-12 w-full">
                        <SelectValue placeholder="Catégorie" />
                      </SelectTrigger>

                      <SelectContent>
                        {productCategories.map((category) => (
                          <SelectItem value={category.label} key={category.id}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="unitPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prix unitaire (€)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Prix unitaire"
                      className="placeholder:text-primary-color-900 h-12"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="vatRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>VAT (%)</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="!h-12 w-full">
                        <SelectValue placeholder="VAT (%)" />
                      </SelectTrigger>

                      <SelectContent>
                        {tauxTVAValides.map((vat) => (
                          <SelectItem value={vat} key={vat}>
                            {vat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end items-center gap-4">
              <DialogClose asChild>
                <Button
                  variant="outline"
                  className="px-6 py-3 h-auto cursor-pointer hover:text-white hover:bg-black-400 transition-colors"
                >
                  Annuler
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="text-white bg-primary-color-500 hover:text-primary-color-900 hover:bg-secondary-color-500 py-3 h-auto cursor-pointer"
                disabled={mutation.isPending}
              >
                {mutation.isPending
                  ? "Création en cours..."
                  : "Créer le produit"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
