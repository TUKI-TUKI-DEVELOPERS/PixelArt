import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PromoModal from "@/components/layout/PromoModal";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <PromoModal />
    </>
  );
}
