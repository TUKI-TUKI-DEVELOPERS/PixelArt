/** PixelArt's business WhatsApp number, in the international format wa.me expects. */
export const PIXELART_WHATSAPP_NUMBER = '51941452953';

/** Link to the PixelArt WhatsApp chat, optionally prefilled with a message. */
export function whatsAppUrl(message?: string): string {
  const base = `https://wa.me/${PIXELART_WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
