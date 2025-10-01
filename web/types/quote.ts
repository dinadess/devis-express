import { Product } from "./product";

export interface Quote {
  clientType: "particulier" | "entreprise";
  clientLastName: string;
  clientFirstName: string;
  clientPhoneNumber: string;
  clientEmailAddress: string;
  clientPhysicalAddress: string;
  eventName: string;
  companyName: string;
  tvaNumber: string;
  siretNumber: string;
  totalPrice: number;
  products: Product[];
}
