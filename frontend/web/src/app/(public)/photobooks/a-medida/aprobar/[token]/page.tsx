import type { Metadata } from "next";
import CustomPhotobookCoverApprovalClient from "./CustomPhotobookCoverApprovalClient";

type Props = { params: Promise<{ token: string }> };

export const metadata: Metadata = {
  title: "Aprueba tu cubierta | PixelArt",
  description: "Revisa y aprueba la cubierta de tu photobook a medida.",
};

export default async function CustomPhotobookCoverApprovalPage({ params }: Props) {
  const { token } = await params;
  return <CustomPhotobookCoverApprovalClient token={token} />;
}
