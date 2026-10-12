import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { CustomPhotobookAiProposalPanel } from "./CustomPhotobookAiProposalPanel";

const activeReferences = [
  { assetId: 7, isActive: true, originalFilename: "foto-1.jpg", url: "https://assets.test/1.jpg", createdAt: "2026-09-28T12:00:00.000Z" },
  { assetId: 8, isActive: true, originalFilename: "foto-2.jpg", url: "https://assets.test/2.jpg", createdAt: "2026-09-28T12:01:00.000Z" },
  { assetId: 9, isActive: true, originalFilename: "foto-3.jpg", url: "https://assets.test/3.jpg", createdAt: "2026-09-28T12:02:00.000Z" },
];

function response(data: unknown) {
  return new Response(JSON.stringify(data), { status: 200 });
}

describe("CustomPhotobookAiProposalPanel", () => {
  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it("allows one active reference photo and requires an explicit direction before front generation", async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(response([]))
      .mockResolvedValueOnce(response([activeReferences[0]]))
      .mockResolvedValueOnce(response({
        id: 14,
        surface: "FRONT_COVER",
        sourceDesignId: null,
        isSelected: false,
        provider: "openai",
        createdAt: "2026-09-28T13:00:00.000Z",
        asset: { id: 91, url: "https://assets.test/front.png" },
      }));
    vi.stubGlobal("fetch", fetchMock);

    render(<CustomPhotobookAiProposalPanel coverMode="PHOTO_BASED" requestId={41} />);
    const generateButton = await screen.findByText("Generar tapa frontal");
    expect(generateButton).toHaveProperty("disabled", true);
    expect(screen.getByText("1/5 activas")).toBeTruthy();

    fireEvent.change(screen.getByLabelText(/Dirección creativa/i), { target: { value: "Retrato principal a la izquierda, luz azul y título discreto." } });
    expect(screen.getByText("Generar tapa frontal")).toHaveProperty("disabled", false);
    fireEvent.click(screen.getByText("Generar tapa frontal"));

    await waitFor(() => expect(fetchMock).toHaveBeenLastCalledWith(
      "/admin-api/photobook/custom-requests/41/designs/generate",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ surface: "FRONT_COVER", creativeDirection: "Retrato principal a la izquierda, luz azul y título discreto." }),
      }),
    ));
    expect(await screen.findByAltText("Propuesta de tapa frontal 14")).toBeTruthy();
  });

  it("shows compact photo slots and lets the admin add a photo received outside the public form", async () => {
    const oneReference = [activeReferences[0]];
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(response([]))
      .mockResolvedValueOnce(response(oneReference))
      .mockResolvedValueOnce(response({ assetId: 8, isActive: true, url: "https://assets.test/whatsapp.jpg" }))
      .mockResolvedValueOnce(response([]))
      .mockResolvedValueOnce(response([...oneReference, { ...activeReferences[1], assetId: 8, url: "https://assets.test/whatsapp.jpg" }]));
    vi.stubGlobal("fetch", fetchMock);

    const { container } = render(<CustomPhotobookAiProposalPanel coverMode="CUSTOMER_ARTWORK" requestId={41} />);
    expect(await screen.findByText("1/5 activas")).toBeTruthy();
    expect(screen.getAllByText("Agregar foto")).toHaveLength(4);

    const inputs = container.querySelectorAll('input[type="file"]');
    fireEvent.change(inputs[1], { target: { files: [new File(["image"], "whatsapp.jpg", { type: "image/jpeg" })] } });

    await waitFor(() => expect(fetchMock).toHaveBeenCalledWith(
      "/admin-api/photobook/custom-requests/41/references",
      expect.objectContaining({ method: "POST", body: expect.any(FormData) }),
    ));
  });

  it("keeps fixed references separated by cover surface", async () => {
    const fixedReferences = [
      { ...activeReferences[0], surface: "FRONT_COVER", slotIndex: 1 },
      { ...activeReferences[1], isActive: false, surface: "FRONT_COVER", slotIndex: 2 },
      { ...activeReferences[2], isActive: false, surface: "BACK_COVER", slotIndex: 1 },
      { assetId: 10, isActive: false, originalFilename: "foto-4.jpg", surface: "BACK_COVER", slotIndex: 2, url: "https://assets.test/4.jpg", createdAt: "2026-09-28T12:03:00.000Z" },
    ];
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(response([
        { id: 14, surface: "FRONT_COVER", sourceDesignId: null, isSelected: true, provider: "openai", createdAt: "2026-09-28T13:00:00.000Z", asset: { id: 91, url: "https://assets.test/front.png" } },
      ]))
      .mockResolvedValueOnce(response(fixedReferences));
    vi.stubGlobal("fetch", fetchMock);

    render(<CustomPhotobookAiProposalPanel coverMode="PHOTO_BASED" requestId={41} />);

    expect(await screen.findByText("1/2 · 0/2 activas")).toBeTruthy();
    expect(screen.getByText("Tapa · foto 1")).toBeTruthy();
    expect(screen.getByText("Tapa · foto 2")).toBeTruthy();
    expect(screen.getByText("Contratapa · foto 1")).toBeTruthy();
    expect(screen.getByText("Contratapa · foto 2")).toBeTruthy();
    expect(screen.getByText("Generar contratapa")).toHaveProperty("disabled", true);
    expect(screen.getByText("Selecciona al menos una de las dos fotos asignadas a la contratapa.")).toBeTruthy();
  });

  it("requires selected front and back proposals before sending the private approval link", async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(response([
        { id: 14, surface: "FRONT_COVER", sourceDesignId: null, isSelected: true, provider: "openai", createdAt: "2026-09-28T13:00:00.000Z", asset: { id: 91, url: "https://assets.test/front.png" } },
        { id: 15, surface: "BACK_COVER", sourceDesignId: 14, isSelected: true, provider: "openai", createdAt: "2026-09-28T13:05:00.000Z", asset: { id: 92, url: "https://assets.test/back.png" } },
      ]))
      .mockResolvedValueOnce(response(activeReferences))
      .mockResolvedValueOnce(response({ publicLink: { expiresAt: "2026-10-05T12:00:00.000Z" } }));
    vi.stubGlobal("fetch", fetchMock);

    render(<CustomPhotobookAiProposalPanel coverMode="PHOTO_BASED" requestId={41} />);
    const sendButton = await screen.findByText("Enviar aprobación");
    expect(sendButton).toHaveProperty("disabled", false);
    fireEvent.click(sendButton);

    await waitFor(() => expect(fetchMock).toHaveBeenLastCalledWith(
      "/admin-api/photobook/custom-requests/41/cover-approval/send",
      { method: "POST" },
    ));
  });
});
