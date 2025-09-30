"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "./ui/textarea";
import { ClientFormSchema } from "@/lib/quote-form-schema";
import { useQuoteFormContext } from "@/lib/QuoteFormContext";

const formSchema = ClientFormSchema.omit({
  id: true,
  createdAt: true,
  updated_at: true,
});

const defaultValues = {
  clientType: "particulier",
  clientLastName: "",
  clientFirstName: "",
  clientPhoneNumber: "",
  clientEmailAddress: "",
  clientPhysicalAddress: "",
  eventName: "",
  companyName: "",
  tvaNumber: "",
  siretNumber: "",
};

const QuoteFormStepOne = () => {
  const quoteFormContext = useQuoteFormContext();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: quoteFormContext.quote,
  });

  function onSubmit(values) {
    quoteFormContext.updateQuoteData(values);
    quoteFormContext.handleNextStep();
  }

  const onError = (errors) => {
    console.log("Erreur de Validation: ", errors);
  };

  const selectedClientType = form.watch("clientType");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="space-y-6"
        name="step-1"
      >
        <h2 className="font-playfair font-bold text-xl mb-7">
          Informations du client
        </h2>
        <FormField
          control={form.control}
          name="clientType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="font-medium">Type de client</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex items-center gap-12"
                >
                  <FormItem className="flex items-center gap-3 cursor-pointer">
                    <FormControl>
                      <RadioGroupItem
                        value="particulier"
                        className="accent-primary-color-500"
                      />
                    </FormControl>
                    <FormLabel className="font-medium">Particulier</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center gap-3 cursor-pointer">
                    <FormControl>
                      <RadioGroupItem
                        value="entreprise"
                        className="accent-primary-color-500"
                      />
                    </FormControl>
                    <FormLabel className="font-medium">Entreprise</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="clientLastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Nom du client</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nom du client"
                    className="placeholder:text-primary-color-900 h-14"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="clientFirstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Prénom du client</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Prénom du client"
                    className="placeholder:text-primary-color-900 h-14"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="clientPhoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Numéro de téléphone</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="Numéro de téléphone"
                    className="placeholder:text-primary-color-900 h-14"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="clientEmailAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Email"
                    className="placeholder:text-primary-color-900 h-14"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="clientPhysicalAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Adresse</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Adresse"
                  className="resize-none placeholder:text-primary-color-900"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div
          className={`${
            selectedClientType && selectedClientType === "entreprise"
              ? "block"
              : "hidden"
          }`}
        >
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Nom de l'entreprise</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nom de l'entreprise"
                      className="placeholder:text-primary-color-900 h-14"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tvaNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">
                    N° TVA Intracommunautaire
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="N° TVA Intracommunautaire"
                      className="placeholder:text-primary-color-900 h-14"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="siretNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Numéro siret</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Numéro siret"
                    className="placeholder:text-primary-color-900 h-14"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="font-playfair font-bold text-xl">Événement</h2>

          <FormField
            control={form.control}
            name="eventName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Nom de l'Événement</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nom de l'Événement"
                    className="placeholder:text-primary-color-900 h-14"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};

export default QuoteFormStepOne;
