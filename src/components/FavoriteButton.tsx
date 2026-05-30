"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function FavoriteButton({ slug }: { slug: string }) {
  const router = useRouter();
  const clientRef = useRef<ReturnType<typeof createClient> | null>(null);
  const getClient = () => (clientRef.current ??= createClient());
  const [fav, setFav] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const supabase = getClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        setUserId(user.id);
        const { data } = await supabase.from("favorites").select("product_slug").eq("user_id", user.id).eq("product_slug", slug).maybeSingle();
        setFav(!!data);
      } catch {}
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  async function toggle() {
    if (!userId) { router.push("/login?next=" + encodeURIComponent("/coleccion/" + slug)); return; }
    const supabase = getClient();
    if (fav) { setFav(false); await supabase.from("favorites").delete().eq("user_id", userId).eq("product_slug", slug); }
    else { setFav(true); await supabase.from("favorites").insert({ user_id: userId, product_slug: slug }); }
  }

  return (
    <button className={`fav-btn${fav ? " on" : ""}`} onClick={toggle} title={fav ? "Quitar de favoritos" : "Guardar en favoritos"}>
      <span aria-hidden>{fav ? "♥" : "♡"}</span> {fav ? "Guardado" : "Guardar"}
    </button>
  );
}
