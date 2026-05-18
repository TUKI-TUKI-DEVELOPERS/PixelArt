import type { Metadata, Viewport } from 'next';
import { Montserrat } from "next/font/google";
import './globals.css';

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: 'PixelArt — Libros Personalizados',
  description: 'Crea tu libro personalizado o fotolibro con PixelArt',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={montserrat.className}>
        {children}
      </body>
    </html>
  );
}
