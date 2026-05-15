import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PromoModal from "@/components/layout/PromoModal";
import PageTransitionLoader from "@/components/layout/PageTransitionLoader";

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
      <PageTransitionLoader />
    </>
  );
}
