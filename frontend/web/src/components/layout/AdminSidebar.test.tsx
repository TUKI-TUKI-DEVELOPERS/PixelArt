import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";

vi.mock("next/navigation", () => ({
  usePathname: () => "/admin",
}));

import AdminSidebar from "./AdminSidebar";

function response(data: unknown) {
  return new Response(JSON.stringify(data), { status: 200 });
}

describe("AdminSidebar", () => {
  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it("shows the new custom photobook request count on its navigation item", async () => {
    vi.stubGlobal("matchMedia", () => ({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(response([]))
      .mockResolvedValueOnce(response([]))
      .mockResolvedValueOnce(response([
        { id: 41, status: "PENDING_REVIEW" },
        { id: 42, status: "DESIGN_IN_PROGRESS" },
      ]));
    vi.stubGlobal("fetch", fetchMock);

    render(<AdminSidebar />);

    expect(await screen.findByRole("link", { name: /Photobooks a medida 1/i })).toBeTruthy();
    expect(fetchMock).toHaveBeenCalledWith("/admin-api/photobook/custom-requests");
  });
});
