import NavbarClient from "./NavbarClient";
import type { ManualBanner } from "./PromoCodeBanner";
import type { PublicPromoCode } from "@/lib/promotions/public-codes";

const API_INTERNAL = "http://api:3001";

// Returned even when disabled: its color still styles the coded-promo banner.
async function fetchBannerConfig(): Promise<ManualBanner> {
  try {
    const res = await fetch(`${API_INTERNAL}/api/site-config/promo_banner`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data?.value) return null;
    return { text: data.value.text ?? "", color: data.value.color ?? "", enabled: Boolean(data.value.enabled) };
  } catch {
    return null;
  }
}

async function fetchPromoCodes(): Promise<PublicPromoCode[]> {
  try {
    const res = await fetch(`${API_INTERNAL}/api/promotions/codes`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export default async function Navbar() {
  const [banner, promoCodes] = await Promise.all([fetchBannerConfig(), fetchPromoCodes()]);
  return <NavbarClient bannerConfig={banner} promoCodes={promoCodes} />;
}
