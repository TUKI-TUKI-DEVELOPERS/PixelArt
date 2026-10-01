import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { CustomPhotobookAiProposalPanel } from "./CustomPhotobookAiProposalPanel";

const references = [
  { assetId: 7, isActive: true, originalFilename: "paisaje-completo.jpg", url: "https://assets.test/paisaje.jpg", createdAt: "2026-09-30T12:00:00.000Z" },
  { assetId: 8, isActive: true, originalFilename: "retrato-completo.jpg", url: "https://assets.test/retrato.jpg", createdAt: "2026-09-30T12:01:00.000Z" },
  { assetId: 9, isActive: true, originalFilename: "detalle-completo.jpg", url: "https://assets.test/detalle.jpg", createdAt: "2026-09-30T12:02:00.000Z" },
];

function response(data: unknown) {
  return new Response(JSON.stringify(data), { status: 200 });
}

describe("CustomPhotobookAiProposalPanel reference preview", () => {
  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it("opens an enlarged reference and lets the admin compare the next photo", async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(response([]))
      .mockResolvedValueOnce(response(references));
    vi.stubGlobal("fetch", fetchMock);

    render(<CustomPhotobookAiProposalPanel coverMode="PHOTO_BASED" requestId={41} />);

    fireEvent.click(await screen.findByRole("button", { name: "Ampliar paisaje-completo.jpg" }));

    const dialog = await screen.findByRole("dialog");
    expect(within(dialog).getByAltText("Vista ampliada de paisaje-completo.jpg")).toBeTruthy();
    expect(dialog.hasAttribute("open")).toBe(true);

    fireEvent.click(within(dialog).getByRole("button", { name: "Ver siguiente referencia" }));
    expect(within(dialog).getByAltText("Vista ampliada de retrato-completo.jpg")).toBeTruthy();

    fireEvent.click(within(dialog).getByRole("button", { name: "Cerrar vista ampliada" }));
    expect(dialog.hasAttribute("open")).toBe(false);
  });

  it("opens a generated proposal at full size before the admin selects it", async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(response([
        {
          id: 14,
          surface: "FRONT_COVER",
          sourceDesignId: null,
          isSelected: false,
          provider: "openai",
          createdAt: "2026-09-30T12:10:00.000Z",
          asset: { id: 91, url: "https://assets.test/front-cover.png" },
        },
      ]))
      .mockResolvedValueOnce(response(references));
    vi.stubGlobal("fetch", fetchMock);

    render(<CustomPhotobookAiProposalPanel coverMode="PHOTO_BASED" requestId={41} />);

    expect(await screen.findByRole("button", { name: "Regenerar desde la última" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Descargar" })).toHaveProperty("href", "http://localhost:3000/admin-api/photobook/custom-requests/41/designs/14/download");
    fireEvent.click(screen.getByRole("button", { name: "Borrar" }));
    expect(screen.getByText("¿Borrar esta tapa frontal?")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Cancelar" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Borrar propuesta" })).toBeTruthy();
    expect(screen.getByText("Cambios para la siguiente iteración")).toBeTruthy();
    expect(screen.getByText(/La siguiente propuesta parte de la última tapa generada/i)).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Ampliar propuesta de tapa frontal 14" }));

    const dialog = await screen.findByRole("dialog");
    expect(within(dialog).getByAltText("Vista ampliada de propuesta de tapa frontal 14")).toBeTruthy();
    expect(within(dialog).getByText("Vista completa para revisión")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Usar esta tapa frontal" })).toHaveProperty("disabled", false);

    fireEvent.click(within(dialog).getByRole("button", { name: "Cerrar vista ampliada de la propuesta" }));
    expect(dialog.hasAttribute("open")).toBe(false);
  });
});
