import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import CustomPhotobookSheetSetup from "./CustomPhotobookSheetSetup";

describe("CustomPhotobookSheetSetup", () => {
  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it("persists the selected sheet count before continuing to the editor", async () => {
    const configured = vi.fn();
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({}) });
    vi.stubGlobal("fetch", fetchMock);

    render(<CustomPhotobookSheetSetup products={[{ id: 8 }]} mode="initial" onConfigured={configured} />);

    fireEvent.click(screen.getByRole("radio", { name: "35 hojas, 70 páginas, S/ 200" }));
    fireEvent.click(screen.getByRole("button", { name: "Continuar a subir fotos" }));

    await waitFor(() => expect(configured).toHaveBeenCalledTimes(1));
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/photobook/custom-editor/draft",
      expect.objectContaining({ method: "PUT", body: expect.any(String) }),
    );
    const [, options] = fetchMock.mock.calls[0];
    const payload = JSON.parse(options.body as string);
    expect(payload.state).toMatchObject({ editorMode: "CUSTOM_FULL_EDITOR", step: 1, selectedProduct: 8 });
    expect(payload.state).toMatchObject({ coverType: "TAPA_GRUESA", formatConfigured: true });
    expect(payload.state.pages).toHaveLength(70);
  });

  it("uses the live editor snapshot instead of rereading a potentially stale draft", async () => {
    const configured = vi.fn();
    const photos = [{ id: 501, url: "https://cdn.test/photo.jpg", preview: "https://cdn.test/photo.jpg", storageKey: "uploads/photo.jpg" }];
    const pages = Array.from({ length: 30 }, (_, index) => ({ pageNumber: index + 1, layoutKey: "FULL_1", slots: index === 0 ? [{ id: 501 }] : [null] }));
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({}) });
    vi.stubGlobal("fetch", fetchMock);

    render(<CustomPhotobookSheetSetup products={[{ id: 8 }]} mode="change" initialDraft={{ editorMode: "CUSTOM_FULL_EDITOR", formatConfigured: true, coverType: "TAPA_DELGADA", pages, photos }} onConfigured={configured} onCancel={vi.fn()} />);

    fireEvent.click(await screen.findByRole("button", { name: "Actualizar formato" }));
    await waitFor(() => expect(configured).toHaveBeenCalledTimes(1));
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [, options] = fetchMock.mock.calls[0];
    expect(JSON.parse(options.body as string).state).toMatchObject({ photos, pages });
  });

  it("requires confirmation before reducing pages that contain photos", async () => {
    const configured = vi.fn();
    const pages = Array.from({ length: 70 }, (_, index) => ({
      pageNumber: index + 1,
      layoutKey: "FULL_1",
      slots: index === 40 ? [{ id: 501 }] : [null],
    }));
    const fetchMock = vi.fn()
      .mockResolvedValueOnce({ ok: true, json: async () => ({ state: { editorMode: "CUSTOM_FULL_EDITOR", formatConfigured: true, coverType: "TAPA_GRUESA", pages } }) })
      .mockResolvedValueOnce({ ok: true, json: async () => ({}) });
    vi.stubGlobal("fetch", fetchMock);

    render(<CustomPhotobookSheetSetup products={[{ id: 8 }]} mode="change" onConfigured={configured} onCancel={vi.fn()} />);

    fireEvent.click(await screen.findByRole("radio", { name: "15 hojas, 30 páginas, S/ 120" }));
    fireEvent.click(screen.getByRole("button", { name: "Actualizar formato" }));
    expect(await screen.findByText(/Hay fotos en las páginas/)).toBeTruthy();
    expect(configured).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole("button", { name: "Confirmar cambio" }));
    await waitFor(() => expect(configured).toHaveBeenCalledTimes(1));
    const [, options] = fetchMock.mock.calls[1];
    expect(JSON.parse(options.body as string).state.pages).toHaveLength(30);
  });
});
