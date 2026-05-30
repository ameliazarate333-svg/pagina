import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "Política de Privacidad · AZ — Amelia Zárate",
  description: "Política de Tratamiento de Datos Personales de AZ · Amelia Zárate, conforme a la Ley 1581 de 2012 (Colombia).",
};

const PH = ({ children }: { children: React.ReactNode }) => <span className="ph">{children}</span>;

export default function Privacidad() {
  return (
    <>
      <SiteHeader />
      <section className="wrap">
        <div className="legal">
          <span className="label">Legal</span>
          <h1>Política de Tratamiento de Datos Personales</h1>
          <p className="updated">Última actualización: <PH>30 de mayo de 2026</PH></p>

          <p>
            En <strong>AZ · Amelia Zárate</strong> valoramos y protegemos la privacidad de nuestras clientas.
            Esta política describe cómo recolectamos, usamos, almacenamos y protegemos tus datos personales,
            en cumplimiento de la <strong>Ley 1581 de 2012</strong>, el <strong>Decreto 1377 de 2013</strong> y
            demás normas colombianas sobre protección de datos personales (Habeas Data).
          </p>

          <h2>1. Responsable del tratamiento</h2>
          <ul>
            <li><strong>Razón social / Nombre:</strong> <PH>[Razón social o nombre completo]</PH></li>
            <li><strong>Identificación (NIT / C.C.):</strong> <PH>[NIT o cédula]</PH></li>
            <li><strong>Domicilio:</strong> <PH>[Dirección, ciudad]</PH>, Colombia</li>
            <li><strong>Correo electrónico:</strong> <PH>[correo de contacto]</PH></li>
            <li><strong>Teléfono / WhatsApp:</strong> <PH>[número de contacto]</PH></li>
          </ul>

          <h2>2. Datos que recolectamos</h2>
          <p>Recolectamos únicamente los datos necesarios para prestarte nuestro servicio de confección:</p>
          <ul>
            <li><strong>Datos de identificación y contacto:</strong> nombre, correo electrónico, teléfono/WhatsApp.</li>
            <li><strong>Medidas corporales y tallas de referencia:</strong> contornos, largos y tallas que ingresas para tu prenda.</li>
            <li><strong>Datos de tus pedidos:</strong> prendas solicitadas, estado del encargo, citas y notas.</li>
            <li><strong>Datos técnicos mínimos:</strong> los necesarios para mantener tu sesión iniciada de forma segura.</li>
          </ul>

          <h2>3. Tratamiento de datos sensibles (medidas corporales)</h2>
          <p>
            Tus <strong>medidas corporales</strong> reciben un tratamiento especial y reforzado. Su entrega es
            <strong> totalmente voluntaria</strong>: no estás obligada a suministrarlas, aunque son necesarias para
            la confección a medida. Solo las solicitamos y tratamos con tu <strong>autorización previa, expresa e
            informada</strong>, que otorgas al marcar la casilla de consentimiento al registrarte, y las usamos
            exclusivamente para la elaboración y el ajuste de tus prendas.
          </p>

          <h2>4. Finalidades del tratamiento</h2>
          <ul>
            <li>Crear y administrar tu cuenta de clienta.</li>
            <li>Elaborar prendas a tu medida y gestionar tus pedidos y su seguimiento.</li>
            <li>Agendar y confirmar citas (presenciales o virtuales).</li>
            <li>Contactarte sobre tus encargos por los canales que nos proporcionas.</li>
            <li>Enviarte comunicaciones de la marca, solo si lo autorizas.</li>
            <li>Cumplir obligaciones legales y contables.</li>
          </ul>

          <h2>5. Derechos del titular (Habeas Data)</h2>
          <p>Como titular de tus datos, tienes derecho a:</p>
          <ul>
            <li><strong>Conocer, actualizar y rectificar</strong> tus datos personales.</li>
            <li>Solicitar <strong>prueba de la autorización</strong> otorgada.</li>
            <li>Ser informada sobre el <strong>uso</strong> que damos a tus datos.</li>
            <li><strong>Revocar la autorización</strong> y/o solicitar la <strong>supresión</strong> de tus datos.</li>
            <li>Acceder de forma <strong>gratuita</strong> a tus datos.</li>
            <li>Presentar quejas ante la <strong>Superintendencia de Industria y Comercio (SIC)</strong>.</li>
          </ul>
          <p>
            Desde tu cuenta puedes ver, editar y <strong>eliminar tus datos</strong> en cualquier momento
            (sección «Mi perfil»).
          </p>

          <h2>6. Cómo ejercer tus derechos</h2>
          <p>
            Puedes ejercer tus derechos escribiéndonos a <PH>[correo de contacto]</PH> o al WhatsApp
            <PH>[número de contacto]</PH>, indicando tu solicitud y tus datos de identificación. Atenderemos
            tu petición en los plazos que establece la ley (consultas: máximo 10 días hábiles; reclamos: máximo
            15 días hábiles).
          </p>

          <h2>7. Encargados y terceros</h2>
          <p>Para operar el sitio nos apoyamos en proveedores tecnológicos que actúan como encargados del tratamiento:</p>
          <ul>
            <li><strong>Supabase</strong> — base de datos y autenticación (almacenamiento seguro de tus datos).</li>
            <li><strong>Vercel</strong> — alojamiento del sitio web.</li>
          </ul>
          <p>
            Estos proveedores pueden almacenar la información en servidores ubicados fuera de Colombia (p. ej.
            Estados Unidos). Al aceptar esta política, <strong>autorizas dicha transmisión/transferencia
            internacional</strong>, que se realiza bajo medidas de seguridad adecuadas y únicamente para las
            finalidades aquí descritas. No vendemos ni compartimos tus datos con terceros para fines publicitarios.
          </p>

          <h2>8. Medidas de seguridad</h2>
          <p>
            Aplicamos medidas técnicas y administrativas razonables para proteger tus datos: cifrado en tránsito,
            control de acceso restringido y reglas de seguridad a nivel de base de datos para que <strong>cada
            clienta solo pueda ver su propia información</strong>.
          </p>

          <h2>9. Conservación de los datos</h2>
          <p>
            Conservamos tus datos mientras tu cuenta esté activa y mientras sean necesarios para las finalidades
            descritas o para cumplir obligaciones legales. Cuando solicites su supresión o ya no sean necesarios,
            los eliminaremos o anonimizaremos de forma segura.
          </p>

          <h2>10. Cookies</h2>
          <p>
            Usamos únicamente cookies <strong>técnicas y de sesión</strong>, necesarias para mantener tu inicio de
            sesión y el correcto funcionamiento del sitio. No utilizamos cookies de publicidad ni de seguimiento de
            terceros.
          </p>

          <h2>11. Menores de edad</h2>
          <p>
            Nuestro servicio está dirigido a personas mayores de edad. El tratamiento de datos de menores se
            realizará solo con autorización de sus representantes legales y atendiendo a su interés superior.
          </p>

          <h2>12. Vigencia y cambios</h2>
          <p>
            Esta política rige desde su publicación. Podremos actualizarla; cualquier cambio sustancial se
            informará a través del sitio web. Te recomendamos revisarla periódicamente.
          </p>

          <div className="note">
            Para cualquier duda sobre el tratamiento de tus datos personales, escríbenos a <PH>[correo de contacto]</PH>.
          </div>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
