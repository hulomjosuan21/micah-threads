import ForgotPasswordForm from "@/hooks/ForgotPasswordForm";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params = await searchParams;
  const message = params.message;
  const isSuccess = params.success === "true";

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <ForgotPasswordForm message={message} isSuccess={isSuccess} />
    </div>
  );
}
