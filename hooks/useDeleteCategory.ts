import { deleteCategory } from "@/actions/category-actions";
import queryClient from "@/lib/queryClient";
import { toast } from "sonner";

export default function useDeleteCategory() {
  const handleDeleteCategory = (categoryId: string) => {
    toast.promise(
      async () => {
        await deleteCategory(categoryId);
      },
      {
        loading: "Deleting category...",
        success: async () => {
          await queryClient.invalidateQueries({
            queryKey: ["categories-with-item-count"],
          });
          return "Category deleted successfully!";
        },
        error: "Failed to delete category",
      },
    );
  };

  return { handleDeleteCategory };
}
