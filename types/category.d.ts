export type Category = {
  categoryId: string;
  label: string;
};

export type CategoryWithItemCountRow = Category & {
  itemCount: number;
};
