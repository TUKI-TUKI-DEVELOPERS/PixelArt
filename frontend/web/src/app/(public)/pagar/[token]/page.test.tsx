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

  it("shows the client-entered surcharge and expected total without changing manual review", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        orderId: 42,
        customerName: "Ana Cliente",
        totalAmountCents: 14500,
        customCoverSurchargeCents: 2500,
        manualPricing: true,
        currency: "PEN",
        expiresAt: "2026-10-22T12:00:00.000Z",
      }),
    }));

    render(<PagarPage />);

    expect(await screen.findAllByText("S/ 145.00")).not.toHaveLength(0);
    expect(screen.getByText(/adicional por tapas personalizadas/i)).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Sube tu comprobante" })).toBeTruthy();
    expect(screen.getByText(/importe ingresado será revisado/i)).toBeTruthy();
  });

  it("adds a discount line and keeps the surcharge breakdown consistent with the discounted total", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        orderId: 43,
        customerName: "Ana Cliente",
        totalAmountCents: 13600,
        customCoverSurchargeCents: 2500,
        discount: { code: "Medida10", percent: 10, amountCents: 900 },
        manualPricing: true,
        currency: "PEN",
        expiresAt: "2026-10-22T12:00:00.000Z",
      }),
    }));

    render(<PagarPage />);

    expect(await screen.findByText("Descuento (Medida10)")).toBeTruthy();
    expect(screen.getByText("−S/ 9.00")).toBeTruthy();
    // Photobook + express before the discount: 13600 + 900 − 2500
    expect(screen.getByText("S/ 120.00")).toBeTruthy();
    expect(screen.getAllByText("S/ 136.00")).not.toHaveLength(0);
  });

  it("shows the discount line for a regular order", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        orderId: 44, customerName: "Luis", totalAmountCents: 8100, manualPricing: false, currency: "PEN",
        discount: { code: "Foto10", percent: 10, amountCents: 900 }, expiresAt: "2026-10-22T12:00:00.000Z",
      }),
    }));

    render(<PagarPage />);

    expect(await screen.findByText("Descuento (Foto10)")).toBeTruthy();
    expect(screen.getByText("−S/ 9.00")).toBeTruthy();
  });
});
