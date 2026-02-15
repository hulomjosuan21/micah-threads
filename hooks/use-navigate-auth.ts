import { useRouter } from "next/navigation";

export default function useAuthNavigation() {
  const router = useRouter();

  const handleNavigatoSignIn = () => {
    router.push("/auth/sign-in");
  };

  const handleNavigateSignUp = () => {
    router.push("/auth/sign-up");
  };

  const handleNavigateForgotPassword = () => {
    router.push("/forgot-password");
  };

  return {
    handleNavigatoSignIn,
    handleNavigateSignUp,
    handleNavigateForgotPassword,
  };
}
