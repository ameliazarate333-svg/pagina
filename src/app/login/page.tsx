import { Suspense } from "react";
import LoginForm from "@/components/LoginForm";

export const metadata = { title: "Acceder · AZ — Amelia Zárate" };

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="acct"><div className="loader">Cargando…</div></div>}>
      <LoginForm />
    </Suspense>
  );
}
