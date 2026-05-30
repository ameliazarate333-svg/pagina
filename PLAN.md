# Plan de Sitio Web — AZ · Amelia Zárate

> Documento de planeación para el desarrollo de la página web del atelier de la modista **Amelia Zárate**, bajo la marca **AZ**.
> Estado: **Borrador para revisión** · Última actualización: 2026-05-30

---

## 1. Resumen del proyecto

Sitio web profesional para una modista de alta costura y confección a medida. Combina dos negocios en una sola experiencia:

1. **Confección a medida (bespoke):** la clienta sube sus medidas, agenda citas y sigue el proceso de su prenda.
2. **Vestidos ya hechos (ready-to-wear):** catálogo de piezas disponibles para compra directa.

El sitio debe transmitir **lujo, oficio artesanal y confianza**, y al mismo tiempo ser fácil de usar para que cualquier clienta —incluso sin experiencia— pueda tomar y enviar sus medidas correctamente.

### Objetivos del negocio
- Captar clientas nuevas y proyectar una imagen premium.
- Reducir el trabajo manual: que las medidas y citas lleguen organizadas y listas.
- Vender vestidos ya hechos en línea.
- Crear una relación a largo plazo (cuenta de clienta con su historial de medidas).

---

## 2. Conceptos de marca «luxury» — Elegir 1

Cinco direcciones creativas para la identidad visual de **AZ**. Cada una define paleta, tipografía, mood y clienta ideal. Lee las cinco y dime cuál te late (o qué mezclar de cada una).

### Concepto 1 — «Atelier Monograma» (Couture parisino clásico)
- **Idea:** la elegancia atemporal de una maison parisina. El monograma **AZ** funciona como un sello de cera / emblema de la casa.
- **Paleta:** negro, marfil/hueso, dorado tenue.
- **Tipografía:** serif Didone de alto contraste (estilo Didot / Bodoni) para títulos + sans-serif fina para texto.
- **Mood:** editorial, sobrio, sofisticado, "hecho a mano desde siempre".
- **Clienta ideal:** mujer clásica, novias, eventos formales.
- **Pro / contra:** muy elegante y seguro; riesgo de verse "como todos los de lujo" si no se diferencia con fotografía propia.

### Concepto 2 — «Quiet Luxury» (Minimalismo editorial)
- **Idea:** lujo silencioso al estilo The Row / Totême. Menos es más: la prenda manda.
- **Paleta:** neutros apagados (hueso, taupe, greige, arena, gris piedra).
- **Tipografía:** sans-serif refinada (Grotesque elegante) con mucho aire / espacio en blanco.
- **Mood:** moderno, calmado, caro-discreto, mucha fotografía grande.
- **Clienta ideal:** mujer contemporánea, minimalista, que valora el corte y la tela sobre el adorno.
- **Pro / contra:** se ve increíblemente moderno y limpio; depende 100% de tener fotos de altísima calidad.

### Concepto 3 — «Art Déco Esmeralda» (Glamour geométrico)
- **Idea:** opulencia años 20 / Gatsby. Patrones geométricos, líneas doradas, sensación de joya.
- **Paleta:** verde esmeralda profundo + dorado metálico + negro.
- **Tipografía:** serif/display con aire déco para títulos + geométrica para texto.
- **Mood:** dramático, festivo, glamuroso, "alfombra roja".
- **Clienta ideal:** vestidos de gala, fiesta, quinceañeras de lujo, eventos de noche.
- **Pro / contra:** muy memorable y con personalidad; hay que dosificarlo para que no canse.

### Concepto 4 — «Botánico Romántico» (Femenino & nupcial)
- **Idea:** romanticismo suave, acuarelas florales, delicadeza. Ideal si las novias son foco fuerte.
- **Paleta:** blush/nude, rosa empolvado, salvia, marfil; acentos en oro rosa.
- **Tipografía:** serif suave + un toque de script caligráfico (con moderación) en detalles.
- **Mood:** delicado, soñador, emocional, primaveral.
- **Clienta ideal:** novias, damas de honor, eventos femeninos, bautizos/comuniones.
- **Pro / contra:** conecta emocionalmente y es muy "boda"; cuidado con que no se sienta poco premium si se abusa del script.

