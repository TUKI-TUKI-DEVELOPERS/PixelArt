import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";
import PhotobookSpreadEditor, { PAGE_W, PAGE_H, SLOT_GAP, PAGE_PAD } from "./PhotobookSpreadEditor";

vi.mock("interactjs", () => ({
  default: () => {
    const chain = { draggable: () => chain, dropzone: () => chain, unset: () => {} };
    return chain;
  },
}));

const layouts = [
  { key: "FULL_1", label: "1", slots: 1 },
  { key: "GRID_2", label: "2", slots: 2 },
  { key: "GRID_3", label: "3", slots: 3 },
  { key: "GRID_4", label: "4", slots: 4 },
];

const handlers = {
  onChangeLayout: vi.fn(),
  onAssignPhoto: vi.fn(),
  onRemovePhoto: vi.fn(),
  onDeletePage: vi.fn(),
  onDuplicatePage: vi.fn(),
  onReorderPages: vi.fn(),
  onClickPage: vi.fn(),
  onSwapSlots: vi.fn(),
  onUpdateSlotPosition: vi.fn(),
};

describe("PhotobookSpreadEditor preview invariants (printed PDF is 22x22 cm square, full-bleed)", () => {
  afterEach(cleanup);

  it("keeps the page geometry square like the physical 22x22 cm pages", () => {
    expect(PAGE_W).toBe(440);
    expect(PAGE_H).toBe(440);
    expect(PAGE_W).toBe(PAGE_H);
  });

  it("renders slots full-bleed with no inner gap or page padding, matching the PDF", () => {
    expect(SLOT_GAP).toBe(0);
    expect(PAGE_PAD).toBe(0);
  });

  it("renders a square page with a zero-gap grid, unrounded slots, and visible empty affordances", () => {
    const { container, getAllByText } = render(
      <PhotobookSpreadEditor
        pages={[{ pageNumber: 1, layoutKey: "GRID_4", slots: [null, null, null, null] }]}
        accent="#804187"
        layouts={layouts}
        {...handlers}
        coverUrl={null}
        backCoverUrl={null}
        isMobile
        mobilePageIdx={0}
      />,
    );

    const page = container.querySelector(".spread-page") as HTMLElement;
    expect(page).toBeTruthy();

    // Square page box: the fixed-size canvas behind the page is PAGE_W × PAGE_H.
    const canvas = page.parentElement as HTMLElement;
    expect(canvas.style.width).toBe(`${PAGE_W}px`);
    expect(canvas.style.height).toBe(`${PAGE_H}px`);

    // No rounding on the page box or the slots (full-bleed like the PDF).
    expect(page.style.borderRadius).toBe("");
    const grid = page.firstElementChild as HTMLElement;
    const slot = grid.firstElementChild as HTMLElement;
    expect(slot.style.borderRadius).toBe("");

    // Inner grid carries no padding/gap (jsdom serializes 0 as "", "0", or "0px").
    expect(["", "0", "0px"]).toContain(grid.style.padding);
    expect(["", "0", "0px"]).toContain(grid.style.gap);

    // Empty drop-zone affordances stay visible with pad=0.
    expect(getAllByText("Toca aquí")).toHaveLength(4);
  });
});
