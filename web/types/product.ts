export interface Product {
  productId?: number | string;
  name: string;
  category: string;
  unitPrice: number | string;
  vatRate: number | string;
  quantity?: number;
  totalPrice?: number;
}