### Concepto 5 — «Noir Couture» (Alta moda dramática)
- **Idea:** moda de autor, editorial de revista, dark mode cinematográfico. La marca AZ como sello de diseñadora exclusiva.
- **Paleta:** negro + vino/oxblood profundo, alto contraste; acentos champagne/oro.
- **Tipografía:** serif moderno bold y atrevido + sans condensada.
- **Mood:** poderoso, exclusivo, "lista de espera", fashion-forward.
- **Clienta ideal:** mujer audaz, piezas statement, gala y editorial.
- **Pro / contra:** diferenciador y aspiracional; el dark mode hay que ejecutarlo muy bien para que se lea cómodo.

| # | Concepto | Paleta base | Vibe en una palabra |
|---|----------|-------------|---------------------|
| 1 | Atelier Monograma | Negro · Marfil · Dorado | Atemporal |
| 2 | Quiet Luxury | Neutros tierra | Discreto |
| 3 | Art Déco Esmeralda | Esmeralda · Oro | Glamuroso |
| 4 | Botánico Romántico | Blush · Salvia · Oro rosa | Romántico |
| 5 | Noir Couture | Negro · Vino · Champagne | Dramático |

> **Decisión pendiente:** ¿Cuál concepto (o combinación) usamos como base de diseño?

---

## 3. Arquitectura del sitio (mapa de páginas)

```
AZ · Amelia Zárate
│
├── Inicio (Home)
├── El Atelier (Sobre Amelia / historia / oficio)
├── Colección · Vestidos ya hechos        ← catálogo ready-to-wear
│   └── Ficha de vestido (detalle + compra)
├── A Medida (Bespoke)                     ← proceso de confección personalizada
├── Guía de Medidas                        ← cómo tomarse las medidas (educativo)
├── Mis Medidas                            ← formulario para subir medidas
├── Agenda tu Cita                         ← reserva de consulta/prueba
├── Lookbook / Galería                     ← portafolio de trabajos
├── Diario (Blog)                          ← contenido y SEO
├── Preguntas Frecuentes (FAQ)
├── Contacto                               ← form + WhatsApp + ubicación
│
├── [Área de clienta]
│   ├── Iniciar sesión / Registro
│   ├── Mi perfil
│   ├── Mis medidas guardadas
│   ├── Mis pedidos
│   └── Seguimiento de pedido
│
├── [Comercio]
│   ├── Carrito
│   ├── Checkout / Pago
│   └── Lista de deseos
│
├── [Legal]
│   ├── Política de privacidad
│   ├── Términos y condiciones
│   └── Política de cookies
│
└── [Admin — solo Amelia]
    └── Panel de administración (productos, pedidos, medidas, citas, contenido)
```

---

## 4. Módulos del sitio (descripción detallada)

### Módulos públicos (núcleo)

1. **Inicio (Home)**
   - Hero con imagen/video impactante + frase de marca + CTA principal ("Agenda tu cita" / "Ver colección").
   - Bloques: destacados de la colección, los 3 pasos de "a medida", testimonios, feed de Instagram, newsletter.

2. **El Atelier (Sobre Amelia)**
   - Historia de Amelia, filosofía, fotos del taller y del proceso artesanal. Genera confianza y justifica el precio premium.

3. **Colección · Vestidos ya hechos** *(ready-to-wear)*
   - Galería con **filtros** por categoría (novia, gala, cóctel, fiesta, día), talla, color y precio.
   - **Ficha de producto:** fotos múltiples/zoom, descripción, telas, tallas disponibles, guía de talla, precio, botón comprar/añadir al carrito, "consultar a medida".

4. **A Medida (Bespoke)**
   - Explica el proceso paso a paso: *Consulta → Medidas → Diseño/tela → Corte → Confección → Prueba → Entrega*.
   - Tiempos estimados, rango de precios, y CTA para agendar o subir medidas.

5. **Guía de Medidas** *(educativo — clave)*
   - Tutorial visual de **cómo tomarse cada medida** con diagramas e idealmente un video corto.
   - Consejos: usar cinta métrica de modista, ropa ajustada/ropa interior, no apretar, pararse natural, pedir ayuda, medir en cm, medir dos veces. (Detalle en la sección 5.)

6. **Mis Medidas (subir medidas)** *(función estrella)*
   - Formulario guiado, campo por campo, con mini-ilustración de cada medida y validación (rangos lógicos, unidades).
   - Opción de guardar en la cuenta o enviar como invitada.
   - Posibilidad de adjuntar fotos de referencia (frente/perfil/espalda) — **opcional y con consentimiento**.

7. **Agenda tu Cita**
   - Calendario para reservar consulta inicial o prueba (presencial o virtual). Confirmación por email/WhatsApp y recordatorios.

8. **Lookbook / Galería**
   - Portafolio editorial de trabajos anteriores, organizados por colección o tipo de evento.

