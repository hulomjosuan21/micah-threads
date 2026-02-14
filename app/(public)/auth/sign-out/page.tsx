import { createClient } from "@/lib/supabase/server";
import SignOutScreen from "./SignOutPage";

export default async function Page() {
  const supabase = await createClient();
  await supabase.auth.signOut();

  return <SignOutScreen />;
}
