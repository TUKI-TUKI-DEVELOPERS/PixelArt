import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { CustomPhotobookAiProposalPanel } from "./CustomPhotobookAiProposalPanel";

const activeReferences = [
  { assetId: 7, isActive: true, originalFilename: "foto-1.jpg", url: "https://assets.test/1.jpg", createdAt: "2026-09-28T12:00:00.000Z" },
  { assetId: 8, isActive: true, originalFilename: "foto-2.jpg", url: "https://assets.test/2.jpg", createdAt: "2026-09-28T12:01:00.000Z" },
  { assetId: 9, isActive: true, originalFilename: "foto-3.jpg", url: "https://assets.test/3.jpg", createdAt: "2026-09-28T12:02:00.000Z" },
];

function response(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), { status });
}

async function selectWorkflowStep(label: string) {
  fireEvent.click(await screen.findByRole("button", { name: label }));
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
    expect(await screen.findByText("1/5 activas")).toBeTruthy();
    await selectWorkflowStep("Tapa frontal");
    expect(screen.getByAltText("Referencia foto-1.jpg")).toHaveProperty("src", "https://assets.test/1.jpg");
    const generateButton = await screen.findByText("Generar tapa frontal");
    expect(generateButton).toHaveProperty("disabled", true);

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

  it("keeps reference thumbnails visible and sends the contratapa instructions to AI", async () => {
    const selectedFront = {
      id: 14,
      surface: "FRONT_COVER",
      sourceDesignId: null,
      isSelected: true,
      provider: "openai",
      createdAt: "2026-09-28T13:00:00.000Z",
      asset: { id: 91, url: "https://assets.test/front.png" },
    };
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(response([selectedFront]))
      .mockResolvedValueOnce(response([activeReferences[0]]))
      .mockResolvedValueOnce(response({
        id: 15,
        surface: "BACK_COVER",
        sourceDesignId: 14,
        isSelected: false,
        provider: "openai",
        createdAt: "2026-09-28T13:05:00.000Z",
        asset: { id: 92, url: "https://assets.test/back.png" },
      }));
    vi.stubGlobal("fetch", fetchMock);

    render(<CustomPhotobookAiProposalPanel coverMode="PHOTO_BASED" requestId={41} />);
    await selectWorkflowStep("Contratapa");
    expect(screen.getByAltText("Referencia foto-1.jpg")).toHaveProperty("src", "https://assets.test/1.jpg");

    const prompt = "Continúa el paisaje de la tapa y deja espacio para una dedicatoria.";
    fireEvent.change(screen.getByLabelText(/Indicaciones para la IA de contratapa/i), { target: { value: prompt } });
    fireEvent.click(screen.getByRole("button", { name: "Generar contratapa con IA" }));

    await waitFor(() => expect(fetchMock).toHaveBeenLastCalledWith(
      "/admin-api/photobook/custom-requests/41/designs/generate",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ surface: "BACK_COVER", creativeDirection: prompt }),
      }),
    ));
    expect(await screen.findByAltText("Propuesta de contratapa 15")).toBeTruthy();
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
    await selectWorkflowStep("Contratapa");
    expect(screen.getByText("Generar contratapa con IA")).toHaveProperty("disabled", true);
    expect(screen.getByText("Selecciona una foto de referencia para habilitar la IA, o carga directamente el arte final.")).toBeTruthy();
  });

  it("shows both selected covers in the final review before sending the private approval link", async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(response([
        { id: 14, surface: "FRONT_COVER", sourceDesignId: null, isSelected: true, provider: "openai", createdAt: "2026-09-28T13:00:00.000Z", asset: { id: 91, url: "https://assets.test/front.png" } },
        { id: 15, surface: "BACK_COVER", sourceDesignId: 14, isSelected: true, provider: "openai", createdAt: "2026-09-28T13:05:00.000Z", asset: { id: 92, url: "https://assets.test/back.png" } },
      ]))
      .mockResolvedValueOnce(response(activeReferences))
      .mockResolvedValueOnce(response({ publicLink: { expiresAt: "2026-10-05T12:00:00.000Z" } }));
    vi.stubGlobal("fetch", fetchMock);

    render(<CustomPhotobookAiProposalPanel coverMode="PHOTO_BASED" requestId={41} />);
    await selectWorkflowStep("Revisión y envío");
    expect(screen.getByAltText("Vista previa de tapa frontal seleccionada")).toBeTruthy();
    expect(screen.getByAltText("Vista previa de contratapa seleccionada")).toBeTruthy();
    expect(screen.queryByRole("button", { name: /Elegir tapa|Cambiar tapa|Usar como/ })).toBeNull();

    const sendButton = await screen.findByText("Enviar aprobación");
    expect(sendButton).toHaveProperty("disabled", false);
    fireEvent.click(screen.getByRole("button", { name: "Volver a contratapa" }));
    expect(screen.getByRole("heading", { name: "Prepara la contratapa" })).toBeTruthy();
    await selectWorkflowStep("Revisión y envío");
    fireEvent.click(screen.getByText("Enviar aprobación"));

    await waitFor(() => expect(fetchMock).toHaveBeenLastCalledWith(
      "/admin-api/photobook/custom-requests/41/cover-approval/send",
      { method: "POST" },
    ));
  });

  it("lets the admin download the customer's original cover reference", async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(response([]))
      .mockResolvedValueOnce(response([activeReferences[0]]));
    vi.stubGlobal("fetch", fetchMock);

    render(<CustomPhotobookAiProposalPanel coverMode="PHOTO_BASED" requestId={41} />);

    const downloadLink = await screen.findByRole("link", { name: "Descargar original foto-1.jpg" });
    expect(downloadLink.getAttribute("href")).toBe("/admin-api/photobook/custom-requests/41/references/7/download");
  });

  it("shows reference-cover actions according to each reference surface", async () => {
    const references = [
      { ...activeReferences[0], surface: "FRONT_COVER", slotIndex: 1 },
      { ...activeReferences[1], surface: "BACK_COVER", slotIndex: 1 },
      { ...activeReferences[2], surface: null, slotIndex: null },
    ];
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(response([]))
      .mockResolvedValueOnce(response(references));
    vi.stubGlobal("fetch", fetchMock);

    render(<CustomPhotobookAiProposalPanel coverMode="PHOTO_BASED" requestId={41} />);

    const cards = await screen.findAllByRole("article");
    expect(within(cards[0]).getByRole("button", { name: "Usar como tapa" })).toBeTruthy();
    expect(within(cards[0]).queryByRole("button", { name: "Usar como contratapa" })).toBeNull();
    expect(within(cards[1]).getByRole("button", { name: "Usar como contratapa" })).toHaveProperty("disabled", true);
    expect(within(cards[1]).getByText("Elige primero la tapa frontal")).toBeTruthy();
    expect(within(cards[2]).getByRole("button", { name: "Usar como tapa" })).toBeTruthy();
    expect(within(cards[2]).getByRole("button", { name: "Usar como contratapa" })).toHaveProperty("disabled", true);
  });

  it("applies a client reference as a cover and advances to its workflow step", async () => {
    const reference = { ...activeReferences[0], surface: "FRONT_COVER", slotIndex: 1 };
    const selectedDesign = {
      id: 14,
      surface: "FRONT_COVER",
      sourceDesignId: null,
      isSelected: true,
      provider: "manual",
      createdAt: "2026-10-21T12:00:00.000Z",
      asset: { id: 7, url: reference.url, width: 2500, height: 2500 },
    };
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(response([]))
      .mockResolvedValueOnce(response([reference]))
      .mockResolvedValueOnce(response({ dimensions: { width: 2500, height: 2500 }, isSelected: true }))
      .mockResolvedValueOnce(response([selectedDesign]))
      .mockResolvedValueOnce(response([reference]));
    vi.stubGlobal("fetch", fetchMock);

    render(<CustomPhotobookAiProposalPanel coverMode="PHOTO_BASED" requestId={41} />);
    fireEvent.click(await screen.findByRole("button", { name: "Usar como tapa" }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledWith(
      "/admin-api/photobook/custom-requests/41/references/7/use-as-cover",
      expect.objectContaining({ method: "POST", body: JSON.stringify({ surface: "FRONT_COVER" }) }),
    ));
    expect(await screen.findByRole("heading", { name: "Prepara la tapa frontal" })).toBeTruthy();
    expect(await screen.findByText("Foto del cliente validada (2500 × 2500 px) y elegida como tapa frontal.")).toBeTruthy();
  });

  it("shows reference validation errors in the card without leaving the references step", async () => {
    const reference = { ...activeReferences[0], surface: "FRONT_COVER", slotIndex: 1 };
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(response([]))
      .mockResolvedValueOnce(response([reference]))
      .mockResolvedValueOnce(response({ message: "La imagen debe ser cuadrada y medir al menos 2500 × 2500 px." }, 400));
    vi.stubGlobal("fetch", fetchMock);

    render(<CustomPhotobookAiProposalPanel coverMode="PHOTO_BASED" requestId={41} />);
    const card = (await screen.findAllByRole("article"))[0];
    fireEvent.click(within(card).getByRole("button", { name: "Usar como tapa" }));

    expect(await within(card).findByText("La imagen debe ser cuadrada y medir al menos 2500 × 2500 px.")).toBeTruthy();
    expect(screen.getByText("Paso 1 de 4")).toBeTruthy();
    expect(screen.queryByRole("heading", { name: "Prepara la tapa frontal" })).toBeNull();
  });

  it("accepts a print-ready manual cover without requiring references or calling AI", async () => {
    const manualDesign = {
      id: 14,
      surface: "FRONT_COVER",
      sourceDesignId: null,
      isSelected: false,
      provider: "manual",
      createdAt: "2026-10-21T12:00:00.000Z",
      asset: { id: 91, url: "https://assets.test/manual-front.png", width: 2500, height: 2500 },
    };
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(response([]))
      .mockResolvedValueOnce(response([]))
      .mockResolvedValueOnce(response({ ...manualDesign, dimensions: { width: 2500, height: 2500 } }))
      .mockResolvedValueOnce(response([manualDesign]))
      .mockResolvedValueOnce(response([]))
      .mockResolvedValueOnce(response({}));
    const close = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    vi.stubGlobal("createImageBitmap", vi.fn().mockResolvedValue({ width: 2500, height: 2500, close }));

    render(<CustomPhotobookAiProposalPanel coverMode="PHOTO_BASED" requestId={41} />);
    await selectWorkflowStep("Tapa frontal");
    const input = await screen.findByLabelText("Archivo de diseño propio para tapa frontal");
    const artwork = new File(["print-ready artwork"], "tapa-final.png", { type: "image/png" });
    fireEvent.change(input, { target: { files: [artwork] } });

    await waitFor(() => expect(fetchMock).toHaveBeenCalledWith(
      "/admin-api/photobook/custom-requests/41/designs/upload",
      expect.objectContaining({ method: "POST", body: expect.any(FormData) }),
    ));
    const uploadCall = fetchMock.mock.calls.find(([url]) => url === "/admin-api/photobook/custom-requests/41/designs/upload");
    const uploadBody = uploadCall?.[1]?.body as FormData;
    expect(uploadBody.get("surface")).toBe("FRONT_COVER");
    expect(uploadBody.get("file")).toBe(artwork);
    expect(fetchMock).not.toHaveBeenCalledWith("/admin-api/photobook/custom-requests/41/designs/generate", expect.anything());
    expect(close).toHaveBeenCalled();
    expect(await screen.findByText("Diseño propio · 2500 × 2500 px")).toBeTruthy();
    expect(await screen.findByText(/Dimensiones correctas: 2500 × 2500 px/)).toBeTruthy();
    const selectButton = await screen.findByRole("button", { name: "Usar como tapa frontal" });
    fireEvent.click(selectButton);
    await waitFor(() => expect(fetchMock).toHaveBeenCalledWith(
      "/admin-api/photobook/custom-requests/41/designs/14/select",
      { method: "POST" },
    ));
    expect(await screen.findByRole("button", { name: "Tapa frontal lista para aprobación" })).toHaveProperty("disabled", true);
  });

  it("lets the admin upload a manual back cover before selecting a front cover", async () => {
    const backDesign = {
      id: 15,
      surface: "BACK_COVER",
      sourceDesignId: null,
      isSelected: false,
      provider: "manual",
      createdAt: "2026-10-21T12:05:00.000Z",
      asset: { id: 92, url: "https://assets.test/manual-back.png", width: 2500, height: 2500 },
    };
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(response([]))
      .mockResolvedValueOnce(response([]))
      .mockResolvedValueOnce(response({ ...backDesign, dimensions: { width: 2500, height: 2500 } }))
      .mockResolvedValueOnce(response([backDesign]))
      .mockResolvedValueOnce(response([]));
    vi.stubGlobal("fetch", fetchMock);
    vi.stubGlobal("createImageBitmap", vi.fn().mockResolvedValue({ width: 2500, height: 2500, close: vi.fn() }));

    render(<CustomPhotobookAiProposalPanel coverMode="PHOTO_BASED" requestId={41} />);
    await selectWorkflowStep("Contratapa");
    const input = await screen.findByLabelText("Archivo de diseño propio para contratapa");
    fireEvent.change(input, { target: { files: [new File(["back artwork"], "contratapa.png", { type: "image/png" })] } });

    await waitFor(() => expect(fetchMock).toHaveBeenCalledWith(
      "/admin-api/photobook/custom-requests/41/designs/upload",
      expect.objectContaining({ method: "POST", body: expect.any(FormData) }),
    ));
    const uploadCall = fetchMock.mock.calls.find(([url]) => url === "/admin-api/photobook/custom-requests/41/designs/upload");
    expect((uploadCall?.[1]?.body as FormData).get("surface")).toBe("BACK_COVER");
    expect(await screen.findByRole("button", { name: "Usar como contratapa" })).toBeTruthy();
  });

  it("explains the required print dimensions and does not upload an invalid manual image", async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(response([]))
      .mockResolvedValueOnce(response([]));
    vi.stubGlobal("fetch", fetchMock);
    vi.stubGlobal("createImageBitmap", vi.fn().mockResolvedValue({ width: 1200, height: 1000, close: vi.fn() }));

    render(<CustomPhotobookAiProposalPanel coverMode="PHOTO_BASED" requestId={41} />);
    await selectWorkflowStep("Tapa frontal");
    const input = await screen.findByLabelText("Archivo de diseño propio para tapa frontal");
    fireEvent.change(input, { target: { files: [new File(["small"], "tapa.png", { type: "image/png" })] } });

    const manualArtworkGroup = screen.getByRole("group", { name: "Diseño propio para tapa frontal" });
    const dimensionError = await within(manualArtworkGroup).findByRole("alert");
    expect(dimensionError.textContent).toMatch(/debe ser cuadrada y medir al menos 2500 × 2500 px.*1200 × 1000 px/i);
    expect(fetchMock).not.toHaveBeenCalledWith("/admin-api/photobook/custom-requests/41/designs/upload", expect.anything());
  });
});
