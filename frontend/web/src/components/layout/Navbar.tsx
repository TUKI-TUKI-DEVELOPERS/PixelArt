import NavbarClient from "./NavbarClient";

type BannerConfig = { text: string; color: string; enabled: boolean } | null;

async function fetchBannerConfig(): Promise<BannerConfig> {
  try {
    const res = await fetch("http://api:3001/api/site-config/promo_banner", { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data?.value?.enabled) return null;
    return { text: data.value.text, color: data.value.color, enabled: data.value.enabled };
  } catch {
    return null;
  }
}

export default async function Navbar() {
  const banner = await fetchBannerConfig();
  return <NavbarClient bannerConfig={banner} />;
}
