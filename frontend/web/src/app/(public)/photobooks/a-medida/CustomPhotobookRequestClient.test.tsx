import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import CustomPhotobookRequestClient from "./CustomPhotobookRequestClient";

vi.mock("@/hooks/usePhotoUpload", () => ({
  usePhotoUpload: () => ({
    uploading: false,
    progress: 100,
    error: null,
    uploadFiles: vi.fn(async (files: File[]) => files.map((file) => ({
      id: file.name.includes("front") ? 101 : 102,
      url: `https://assets.test/${file.name}`,
      preview: `blob:${file.name}`,
      storageKey: `uploads/${file.name}`,
      originalFilename: file.name,
      sizeBytes: file.size,
      width: 1000,
      height: 1000,
    }))),
  }),
}));

describe("CustomPhotobookRequestClient", () => {
  let originalScrollIntoView: PropertyDescriptor | undefined;

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
    if (originalScrollIntoView) Object.defineProperty(HTMLElement.prototype, "scrollIntoView", originalScrollIntoView);
    else Reflect.deleteProperty(HTMLElement.prototype, "scrollIntoView");
    originalScrollIntoView = undefined;
  });

  it("sends the selected physical format, title, and one image per cover surface", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ id: 41 }) });
    const scrollIntoView = vi.fn();
    originalScrollIntoView = Object.getOwnPropertyDescriptor(HTMLElement.prototype, "scrollIntoView");
    Object.defineProperty(HTMLElement.prototype, "scrollIntoView", { configurable: true, value: scrollIntoView });
    vi.stubGlobal("fetch", fetchMock);
    const { container } = render(<CustomPhotobookRequestClient />);

    expect(screen.getByText("Tapa principal")).toBeTruthy();
    expect(screen.getByText("Contratapa")).toBeTruthy();
    expect(screen.getByLabelText("Tipo físico de tapa")).toBeTruthy();
        expect(screen.getByLabelText("Cantidad de hojas")).toBeTruthy();
        expect(screen.getByText(/personalizar la tapa y contratapa.*no está incluido/i)).toBeTruthy();
    expect(screen.queryByText(/brief creativo|ocasión es/i)).toBeNull();

    const frontInput = container.querySelector<HTMLInputElement>("#custom-photobook-front_cover");
    const backInput = container.querySelector<HTMLInputElement>("#custom-photobook-back_cover");
    fireEvent.change(frontInput!, { target: { files: [new File(["front"], "front-art.jpg", { type: "image/jpeg" })] } });
    fireEvent.change(backInput!, { target: { files: [new File(["back"], "back-art.jpg", { type: "image/jpeg" })] } });
    await waitFor(() => expect(screen.getByAltText("Vista previa: tapa principal")).toBeTruthy());
    await waitFor(() => expect(screen.getByAltText("Vista previa: contratapa")).toBeTruthy());
    fireEvent.change(screen.getByLabelText("Tipo físico de tapa"), { target: { value: "TAPA_GRUESA" } });
    fireEvent.change(screen.getByLabelText("Cantidad de hojas"), { target: { value: "20" } });
    expect(screen.getByText("S/ 140")).toBeTruthy();
    fireEvent.change(screen.getByLabelText(/Título que imaginas para la tapa/), { target: { value: "Nuestra historia" } });
    fireEvent.change(screen.getByLabelText(/Nombre completo/), { target: { value: "Ana Cliente" } });
    fireEvent.change(screen.getByLabelText(/Teléfono \/ WhatsApp/), { target: { value: "+51 999 111 222" } });
    fireEvent.change(screen.getByLabelText(/Correo electrónico/), { target: { value: "ana@example.com" } });
    fireEvent.click(screen.getByRole("button", { name: /Enviar mi diseño/ }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    const successHeading = await screen.findByRole("heading", { name: "Ya tenemos tu diseño." });
    await waitFor(() => expect(document.activeElement).toBe(successHeading));
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth", block: "start" });
    const [, request] = fetchMock.mock.calls[0];
    expect(JSON.parse(request.body)).toMatchObject({
      coverTitle: "Nuestra historia",
      coverMode: "CUSTOMER_ARTWORK",
      coverType: "TAPA_GRUESA",
      sheetCount: 20,
      referenceSlots: [
        { assetId: 101, surface: "FRONT_COVER", slotIndex: 1 },
        { assetId: 102, surface: "BACK_COVER", slotIndex: 1 },
      ],
    });
  });

  it("shows inline errors and blocks invalid email and phone numbers", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const { container } = render(<CustomPhotobookRequestClient />);

    const frontInput = container.querySelector<HTMLInputElement>("#custom-photobook-front_cover");
    const backInput = container.querySelector<HTMLInputElement>("#custom-photobook-back_cover");
    fireEvent.change(frontInput!, { target: { files: [new File(["front"], "front-art.jpg", { type: "image/jpeg" })] } });
    fireEvent.change(backInput!, { target: { files: [new File(["back"], "back-art.jpg", { type: "image/jpeg" })] } });
    await waitFor(() => expect(screen.getByAltText("Vista previa: contratapa")).toBeTruthy());
    fireEvent.change(screen.getByLabelText(/Título que imaginas para la tapa/), { target: { value: "Nuestra historia" } });
    fireEvent.change(screen.getByLabelText(/Nombre completo/), { target: { value: "Ana Cliente" } });
    const phoneInput = screen.getByLabelText(/Teléfono \/ WhatsApp/);
    const emailInput = screen.getByLabelText(/Correo electrónico/);
    fireEvent.change(phoneInput, { target: { value: "12345678" } });
    fireEvent.change(emailInput, { target: { value: "ana@ejemplo.c" } });

    expect(screen.getByText(/Ingresa un celular peruano de 9 dígitos/i)).toBeTruthy();
    expect(screen.getByText(/correo válido/i)).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /Enviar mi diseño/ }));

    expect(fetchMock).not.toHaveBeenCalled();
    expect(phoneInput.getAttribute("aria-invalid")).toBe("true");
    expect(emailInput.getAttribute("aria-invalid")).toBe("true");
  });
});
