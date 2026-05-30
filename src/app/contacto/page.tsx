import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contacto · AZ — Amelia Zárate",
  description: "Escríbenos al atelier AZ · Amelia Zárate. WhatsApp, correo, ubicación y horarios.",
};

export default function Contacto() {
  return (
    <>
      <SiteHeader />
      <section className="sec guide-hero">
        <div className="wrap">
          <span className="label">Contacto</span>
          <h1>Hablemos de tu <em>próxima pieza</em></h1>
          <p>Cuéntanos qué buscas y te acompañamos desde la primera idea hasta la entrega.</p>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: "clamp(1rem,3vw,2rem)" }}>
        <div className="wrap contact-grid">
          <div className="contact-info">
            <div className="ci"><span>WhatsApp</span><a href="https://wa.me/573122222222" target="_blank" rel="noopener">+57 312 222 2222</a></div>
            <div className="ci"><span>Correo</span><a href="mailto:hola@azameliazarate.com">hola@azameliazarate.com</a></div>
            <div className="ci"><span>Atelier</span><p>Calle 80 # 12-34<br />Bogotá D.C., Colombia</p></div>
            <div className="ci"><span>Horario</span><p>Lun – Vie · 9:00 a 18:00<br />Sáb · 9:00 a 13:00</p></div>
            <div className="ci"><span>Síguenos</span><a href="#" target="_blank" rel="noopener">Instagram @azameliazarate</a></div>
          </div>
          <ContactForm />
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
