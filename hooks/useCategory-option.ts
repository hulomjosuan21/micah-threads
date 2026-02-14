import { fetchCategoriesOptions } from "@/actions/fetchCategoriesWithItems";
import { useQuery } from "@tanstack/react-query";

export default function useCategoryOptions() {
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["categories-options"],
    queryFn: fetchCategoriesOptions,
    initialData: [],
  });

  console.log("Category options data:", JSON.stringify(data, null, 2));

  return {
    options: data,
    isError,
    isLoading,
    error,
  };
}
