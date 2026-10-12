import type { Metadata } from "next";
import CustomPhotobookRequestClient from "./CustomPhotobookRequestClient";

export const metadata: Metadata = {
  title: "Photobook a medida | PixelArt",
  description: "Solicita un photobook con tapa y contratapa diseñadas para tu historia.",
};

export default function CustomPhotobookRequestPage() {
  return <CustomPhotobookRequestClient />;
}
