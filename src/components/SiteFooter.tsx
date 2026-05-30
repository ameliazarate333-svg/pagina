import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="siteFooter">
      <div className="wrap">
        <div className="foot-top">
          <div className="foot-brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="foot-logo" src="/logo-az.svg" alt="AZ · Amelia Zárate" />
            <p>Atelier de alta costura y confección a medida.</p>
          </div>
          <div className="foot-col">
            <h5>Explorar</h5>
            <Link href="/coleccion">Colección</Link>
            <Link href="/a-medida">A Medida</Link>
            <Link href="/guia-medidas">Guía de Medidas</Link>
            <Link href="/atelier">El Atelier</Link>
            <Link href="/diario">Diario</Link>
          </div>
          <div className="foot-col">
            <h5>Atención</h5>
            <Link href="/cuenta">Agenda una cita</Link>
            <Link href="/preguntas-frecuentes">Preguntas frecuentes</Link>
            <Link href="/envios">Envíos y devoluciones</Link>
            <Link href="/cuenta">Mi cuenta</Link>
          </div>
          <div className="foot-col">
            <h5>Contacto</h5>
            <a href="https://wa.me/573122222222" target="_blank" rel="noopener">WhatsApp</a>
            <a href="mailto:hola@azameliazarate.com">hola@azameliazarate.com</a>
            <a href="#">Instagram</a>
            <Link href="/contacto">Ubicación</Link>
          </div>
        </div>
        <div className="foot-bottom">
          <p>© 2026 AZ™ · Amelia Zárate. Todos los derechos reservados.</p>
          <p><Link href="/privacidad">Privacidad</Link> · <Link href="/terminos">Términos</Link> · <Link href="/cookies">Cookies</Link></p>
        </div>
      </div>
    </footer>
  );
}
