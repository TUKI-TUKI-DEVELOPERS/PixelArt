import { tokens } from "@/lib/design-tokens";

export const metadata = {
  title: "Política de Privacidad | PixelArt",
  description: "Cómo PixelArt recopila, usa y protege tus datos personales, conforme a la Ley N.° 29733.",
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

export default function PoliticaDePrivacidadPage() {
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
        Política de Privacidad
      </h1>
      <p style={{ fontSize: "14px", color: tokens.colors.neutral.text.secondary, margin: "0 0 32px 0" }}>
        Última actualización: julio de 2026 · Conforme a la Ley N.° 29733, Ley de Protección de Datos Personales del
        Perú, y su reglamento.
      </p>

      <p style={P_STYLE}>
        En <strong>PixelArt</strong> nos tomamos en serio la privacidad de nuestros clientes. Esta política explica
        qué datos personales recopilamos, con qué finalidad, y cómo puedes ejercer tus derechos sobre ellos.
      </p>

      <h2 style={H2_STYLE}>1. Responsable del tratamiento</h2>
      <p style={P_STYLE}>
        PixelArt, con domicilio en Perú, es responsable del tratamiento de los datos personales que recibimos a
        través de este sitio. Puedes contactarnos para cualquier consulta sobre tus datos a través de{" "}
        <a href="mailto:Pix3l4rtperu@gmail.com" style={{ color: tokens.colors.customBooks.accent }}>
          Pix3l4rtperu@gmail.com
        </a>{" "}
        o WhatsApp{" "}
        <a href="https://wa.me/51941452953" style={{ color: tokens.colors.customBooks.accent }}>
          +51 941 452 953
        </a>
        .
      </p>

      <h2 style={H2_STYLE}>2. Qué datos recopilamos</h2>
      <p style={P_STYLE}>
        <strong>Todos los datos que tratamos son los que tú mismo nos proporcionas voluntariamente</strong> al
        completar un formulario de pedido, escribirnos o realizar una compra. No recopilamos datos de tu dispositivo,
        ubicación ni comportamiento de navegación de forma automática. En concreto, podemos recibir:
      </p>
      <ul style={{ paddingLeft: "20px", margin: "0 0 14px 0" }}>
        <li style={LI_STYLE}>Nombre completo, correo electrónico y número de teléfono.</li>
        <li style={LI_STYLE}>Dirección de envío.</li>
        <li style={LI_STYLE}>Fotografías que subes para personalizar tu libro (tuyas, de tu familia o mascota).</li>
        <li style={LI_STYLE}>Nombres, apodos, fechas y dedicatorias que deseas incluir en el libro.</li>
        <li style={LI_STYLE}>Comprobante de pago (captura o imagen del voucher).</li>
      </ul>

      <h2 style={H2_STYLE}>3. Sobre las cookies</h2>
      <p style={P_STYLE}>
        Este sitio <strong>no utiliza cookies de rastreo, publicidad ni analítica de terceros</strong>. No hacemos
        seguimiento de tu navegación ni compartimos tu actividad con redes de publicidad. Solo usamos lo
        estrictamente necesario para que el sitio funcione (por ejemplo, mantener tu sesión si iniciaste una
        compra), sin fines de perfilamiento.
      </p>

      <h2 style={H2_STYLE}>4. Finalidad del tratamiento</h2>
      <p style={P_STYLE}>Usamos tus datos exclusivamente para:</p>
      <ul style={{ paddingLeft: "20px", margin: "0 0 14px 0" }}>
        <li style={LI_STYLE}>Elaborar la vista previa y producción de tu libro personalizado.</li>
        <li style={LI_STYLE}>Procesar tu pago y verificar tu comprobante.</li>
        <li style={LI_STYLE}>Coordinar el envío de tu pedido.</li>
        <li style={LI_STYLE}>Comunicarnos contigo sobre el estado de tu pedido (correo, WhatsApp).</li>
        <li style={LI_STYLE}>Solicitar tu opinión/reseña una vez entregado el pedido, si así lo autorizas.</li>
      </ul>
      <p style={P_STYLE}>
        La base legal de este tratamiento es tu <strong>consentimiento</strong>, otorgado al completar
        voluntariamente el formulario de pedido y confirmar tu compra.
      </p>

      <h2 style={H2_STYLE}>5. Con quién compartimos tus datos</h2>
      <p style={P_STYLE}>
        No vendemos ni cedemos tus datos personales a terceros con fines comerciales. Para poder operar el servicio,
        compartimos la información estrictamente necesaria con proveedores que actúan como encargados del
        tratamiento en nuestro nombre: nuestro proveedor de alojamiento/almacenamiento de archivos (para guardar de
        forma segura tus fotografías y el libro final) y nuestro proveedor de envío de correos transaccionales (para
        avisarte sobre tu pedido). Estos proveedores solo acceden a los datos necesarios para prestar su servicio y
        no pueden usarlos con otro fin.
      </p>

      <h2 style={H2_STYLE}>6. Plazo de conservación</h2>
      <p style={P_STYLE}>
        Conservamos tus datos mientras exista una relación comercial vigente (pedido en curso) y, luego de
        entregado, durante el plazo necesario para atender garantías, reclamos y obligaciones legales o
        tributarias. Puedes solicitar la eliminación anticipada de tus datos conforme a la sección 8.
      </p>

      <h2 style={H2_STYLE}>7. Seguridad de la información</h2>
      <p style={P_STYLE}>
        Aplicamos medidas técnicas y organizativas razonables para proteger tus datos frente a accesos no
        autorizados, pérdida o uso indebido, incluyendo el uso de conexiones cifradas y control de acceso a nuestros
        sistemas internos.
      </p>

      <h2 style={H2_STYLE}>8. Tus derechos (ARCO)</h2>
      <p style={P_STYLE}>
        Como titular de tus datos, tienes derecho a solicitar, en cualquier momento y de forma gratuita:
      </p>
      <ul style={{ paddingLeft: "20px", margin: "0 0 14px 0" }}>
        <li style={LI_STYLE}><strong>Acceso:</strong> conocer qué datos tuyos tenemos.</li>
        <li style={LI_STYLE}><strong>Rectificación:</strong> corregir datos inexactos o desactualizados.</li>
        <li style={LI_STYLE}><strong>Cancelación:</strong> solicitar la eliminación de tus datos cuando ya no sean necesarios.</li>
        <li style={LI_STYLE}><strong>Oposición:</strong> oponerte a un uso específico de tus datos.</li>
      </ul>
      <p style={P_STYLE}>
        Para ejercer estos derechos, escríbenos a{" "}
        <a href="mailto:Pix3l4rtperu@gmail.com" style={{ color: tokens.colors.customBooks.accent }}>
          Pix3l4rtperu@gmail.com
        </a>{" "}
        indicando tu solicitud. Responderemos dentro del plazo establecido por la Ley N.° 29733 (10 días hábiles).
        Si consideras que no atendimos tu solicitud correctamente, puedes acudir a la Autoridad Nacional de
        Protección de Datos Personales (ANPDP), del Ministerio de Justicia y Derechos Humanos.
      </p>

      <h2 style={H2_STYLE}>9. Menores de edad</h2>
      <p style={P_STYLE}>
        Nuestros libros suelen incluir fotografías de niños, niñas o mascotas, subidas por un padre, madre o adulto
        responsable que realiza la compra. Es responsabilidad de quien compra contar con la autorización necesaria
        para usar dichas fotografías. No dirigimos este sitio a menores de edad para que compren de forma autónoma.
      </p>

      <h2 style={H2_STYLE}>10. Cambios a esta política</h2>
      <p style={P_STYLE}>
        Podemos actualizar esta política ocasionalmente. La fecha de &ldquo;última actualización&rdquo; al inicio de
        esta página indica la versión vigente.
      </p>

      <h2 style={H2_STYLE}>11. Contacto</h2>
      <p style={P_STYLE}>
        Si tienes preguntas sobre esta Política de Privacidad, escríbenos a{" "}
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
