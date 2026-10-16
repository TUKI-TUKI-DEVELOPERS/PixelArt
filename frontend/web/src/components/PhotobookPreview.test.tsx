import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";
import PhotobookPreview, {
  PAGE_W,
  PAGE_H,
  COMPACT_PAGE_W,
  COMPACT_PAGE_H,
  SLOT_GAP,
  PAGE_PAD,
} from "./PhotobookPreview";

vi.mock("page-flip", () => ({
  PageFlip: class {
    on() {}
    loadFromHTML() {}
    getPageCount() {
      return 4;
    }
    flipNext() {}
    flipPrev() {}
    destroy() {}
  },
}));

const photo = { preview: "https://example.com/p.jpg" };

describe("PhotobookPreview invariants (printed PDF is 22x22 cm square, full-bleed)", () => {
  afterEach(cleanup);

  it("keeps the page geometry square like the physical 22x22 cm pages", () => {
    expect(PAGE_W).toBe(440);
    expect(PAGE_H).toBe(440);
    expect(PAGE_W).toBe(PAGE_H);
  });

  it("keeps the compact (portrait/mobile) variant square too", () => {
    expect(COMPACT_PAGE_W).toBe(220);
    expect(COMPACT_PAGE_H).toBe(220);
    expect(COMPACT_PAGE_W).toBe(COMPACT_PAGE_H);
  });

  it("renders slots full-bleed with no inner gap or page padding, matching the PDF", () => {
    expect(SLOT_GAP).toBe(0);
    expect(PAGE_PAD).toBe(0);
  });

  it("renders FULL_1 with no padding and an unrounded slot", () => {
    const { container } = render(
      <PhotobookPreview
        pages={[{ pageNumber: 1, layoutKey: "FULL_1", slots: [photo] }]}
        accent="#804187"
      />,
    );

    const inner = container.querySelector(".pb-page-inner") as HTMLElement;
    expect(inner).toBeTruthy();
    const wrapper = inner.firstElementChild as HTMLElement;
    // jsdom serializes 0 as "", "0", or "0px".
    expect(["", "0", "0px"]).toContain(wrapper.style.padding);
    const slot = wrapper.firstElementChild as HTMLElement;
    expect(slot.style.borderRadius).toBe("");
  });

  it("renders GRID_2/GRID_4 grids with zero gap, zero padding, and unrounded slots", () => {
    const { container } = render(
      <PhotobookPreview
        pages={[
          { pageNumber: 1, layoutKey: "GRID_2", slots: [photo, photo] },
          { pageNumber: 2, layoutKey: "GRID_4", slots: [photo, photo, photo, photo] },
        ]}
        accent="#804187"
      />,
    );

    const inners = container.querySelectorAll(".pb-page-inner");
    expect(inners).toHaveLength(2);
    inners.forEach((inner) => {
      const grid = inner.firstElementChild as HTMLElement;
      expect(["", "0", "0px"]).toContain(grid.style.padding);
      expect(["", "0", "0px"]).toContain(grid.style.gap);
      Array.from(grid.children).forEach((slot) => {
        expect((slot as HTMLElement).style.borderRadius).toBe("");
      });
    });
  });

  it("mirrors the PDF GRID_3 template: 1fr 1fr rows with the first slot spanning both columns", () => {
    const { container } = render(
      <PhotobookPreview
        pages={[{ pageNumber: 1, layoutKey: "GRID_3", slots: [photo, photo, photo] }]}
        accent="#804187"
      />,
    );

    const inner = container.querySelector(".pb-page-inner") as HTMLElement;
    const grid = inner.firstElementChild as HTMLElement;
    expect(grid.style.gridTemplateColumns).toBe("1fr 1fr");
    expect(grid.style.gridTemplateRows).toBe("1fr 1fr");
    expect(["", "0", "0px"]).toContain(grid.style.gap);
    const firstSlot = grid.firstElementChild as HTMLElement;
    expect(firstSlot.style.gridColumn).toBe("1 / -1");
  });
});
