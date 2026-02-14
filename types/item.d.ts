import { Category } from "./category";

export type Item = {
  productId: string;
  itemName: string;
  description: string | null;
  variantLabel: string | null;
  itemCode: string;
  price: number;
  stock: number;
  imagesPaths: string[];
  createdAt: string;
  categoryId: string;
};

export type ItemRow = Omit<Item, "categoryId"> & {
  category: Category;
};
