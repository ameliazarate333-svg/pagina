import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "Política de Cookies · AZ — Amelia Zárate",
  description: "Cómo usa AZ · Amelia Zárate las cookies: solo técnicas y de sesión, sin publicidad ni rastreo.",
};

export default function Cookies() {
  return (
    <>
      <SiteHeader />
      <section className="wrap">
        <div className="legal">
          <span className="label">Legal</span>
          <h1>Política de Cookies</h1>
          <p className="updated">Última actualización: 30 de mayo de 2026</p>

          <p>En <strong>AZ · Amelia Zárate</strong> usamos cookies de forma mínima y responsable. Aquí te explicamos
            cuáles y para qué.</p>

          <h2>1. ¿Qué son las cookies?</h2>
          <p>Son pequeños archivos que se guardan en tu dispositivo cuando visitas un sitio web, y permiten que
            funcione correctamente y recuerde ciertas acciones.</p>

          <h2>2. ¿Qué cookies usamos?</h2>
          <ul>
            <li><strong>Cookies técnicas y de sesión:</strong> necesarias para mantener tu inicio de sesión y la
              seguridad de tu cuenta mientras navegas.</li>
          </ul>
          <p>No utilizamos cookies de publicidad, de perfilamiento ni de seguimiento de terceros.</p>

          <h2>3. Cómo gestionarlas</h2>
          <p>Puedes ver, bloquear o eliminar las cookies desde la configuración de tu navegador. Ten en cuenta que
            si bloqueas las cookies técnicas, es posible que no puedas iniciar sesión ni usar tu cuenta.</p>

          <h2>4. Más información</h2>
          <p>El tratamiento de tus datos personales se rige por nuestra <Link href="/privacidad">Política de
            Privacidad</Link>.</p>

          <div className="note">¿Preguntas? Escríbenos a <span className="ph">hola@azameliazarate.com</span>.</div>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
