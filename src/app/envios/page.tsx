import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "Envíos y Devoluciones · AZ — Amelia Zárate",
  description: "Información sobre envíos, tiempos, costos, cambios y devoluciones en AZ · Amelia Zárate.",
};

export default function Envios() {
  return (
    <>
      <SiteHeader />
      <section className="wrap">
        <div className="legal">
          <span className="label">Atención</span>
          <h1>Envíos y Devoluciones</h1>
          <p className="updated">Última actualización: 30 de mayo de 2026</p>

          <h2>1. Cobertura</h2>
          <p>Realizamos envíos a todo el territorio de <strong>Colombia</strong>. Para entregas en tu ciudad o
            recogida en el atelier, coordinamos contigo al confirmar el pedido.</p>

          <h2>2. Tiempos de entrega</h2>
          <p>Las prendas a medida tardan aproximadamente <strong>15 días</strong> en confeccionarse; a ese tiempo se
            suma el del transporte según tu ciudad. Las piezas de colección disponibles se despachan en menor tiempo.</p>

          <h2>3. Costos de envío</h2>
          <p>El costo se calcula según el destino y la transportadora, y se confirma antes de despachar. Algunas
            zonas pueden tener envío sin costo en campañas especiales.</p>

          <h2>4. Seguimiento</h2>
          <p>Te compartimos la guía de la transportadora para que sigas tu pedido. Dentro de tu cuenta también puedes
            ver el <Link href="/cuenta">estado de tu encargo</Link> paso a paso.</p>

          <h2>5. Cambios y devoluciones</h2>
          <p>Las <strong>prendas a medida no admiten devolución</strong> por ser hechas exclusivamente para ti; sí
            garantizamos los ajustes necesarios para tu calce. Para las piezas de colección, contáctanos dentro de
            los días posteriores a la entrega para revisar opciones de cambio, siempre que la prenda esté sin uso y
            en perfecto estado.</p>

          <h2>6. Contacto</h2>
          <p>Para cualquier tema de tu envío, escríbenos por WhatsApp al <span className="ph">+57 312 222 2222</span>
            {" "}o a <span className="ph">hola@azameliazarate.com</span>.</p>

          <div className="note">Consulta también nuestros <Link href="/terminos">Términos y Condiciones</Link>.</div>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
