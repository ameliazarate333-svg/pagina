import { createClient } from "@supabase/supabase-js";

/** Cliente anónimo (sin sesión) para leer datos públicos como el catálogo.
 *  Sirve tanto en server components (permite ISR) como en el navegador. */
export function publicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
