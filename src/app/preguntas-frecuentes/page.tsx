import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "Preguntas Frecuentes · AZ — Amelia Zárate",
  description: "Resolvemos tus dudas sobre confección a medida, tiempos, ajustes, pagos y envíos en AZ · Amelia Zárate.",
};

const FAQ: [string, string][] = [
  ["¿Cómo funciona la confección a medida?", "Empezamos con una consulta (presencial o virtual) para entender tu ocasión y estilo. Luego tomamos tus medidas, elegimos diseño y tela, confeccionamos la prenda a mano y la ajustamos en una o dos pruebas hasta el calce perfecto."],
  ["¿Cuánto tarda una prenda a medida?", "El tiempo aproximado es de 15 días, aunque varía según la complejidad del diseño y la tela. En la consulta te damos una fecha estimada concreta."],
  ["¿Necesito saber tomarme las medidas?", "No. Tenemos una Guía de Medidas visual paso a paso, y también puedes tomártelas en el atelier. Lo importante es que queden bien para que tu prenda calce perfecto."],
  ["¿Puedo ajustar un vestido de la colección a mi cuerpo?", "Sí. Todas las piezas de la colección se ajustan sin costo a tus medidas. Solo guarda tus medidas en tu cuenta o agenda una cita."],
  ["¿Hacen vestidos de novia o de gala?", "Sí, es una de nuestras especialidades, tanto para boda civil como para eventos de gala. Lo trabajamos como confección a medida."],
  ["¿Qué métodos de pago aceptan?", "Coordinamos el pago en la consulta. Para encargos a medida suele manejarse un anticipo al inicio y el saldo a la entrega."],
  ["¿Hacen envíos?", "Sí, realizamos envíos dentro de Colombia. Los detalles y costos se confirman según tu ciudad al momento del pedido."],
  ["¿Puedo cambiar o devolver una prenda?", "Las prendas a medida se hacen exclusivamente para ti, por lo que no admiten devolución; sí garantizamos los ajustes necesarios para tu calce. Para piezas de la colección, consúltanos las condiciones."],
  ["¿Atienden de forma virtual?", "Sí. Podemos hacer la consulta por videollamada y guiarte para tomar tus medidas desde casa."],
];

export default function FAQPage() {
  return (
    <>
      <SiteHeader />
      <section className="sec guide-hero">
        <div className="wrap">
          <span className="label">Atención</span>
          <h1>Preguntas <em>frecuentes</em></h1>
          <p>Todo lo que necesitas saber antes de tu prenda. ¿No encuentras tu respuesta? Escríbenos por WhatsApp.</p>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: "clamp(1rem,3vw,2rem)" }}>
        <div className="wrap">
          <div className="faq">
            {FAQ.map(([q, a]) => (
              <details key={q}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
