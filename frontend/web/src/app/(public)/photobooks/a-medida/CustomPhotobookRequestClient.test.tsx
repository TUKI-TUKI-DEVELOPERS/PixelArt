import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
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

async function uploadBothCovers(container: HTMLElement) {
  const frontInput = container.querySelector<HTMLInputElement>("#custom-photobook-front_cover");
  const backInput = container.querySelector<HTMLInputElement>("#custom-photobook-back_cover");
  fireEvent.change(frontInput!, { target: { files: [new File(["front"], "front-art.jpg", { type: "image/jpeg" })] } });
  fireEvent.change(backInput!, { target: { files: [new File(["back"], "back-art.jpg", { type: "image/jpeg" })] } });
  await waitFor(() => expect(screen.getByAltText("Vista previa: tapa principal")).toBeTruthy());
  await waitFor(() => expect(screen.getByAltText("Vista previa: contratapa")).toBeTruthy());
}

function clickContinue() {
  fireEvent.click(screen.getByRole("button", { name: /Continuar/ }));
}

function chooseThickCoverWithTwentySheets() {
  fireEvent.click(screen.getByRole("button", { name: "Elegir formato" }));
  const dialog = screen.getByRole("dialog", { name: "Elige la tapa y las hojas" });
  const thickSheets = within(dialog).getByRole("radiogroup", { name: /tapa gruesa/i });
  fireEvent.click(within(thickSheets).getByRole("radio", { name: /^20 hojas/ }));
  fireEvent.click(within(dialog).getByRole("button", { name: /Usar este formato/ }));
}

async function reachContactStep(container: HTMLElement) {
  await uploadBothCovers(container);
  fireEvent.change(screen.getByLabelText(/Título para la tapa/), { target: { value: "Nuestra historia" } });
  clickContinue();
  chooseThickCoverWithTwentySheets();
  clickContinue();
  expect(screen.getByRole("heading", { name: "¿Cómo te encontramos?" })).toBeTruthy();
}

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
    expect(screen.queryByText(/brief creativo|ocasión es/i)).toBeNull();

    await uploadBothCovers(container);
    fireEvent.change(screen.getByLabelText(/Título para la tapa/), { target: { value: "Nuestra historia" } });
    clickContinue();
    chooseThickCoverWithTwentySheets();

    expect(screen.getByText("S/ 140")).toBeTruthy();
    const coverCostNotice = screen.getByRole("note");
    expect(coverCostNotice.textContent).toContain("Importante: las tapas personalizadas tienen un costo aparte.");
    expect(coverCostNotice.textContent).toContain("El recargo por personalizar ambas tapas se acuerda por separado y no está incluido en este precio.");
    expect(screen.getByText(/recargo por personalizar ambas tapas.*no está incluido/i)).toBeTruthy();
    clickContinue();

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

  it("blocks each step until its required data is complete", async () => {
    const { container } = render(<CustomPhotobookRequestClient />);

    clickContinue();
    expect(screen.getByRole("alert").textContent).toMatch(/Adjunta una imagen para la tapa y otra para la contratapa/);

    await uploadBothCovers(container);
    clickContinue();
    expect(screen.getByRole("alert").textContent).toMatch(/Escribe el título/);
    expect(screen.getByLabelText(/Título para la tapa/).getAttribute("aria-invalid")).toBe("true");

    fireEvent.change(screen.getByLabelText(/Título para la tapa/), { target: { value: "Nuestra historia" } });
    clickContinue();
    expect(screen.getByRole("heading", { name: "Elige el formato de impresión" })).toBeTruthy();

    clickContinue();
    expect(screen.getByRole("dialog", { name: "Elige la tapa y las hojas" })).toBeTruthy();
    expect(screen.queryByRole("heading", { name: "¿Cómo te encontramos?" })).toBeNull();
  });

  it("does not offer 50 sheets for the thin cover, matching the API rule", async () => {
    const { container } = render(<CustomPhotobookRequestClient />);
    await uploadBothCovers(container);
    fireEvent.change(screen.getByLabelText(/Título para la tapa/), { target: { value: "Nuestra historia" } });
    clickContinue();
    fireEvent.click(screen.getByRole("button", { name: "Elegir formato" }));

    const dialog = screen.getByRole("dialog", { name: "Elige la tapa y las hojas" });
    const thinSheets = within(dialog).getByRole("radiogroup", { name: /tapa delgada/i });
    const thickSheets = within(dialog).getByRole("radiogroup", { name: /tapa gruesa/i });
    expect(within(thinSheets).queryByRole("radio", { name: /^50 hojas/ })).toBeNull();
    expect(within(thickSheets).getByRole("radio", { name: /^50 hojas/ })).toBeTruthy();
  });

  it("shows inline errors and blocks invalid email and phone numbers", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const { container } = render(<CustomPhotobookRequestClient />);
    await reachContactStep(container);

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