9. **Diario (Blog)**
   - Artículos: tendencias, cuidado de prendas, "cómo elegir tu vestido", detrás de cámaras. Sirve para SEO y para humanizar la marca.

10. **Preguntas Frecuentes (FAQ)**
    - Tiempos de entrega, devoluciones, ajustes, métodos de pago, envíos, cómo funciona "a medida".

11. **Contacto**
    - Formulario, botón **WhatsApp** (clave en LATAM), email, dirección con mapa, horarios, redes sociales.

### Área de clienta (cuenta)

12. **Registro / Inicio de sesión** — email + contraseña (y/o Google).
13. **Mi perfil** — datos de contacto y preferencias.
14. **Mis medidas guardadas** — historial; puede actualizarlas cuando cambien.
15. **Mis pedidos** — historial de compras y encargos.
16. **Seguimiento de pedido** — estado visual del encargo a medida:
    `Medidas recibidas → En diseño → En corte → En confección → Lista para prueba → Entregada`.

### Comercio (transaccional)

17. **Carrito** — para vestidos ya hechos y/o anticipo/depósito de encargos.
18. **Checkout / Pagos** — pasarela de pago segura (tarjeta, y métodos locales).
19. **Lista de deseos (wishlist).**

### Administración (solo Amelia)

20. **Panel de administración (CMS):**
    - Gestionar productos, fotos, precios y stock.
    - Ver y exportar las **medidas** recibidas por clienta.
    - Gestionar **pedidos** y cambiar su estado (se refleja en el seguimiento de la clienta).
    - Administrar **citas** y disponibilidad.
    - Editar contenido (blog, FAQ, textos).

### Transversales (en todo el sitio)
- **Responsive / mobile-first** (la mayoría entrará por celular).
- **SEO** (metadatos, sitemap, datos estructurados, buen rendimiento).
- **Accesibilidad** (contraste, textos alternativos, navegación por teclado).
- **Newsletter / captación de email.**
- **Integración Instagram + WhatsApp.**
- **Multi-idioma (ES / EN)** — opcional según el público.
- **Analítica** (visitas, conversiones).
- **Avisos de cookies y consentimiento de datos.**

---

## 5. Sistema de medidas (el corazón del sitio)

La toma de medidas es lo más delicado: si la clienta se mide mal, la prenda falla. Por eso el sitio debe **enseñar** y **validar**.

### 5.1 Medidas que debe poder ingresar la clienta

> Todas en **centímetros**. Marcadas como *(esencial)* las mínimas indispensables.

| Medida | Cómo se toma | Esencial |
|--------|--------------|:---:|
| **Contorno de busto** | Parte más prominente del pecho, cinta horizontal | ✅ |
| **Contorno bajo busto** | Justo debajo del pecho | |
| **Contorno de cintura** | Parte más estrecha del torso | ✅ |
| **Contorno de cadera** | Parte más prominente de glúteos/cadera | ✅ |
| **Altura de busto** | Del hombro (base del cuello) al punto del pecho | |
| **Separación de busto** | Distancia entre los dos puntos del pecho | |
| **Talle delantero** | Del hombro a la cintura por el frente | |
| **Talle de espalda** | De la nuca/hombro a la cintura por detrás | ✅ |
| **Ancho de espalda** | De axila a axila por la espalda | |
| **Largo de hombro** | Del cuello al extremo del hombro | |
| **Contorno de cuello** | Alrededor de la base del cuello | |
| **Contorno de sisa (axila)** | Alrededor de la axila | |
| **Largo de brazo** | Del hombro a la muñeca, brazo ligeramente flexionado | |
| **Contorno de brazo (bíceps)** | Parte más ancha del brazo | |
| **Contorno de muñeca** | Alrededor de la muñeca | |
| **Largo total de la prenda** | Del hombro/cintura al largo deseado del vestido | ✅ |
| **Altura de la persona** | De la coronilla al piso | ✅ |
| **Contorno de muslo** | Para faldas/vestidos ajustados | |
| **Tiro / entrepierna** | Para pantalones | |

### 5.2 Instrucciones que deben aparecer en la guía
- Usa **cinta métrica flexible** (de modista), no una rígida.
- Mídete con **ropa interior o ropa muy ajustada**.
- Mantén la cinta **firme pero sin apretar** (sin marcar la piel).
- **Párate natural**, relajada, mirando al frente, sin "meter" la barriga.
- **Pide ayuda** a otra persona para las medidas de espalda y talle.
- **Mide dos veces** cada zona y anota el promedio.
- Todo en **centímetros**.

