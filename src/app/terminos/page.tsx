import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "Términos y Condiciones · AZ — Amelia Zárate",
  description: "Términos y condiciones de uso del sitio y los servicios de AZ · Amelia Zárate.",
};

export default function Terminos() {
  return (
    <>
      <SiteHeader />
      <section className="wrap">
        <div className="legal">
          <span className="label">Legal</span>
          <h1>Términos y Condiciones</h1>
          <p className="updated">Última actualización: 30 de mayo de 2026</p>

          <p>Estos términos regulan el uso del sitio web y los servicios de <strong>AZ · Amelia Zárate</strong>. Al
            usar el sitio, crear una cuenta o realizar un pedido, aceptas estas condiciones.</p>

          <h2>1. Nuestros servicios</h2>
          <p>Ofrecemos confección de prendas a la medida y venta de prendas de nuestra colección. Las imágenes son
            ilustrativas; las telas y tonos pueden variar levemente respecto a la pantalla.</p>

          <h2>2. Tu cuenta</h2>
          <p>Para guardar tus medidas y seguir tus pedidos puedes crear una cuenta. Eres responsable de la
            veracidad de tus datos y de mantener tu contraseña segura. Las medidas que ingreses se usan únicamente
            para tu confección, conforme a nuestra <Link href="/privacidad">Política de Privacidad</Link>.</p>

          <h2>3. Pedidos a medida</h2>
          <p>Los encargos a medida se elaboran de forma exclusiva según tus medidas y especificaciones. El proceso,
            tiempos y número de pruebas se acuerdan en la consulta. La precisión de las medidas suministradas es
            responsabilidad de la clienta; ofrecemos los ajustes necesarios para lograr el calce adecuado.</p>

          <h2>4. Precios y pagos</h2>
          <p>El valor de cada prenda depende del diseño y la tela, y se confirma antes de iniciar. Para encargos a
            medida puede aplicarse un anticipo al inicio y el saldo a la entrega. Los precios están expresados en
            pesos colombianos (COP).</p>

          <h2>5. Cambios y devoluciones</h2>
          <p>Por su naturaleza personalizada, las <strong>prendas a medida no admiten devolución</strong>; sí
            garantizamos los ajustes necesarios. Para las piezas de colección aplican las condiciones indicadas en
            <Link href="/envios"> Envíos y Devoluciones</Link>.</p>

          <h2>6. Propiedad intelectual</h2>
          <p>La marca AZ, el logotipo, los diseños, textos e imágenes del sitio son propiedad de Amelia Zárate y no
            pueden reproducirse sin autorización.</p>

          <h2>7. Responsabilidad</h2>
          <p>Nos esforzamos por mantener el sitio disponible y la información correcta, pero no garantizamos que
            esté libre de errores o interrupciones. No nos hacemos responsables por usos indebidos del sitio por
            parte de terceros.</p>

          <h2>8. Ley aplicable</h2>
          <p>Estos términos se rigen por las leyes de la República de Colombia. Cualquier controversia se someterá a
            la jurisdicción de los jueces competentes en Colombia.</p>

          <div className="note">¿Dudas sobre estos términos? Escríbenos a <span className="ph">hola@azameliazarate.com</span>.</div>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
