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
            <a href="#coleccion">Colección</a>
            <a href="#medida">A Medida</a>
            <a href="#medidas">Guía de Medidas</a>
            <a href="#atelier">El Atelier</a>
          </div>
          <div className="foot-col">
            <h5>Atención</h5>
            <Link href="/cuenta">Agenda una cita</Link>
            <a href="#">Preguntas frecuentes</a>
            <a href="#">Envíos y devoluciones</a>
            <Link href="/cuenta">Mi cuenta</Link>
          </div>
          <div className="foot-col">
            <h5>Contacto</h5>
            <a href="#">WhatsApp</a>
            <a href="#">hola@azameliazarate.com</a>
            <a href="#">Instagram</a>
            <a href="#">Ubicación</a>
          </div>
        </div>
        <div className="foot-bottom">
          <p>© 2026 AZ · Amelia Zárate. Todos los derechos reservados.</p>
          <p>Privacidad · Términos · Cookies</p>
        </div>
      </div>
    </footer>
  );
}
