import { z } from "zod";

export const ClientFormSchema = z
  .object({
    id: z.string(),
    clientType: z.enum(["particulier", "entreprise"]),
    clientLastName: z
      .string()
      .trim()
      .min(2, "Champ requis : Minimum 2 caractères"),
    clientFirstName: z
      .string()
      .trim()
      .min(2, "Champ requis : Minimum 2 caractères"),
    clientPhoneNumber: z
      .string()
      .regex(
        /^0[1-9]\d{8}$/,
        "Ce champ doit contenir un numéro de téléphone français valide"
      )
      .trim(),
    clientEmailAddress: z.email("Adresse mail invalide").trim(),
    clientPhysicalAddress: z
      .string()
      .trim()
      .min(5, "Champ requis : Minimum 5 caractères"),
    companyName: z
      .string()
      .regex(/^\S.+$/, "Champ requis")
      .trim()
      .or(z.literal(""))
      .optional(),
    tvaNumber: z
      .string()
      .regex(/^\d{14}$/, "Le numéro TVA doit contenir exactement 14 chiffres")
      .trim()
      .or(z.literal(""))
      .optional(),
    siretNumber: z
      .string()
      .regex(
        /^[a-zA-Z]{2}\d{9}$/,
        "Le numéro SIRET doit commencer par 2 lettres suivies de 9 chiffres"
      )
      .trim()
      .or(z.literal(""))
      .optional(),
    eventName: z.string().trim().min(3, "Champ requis : Minimum 3 caractères"),
    created_at: z.iso.datetime(),
    updated_at: z.iso.datetime(),
  })
  .superRefine((data, ctx) => {
    if (data.clientType === "entreprise") {
      if (!data.companyName || data.companyName.trim() === "") {
        return ctx.addIssue({
          code: "custom",
          message: "Ce champ est requis.",
          path: ["companyName"],
        });
      }
      if (!data.tvaNumber) {
        return ctx.addIssue({
          message: "Ce champ est requis.",
        });
      }
      if (!data.siretNumber) {
        return ctx.addIssue({
          message: "Ce champ est requis.",
        });
      }
    }
  });

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  quantity: z.string(),
});
