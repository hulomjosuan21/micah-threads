import { fetchCategoriesOptions } from "@/actions/fetchCategoriesWithItems";
import { useQuery } from "@tanstack/react-query";

export default function useCategoryOptions() {
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["categories-options"],
    queryFn: fetchCategoriesOptions,
    staleTime: Infinity,
    initialData: [],
  });

  return {
    options: data,
    isError,
    isLoading,
    error,
  };
}
