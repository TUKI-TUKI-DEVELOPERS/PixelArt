import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import PagarPage from "./page";

vi.mock("next/navigation", () => ({ useParams: () => ({ token: "payment-token" }) }));
vi.mock("@/lib/assetUrl", () => ({ getAssetUrl: (key: string) => `/assets/${key}` }));

describe("PagarPage for custom photobooks", () => {
  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it("keeps Yape and voucher upload while hiding the system-calculated amount", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        orderId: 41,
        customerName: "Ana Cliente",

        manualPricing: true,
        currency: "PEN",
        expiresAt: "2026-10-22T12:00:00.000Z",
      }),
    }));

    render(<PagarPage />);

    expect(await screen.findByText("Pago de photobook a medida")).toBeTruthy();
    expect(screen.getByText("Total a pagar").closest("[hidden]")).toBeTruthy();
    expect(screen.getByAltText("QR de pago Yape PixelArt")).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Sube tu comprobante" })).toBeTruthy();
    expect(screen.getByText(/importe coordinado con nuestro equipo/i)).toBeTruthy();
  });
});
