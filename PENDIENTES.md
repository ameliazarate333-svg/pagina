# Pendientes — AZ · Amelia Zárate

## 🔒 Bloqueados (esperando datos reales o el dominio)

- [ ] **Pasarela de pago (Wompi)** — requiere datos reales del negocio + cuenta en
  comercios.wompi.co. Plan: integrar en sandbox y luego cambiar a llaves de producción.
- [ ] **Reemplazar datos ficticios** por los reales (razón social, NIT, dirección,
  correo, WhatsApp) en: `privacidad`, `terminos`, `cookies`, `envios`, `contacto` y el
  JSON-LD de la home. (Hoy: WhatsApp +57 312 222 2222, correo hola@azameliazarate.com,
  dirección Bogotá — todos ficticios.)
- [ ] **Conectar dominio azameliazarate.com** (DNS en HostGator → Vercel). Al hacerlo:
  actualizar `site_url`/redirect en Supabase y `metadataBase` del sitio.
- [ ] **Fotos reales** de vestidos y del atelier (reemplazar las de stock/Unsplash).
- [ ] **Imágenes de la guía de medidas** (generadas en Flow) — en proceso.
- [ ] **Correo profesional** hola@azameliazarate.com (HostGator) + SMTP propio en
  Supabase para reactivar la confirmación por correo en producción.
- [ ] **Google Search Console** (verificar dominio + enviar sitemap) y **perfil de
  Google Business** — cuando el dominio esté activo.
- [ ] **Revisar la política de privacidad / términos con un asesor legal** (datos sensibles).

## ✅ Hecho
- Sitio Next.js + Supabase desplegado en Vercel (pagina-wheat-eta.vercel.app).
- Páginas: inicio, colección + ficha, a medida, atelier, contacto, guía de medidas (con
  modelo 3D), diario, FAQ, privacidad, términos, cookies, envíos.
- Cuentas de clienta (medidas, pedidos, citas) + panel de administración.
- SEO técnico (robots, sitemap, favicon, OG, JSON-LD), datos ficticios temporales.
- Fase 1 de pagos: botón "Consultar por WhatsApp" en cada vestido.
