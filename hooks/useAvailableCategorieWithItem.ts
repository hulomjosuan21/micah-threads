import { fetchAvailableCategorieWithItem } from "@/actions/category-actions";
import { useQuery } from "@tanstack/react-query";

export default function useAvailableCategorieWithItem() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["availableCategorieWithItem"],
    queryFn: fetchAvailableCategorieWithItem,
  });

  return {
    categories: data ?? [],
    categoriesIsLoading: isLoading,
    categoriesIsError: isError,
    categoriesError: error,
  };
}
