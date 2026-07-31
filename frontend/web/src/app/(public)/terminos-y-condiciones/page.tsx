import { tokens } from "@/lib/design-tokens";

export const metadata = {
  title: "Términos y Condiciones | PixelArt",
  description: "Términos y condiciones de uso y compra en PixelArt Perú.",
};

const H2_STYLE: React.CSSProperties = {
  fontFamily: tokens.fonts.display,
  fontSize: "22px",
  fontWeight: 700,
  color: tokens.colors.neutral.text.primary,
  margin: "40px 0 12px 0",
};

const P_STYLE: React.CSSProperties = {
  fontSize: "15px",
  lineHeight: 1.75,
  color: tokens.colors.neutral.text.secondary,
  margin: "0 0 14px 0",
};

const LI_STYLE: React.CSSProperties = {
  fontSize: "15px",
  lineHeight: 1.75,
  color: tokens.colors.neutral.text.secondary,
  marginBottom: "8px",
};

export default function TerminosYCondicionesPage() {
  return (
    <main style={{ maxWidth: "780px", margin: "0 auto", padding: "64px 24px 96px" }}>
      <div style={{ marginBottom: "8px", fontSize: "13px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: tokens.colors.customBooks.accent }}>
        Legal
      </div>
      <h1
        style={{
          fontFamily: tokens.fonts.display,
          fontSize: "clamp(28px, 4vw, 38px)",
          fontWeight: 700,
          color: tokens.colors.neutral.text.primary,
          margin: "0 0 8px 0",
        }}
      >
        Términos y Condiciones
      </h1>
      <p style={{ fontSize: "14px", color: tokens.colors.neutral.text.secondary, margin: "0 0 32px 0" }}>
        Última actualización: julio de 2026 · Aplicable a compras realizadas a través de este sitio web.
      </p>

      <p style={P_STYLE}>
        Estos Términos y Condiciones regulan el uso del sitio web de <strong>PixelArt</strong> (en adelante,
        &ldquo;PixelArt&rdquo;, &ldquo;nosotros&rdquo;) y la compra de libros personalizados y photobooks ofrecidos en
        él. Al realizar un pedido o utilizar este sitio, aceptas estos términos en su totalidad. Si no estás de
        acuerdo con alguna parte, te pedimos no continuar con la compra.
      </p>

      <h2 style={H2_STYLE}>1. Sobre PixelArt</h2>
      <p style={P_STYLE}>
        PixelArt es un servicio peruano de creación e impresión de libros personalizados (libros de amor, familia,
        mascotas y memorias) y photobooks, elaborados a partir de fotografías, nombres, fechas y dedicatorias
        proporcionados directamente por el cliente. Contacto: WhatsApp{" "}
        <a href="https://wa.me/51941452953" style={{ color: tokens.colors.customBooks.accent }}>
          +51 941 452 953
        </a>{" "}
        · correo{" "}
        <a href="mailto:Pix3l4rtperu@gmail.com" style={{ color: tokens.colors.customBooks.accent }}>
          Pix3l4rtperu@gmail.com
        </a>
        .
      </p>

      <h2 style={H2_STYLE}>2. Proceso de compra</h2>
      <p style={P_STYLE}>El proceso de compra en PixelArt sigue estos pasos:</p>
      <ol style={{ paddingLeft: "20px", margin: "0 0 14px 0" }}>
        <li style={LI_STYLE}>
          Completas un formulario con los datos, fotografías y preferencias para tu libro (demo gratuita).
        </li>
        <li style={LI_STYLE}>
          Nuestro equipo elabora propuestas de vista previa a partir de esa información, incluyendo escenas generadas
          con apoyo de inteligencia artificial a partir de las fotos que nos envías (ver sección 7).
        </li>
        <li style={LI_STYLE}>
          Si apruebas las propuestas, seleccionas las plantillas finales de tu libro y realizas el pago mediante el
          método indicado (Yape u otros habilitados).
        </li>
        <li style={LI_STYLE}>
          Una vez verificado el pago, iniciamos la producción e impresión de tu libro, y coordinamos el envío a la
          dirección que nos proporcionaste.
        </li>
      </ol>

      <h2 style={H2_STYLE}>3. Precios y medios de pago</h2>
      <p style={P_STYLE}>
        Los precios se muestran en Soles peruanos (S/) e incluyen los impuestos aplicables, salvo que se indique lo
        contrario. Nos reservamos el derecho de modificar precios y promociones sin previo aviso; el precio válido es
        el vigente al momento de confirmar tu pedido. El pedido se considera confirmado únicamente cuando el
        comprobante de pago fue verificado por nuestro equipo.
      </p>

      <h2 style={H2_STYLE}>4. Exactitud de la información proporcionada</h2>
      <p style={P_STYLE}>
        Los nombres, fechas, dedicatorias y demás textos que aparecen en tu libro se imprimen tal como los ingresas en
        el formulario de pedido. Es tu responsabilidad revisar que esta información esté correctamente escrita antes
        de confirmar la compra — PixelArt no se hace responsable por errores ortográficos o de datos que hayan sido
        proporcionados así por el cliente. Del mismo modo, eres responsable de que las fotografías que subes te
        pertenezcan o cuentes con autorización para usarlas.
      </p>

      <h2 style={H2_STYLE}>5. Plazos de entrega</h2>
      <p style={P_STYLE}>
        Los plazos de producción y entrega informados son estimados y pueden variar por factores de producción,
        demanda o logística de envío ajenos a nuestro control (incluyendo casos de fuerza mayor). Te mantendremos
        informado ante cualquier demora relevante.
      </p>

      <h2 style={H2_STYLE}>6. Cambios, devoluciones y derecho de retracto</h2>
      <p style={P_STYLE}>
        Cada libro de PixelArt se elabora a medida, según las fotografías, nombres y textos específicos que nos
        proporciona cada cliente — no son productos de stock. Conforme a la excepción reconocida en el Código de
        Protección y Defensa del Consumidor (Ley N.° 29571) para bienes confeccionados o personalizados según las
        especificaciones del consumidor, <strong>el derecho de retracto no resulta aplicable</strong> una vez
        iniciada la producción de tu libro.
      </p>
      <p style={P_STYLE}>
        Esto no afecta tus derechos como consumidor ante un defecto real del producto: si tu libro llega con un
        error de impresión, daño de fábrica o no corresponde a lo que aprobaste, contáctanos dentro de los 7 días
        posteriores a la entrega y evaluaremos la reimpresión o solución que corresponda, sin costo adicional para
        ti.
      </p>

      <h2 style={H2_STYLE}>7. Uso de inteligencia artificial</h2>
      <p style={P_STYLE}>
        Para algunas escenas de tu libro personalizado utilizamos herramientas de inteligencia artificial que, a
        partir de las fotografías que nos proporcionas, generan ilustraciones que preservan el parecido de las
        personas o mascotas retratadas. El resultado es una interpretación creativa e ilustrada, no una fotografía
        editada — puede haber variaciones razonables respecto a la imagen original. Un miembro de nuestro equipo
        revisa el resultado antes de enviarlo a imprenta.
      </p>

      <h2 style={H2_STYLE}>8. Propiedad intelectual</h2>
      <p style={P_STYLE}>
        Las fotografías que nos envías siguen siendo tuyas — nos otorgas únicamente el permiso necesario para
        utilizarlas en la elaboración del libro que compraste. No usamos tus fotos personales ni el contenido de tu
        dedicatoria para publicidad, redes sociales u otro fin distinto al de tu pedido, salvo autorización expresa
        tuya. Las plantillas, diseños, textos base, poemas de plantilla y el software del sitio son propiedad de
        PixelArt y no pueden reproducirse ni revenderse sin autorización.
      </p>

      <h2 style={H2_STYLE}>9. Limitación de responsabilidad</h2>
      <p style={P_STYLE}>
        En la medida permitida por la ley peruana, la responsabilidad de PixelArt frente a cualquier reclamo
        relacionado con tu pedido se limita al monto efectivamente pagado por dicho pedido. No respondemos por daños
        indirectos, lucro cesante o perjuicios derivados del uso del sitio o del producto, salvo en los casos en que
        la ley no permita limitar dicha responsabilidad.
      </p>

      <h2 style={H2_STYLE}>10. Modificaciones a estos términos</h2>
      <p style={P_STYLE}>
        Podemos actualizar estos Términos y Condiciones en cualquier momento; la versión vigente es la publicada en
        esta página al momento de tu compra. Te recomendamos revisarla periódicamente.
      </p>

      <h2 style={H2_STYLE}>11. Ley aplicable</h2>
      <p style={P_STYLE}>
        Estos términos se rigen por las leyes de la República del Perú. Cualquier controversia como consumidor puede
        además presentarse ante el Instituto Nacional de Defensa de la Competencia y de la Protección de la Propiedad
        Intelectual (INDECOPI).
      </p>

      <h2 style={H2_STYLE}>12. Contacto</h2>
      <p style={P_STYLE}>
        Para consultas sobre estos términos, escríbenos a{" "}
        <a href="mailto:Pix3l4rtperu@gmail.com" style={{ color: tokens.colors.customBooks.accent }}>
          Pix3l4rtperu@gmail.com
        </a>{" "}
        o por WhatsApp al{" "}
        <a href="https://wa.me/51941452953" style={{ color: tokens.colors.customBooks.accent }}>
          +51 941 452 953
        </a>
        .
      </p>
    </main>
  );
}
