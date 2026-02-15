import { useQuery } from "@tanstack/react-query";
import { User } from "@/types/user";
import { fetchCurrentUser } from "@/actions/user-actions";

export default function useUser() {
  const { data, isLoading, isError, error } = useQuery<User | null>({
    queryKey: ["current-user"],
    queryFn: fetchCurrentUser,
    staleTime: 1000 * 60 * 5,
  });

  return {
    user: data ?? null,
    isLoading,
    isError,
    error,
  };
}
