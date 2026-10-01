import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import CustomPhotobookCoverApprovalClient from "./CustomPhotobookCoverApprovalClient";

const approval = {
  customerName: "Ana Cliente",
  title: "Japón, otoño de 2026",
  status: "AWAITING_CUSTOMER",
  isApproved: false,
  frontCoverUrl: "https://assets.test/front.png",
  backCoverUrl: "https://assets.test/back.png",
  expiresAt: "2026-10-05T12:00:00.000Z",
};

describe("CustomPhotobookCoverApprovalClient", () => {
  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it("shows the selected cover pair and records an explicit customer approval", async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(new Response(JSON.stringify(approval), { status: 200 }))
      .mockResolvedValueOnce(new Response(JSON.stringify({ status: "EDITOR_READY", approved: true }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    render(<CustomPhotobookCoverApprovalClient token="cover-token" />);

    expect(await screen.findByAltText("Tapa frontal de Japón, otoño de 2026")).toBeTruthy();
    expect(screen.getByAltText("Contratapa de Japón, otoño de 2026")).toBeTruthy();
    fireEvent.click(screen.getByText("Aprobar mi cubierta"));

    await waitFor(() => expect(fetchMock).toHaveBeenLastCalledWith(
      "/api/photobook/custom-requests/cover-approval/cover-token/approve",
      { method: "POST" },
    ));
    expect(await screen.findByText("Gracias, ya registramos tu aprobación.")).toBeTruthy();
  });

  it("sends a scoped adjustment request instead of forcing the customer to approve", async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(new Response(JSON.stringify(approval), { status: 200 }))
      .mockResolvedValueOnce(new Response(JSON.stringify({ status: "CHANGES_REQUESTED", adjustmentRequested: true }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    render(<CustomPhotobookCoverApprovalClient token="cover-token" />);

    fireEvent.click(await screen.findByText("Solicitar ajustes"));
    fireEvent.click(screen.getByLabelText("Contratapa"));
    fireEvent.change(screen.getByLabelText("Describe los ajustes que necesitas"), { target: { value: "Quisiera una composición más limpia detrás de la foto." } });
    fireEvent.click(screen.getByText("Enviar solicitud"));

    await waitFor(() => expect(fetchMock).toHaveBeenLastCalledWith(
      "/api/photobook/custom-requests/cover-approval/cover-token/adjustments",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ surface: "BACK_COVER", message: "Quisiera una composición más limpia detrás de la foto." }),
      },
    ));
    expect(await screen.findByText("Revisaremos tus ajustes antes de continuar.")).toBeTruthy();
  });

  it("does not reveal a proposal when the private link is unavailable", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({ message: "El enlace expiró." }), { status: 403 })));

    render(<CustomPhotobookCoverApprovalClient token="expired-token" />);

    expect(await screen.findByText("Este enlace no está disponible.")).toBeTruthy();
    expect(screen.queryByText("Aprobar mi cubierta")).toBeNull();
  });
});
