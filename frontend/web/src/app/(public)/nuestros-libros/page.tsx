import Image from "next/image";

export default function NuestrosLibrosPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "40px",
        background: "#0a0a12",
      }}
    >
      {/* Logo SVG — renderizado como <img> para mostrar el favicon tal cual */}
      <Image src="/icon.svg" alt="PixelArt logo" width={320} height={320} priority />

      {/* Variantes de tamaño para apreciar la escala */}
      <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
        <Image src="/icon.svg" alt="" width={128} height={128} />
        <Image src="/icon.svg" alt="" width={64} height={64} />
        <Image src="/icon.svg" alt="" width={32} height={32} />
        <Image src="/icon.svg" alt="" width={16} height={16} />
      </div>

      <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase" }}>
        PixelArt — icon preview
      </p>
    </main>
  );
}