### 5.3 Buenas prácticas de la función "subir medidas"
- Cada campo con **mini-diagrama** y texto de ayuda.
- **Validación de rangos** (avisar si un número es improbable, ej. cintura 300 cm).
- Permitir **guardar y continuar después**.
- **Video tutorial** corto opcional.
- Confirmación clara al enviar + copia por email.

### 5.4 ⚠️ Privacidad de datos (importante)
Las medidas corporales (y más aún las fotos) son **datos personales sensibles**. El sitio debe:
- Pedir **consentimiento explícito** antes de guardarlas.
- Almacenarlas de forma **segura** (cifrado / acceso restringido).
- Incluir **política de privacidad** clara (qué se guarda, para qué, por cuánto tiempo).
- Permitir a la clienta **borrar sus datos**.

---

## 6. Recomendación técnica (cómo construirlo)

### Opción A — Desarrollo a medida *(recomendada para Claude Code)*
Da control total sobre la función de medidas, cuentas y seguimiento de pedidos.

- **Front-end:** Next.js (React) + Tailwind CSS.
- **Base de datos + autenticación:** Supabase (o Firebase) — guarda usuarios, medidas y pedidos.
- **Pagos:** Stripe (y/o pasarela local según el país).
- **Contenido (blog/textos):** MDX o un CMS headless (Sanity).
- **Hosting:** Vercel.
- **Pro:** 100% personalizable, ideal para el sistema de medidas y el área de clienta.
- **Contra:** requiere desarrollo (justo lo que haremos con Claude Code).

### Opción B — Plataforma no-code *(más rápida, menos flexible)*
- **Shopify** (si lo más importante es vender vestidos ya hechos) + apps para formularios.
- **Squarespace / Wix** (muy buenos para imagen premium, formularios básicos).
- **Pro:** rápido de lanzar, sin programar.
- **Contra:** la función avanzada de medidas y seguimiento queda limitada.

> **Recomendación:** Opción A (Next.js + Tailwind + Supabase + Stripe). Encaja con un look luxury a medida y con la función estrella de subir/guardar medidas.

> **Decisión pendiente:** ¿Construcción a medida (A) o plataforma no-code (B)?

---

## 7. Roadmap por fases

### Fase 1 — MVP (lanzamiento rápido)
- Inicio, El Atelier, Colección (catálogo simple), Guía de Medidas.
- Formulario "Mis Medidas" (envío por email / guardado básico).
- Contacto + WhatsApp.
- Diseño del concepto de marca elegido + responsive + SEO base.

### Fase 2 — Experiencia de clienta
- Cuentas de clienta + medidas guardadas.
- Agenda de citas.
- Seguimiento de pedidos.
- Panel de administración para Amelia.

### Fase 3 — Comercio y crecimiento
- Carrito + checkout + pagos en línea.
- Blog, lista de deseos, multi-idioma.
- Integraciones avanzadas y analítica.

---

## 8. Lista de recursos que necesitamos de Amelia

Para que el sitio se vea profesional necesitaremos reunir:

- [ ] **Logo / monograma AZ** (o lo diseñamos según el concepto elegido).
- [ ] **Fotografías profesionales** de vestidos y del taller (lo más importante para el look luxury).
- [ ] **Textos:** historia de Amelia, filosofía, descripción de servicios.
- [ ] **Catálogo de vestidos ya hechos:** fotos, descripciones, telas, tallas, precios.
- [ ] **Información del proceso a medida:** pasos, tiempos, rangos de precio.
- [ ] **Datos de contacto:** WhatsApp, email, dirección, redes, horarios.
- [ ] **Testimonios** de clientas (con permiso).
- [ ] Definir **idioma(s)**, **moneda** y si habrá **envíos**.

---

## 9. Decisiones pendientes (para avanzar)

1. **Concepto de marca** (sección 2): ¿cuál de los 5 elegimos?
2. **Enfoque técnico** (sección 6): ¿a medida o no-code?
3. **Alcance del lanzamiento:** ¿empezamos por el MVP (Fase 1) o vamos más completo?
4. **Comercio:** ¿se venderán vestidos con pago en línea, o solo se muestran y se cotiza por WhatsApp?
5. **Idioma y moneda.**
6. **Material disponible:** ¿ya hay fotos profesionales y logo, o los creamos?

---

*Próximo paso sugerido: elegir el concepto de marca y el enfoque técnico para empezar a maquetar la Fase 1.*
