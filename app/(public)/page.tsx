import { createClient } from "@/lib/supabase/server";
import PublicHomePage from "./PublicHomePage";

export default async function page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <PublicHomePage user={user} />;
}
