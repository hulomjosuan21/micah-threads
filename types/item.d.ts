export type Item = {
  productId: string;
  itemName: string;
  description: string | null;
  variantLabel: string | null;
  itemCode: string;
  price: number;
  stock: number;
  imagesPatchs: string[];
  createdAt: string;
  categoryId: string;
};
