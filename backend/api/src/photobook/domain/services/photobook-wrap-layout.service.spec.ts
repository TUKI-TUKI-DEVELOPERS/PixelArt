import { computeSourceCrops, computeWrapLayout } from './photobook-wrap-layout.service';

describe('computeWrapLayout', () => {
  // Real anchor case: 22×22 cm cover, 40 mm spine (30 caras TAPA_GRUESA), 3 mm bleed.
  const layout = computeWrapLayout(22, 22, 40, 3);

  it('converts spine and bleed from mm to cm', () => {
    expect(layout.bleedCm).toBeCloseTo(0.3, 10);
    expect(layout.spineWidthCm).toBeCloseTo(4, 10);
  });

  it('passes through the cover trim size', () => {
    expect(layout.coverWidthCm).toBe(22);
    expect(layout.coverHeightCm).toBe(22);
  });

  it('lays out back cover, spine and front cover left-to-right after the bleed', () => {
    expect(layout.backCoverLeftCm).toBeCloseTo(0.3, 10);
    expect(layout.spineLeftCm).toBeCloseTo(22.3, 10);
    expect(layout.frontCoverLeftCm).toBeCloseTo(26.3, 10);
  });

  it('computes the total page size as 2 covers + spine + bleed on both sides', () => {
    expect(layout.totalWidthCm).toBeCloseTo(48.6, 10);
    expect(layout.totalHeightCm).toBeCloseTo(22.6, 10);
  });

  it('centers the spine text anchor in the middle of the spine', () => {
    expect(layout.spineCenterCm).toBeCloseTo(24.3, 10);
  });

  it('keeps the front cover flush with the end of the spine', () => {
    expect(layout.frontCoverLeftCm).toBeCloseTo(layout.spineLeftCm + layout.spineWidthCm, 10);
  });
});

describe('computeSourceCrops', () => {
  const layout = computeWrapLayout(22, 22, 40, 3); // innerWidth = 48 cm

  it('maps zones proportionally over the inner width (no bleed)', () => {
    // 4800 px over 48 cm → 100 px/cm, exact with no rounding.
    const crops = computeSourceCrops(4800, 1000, layout);
    expect(crops.backCover).toEqual({ left: 0, top: 0, width: 2200, height: 1000 });
    expect(crops.spine).toEqual({ left: 2200, top: 0, width: 400, height: 1000 });
    expect(crops.frontCover).toEqual({ left: 2600, top: 0, width: 2200, height: 1000 });
  });

  it('absorbs rounding drift in the front cover so widths sum exactly to the source', () => {
    // 1000 px / 48 cm → back = round(458.33) = 458, spine = round(83.33) = 83,
    // front takes the remainder (459) instead of its own rounded value (458).
    const crops = computeSourceCrops(1000, 700, layout);
    expect(crops.backCover.width).toBe(458);
    expect(crops.spine.width).toBe(83);
    expect(crops.frontCover.width).toBe(459);
    expect(crops.backCover.width + crops.spine.width + crops.frontCover.width).toBe(1000);
  });

  it('keeps zones contiguous: each crop starts where the previous one ends', () => {
    const crops = computeSourceCrops(1000, 700, layout);
    expect(crops.backCover.left).toBe(0);
    expect(crops.spine.left).toBe(crops.backCover.width);
    expect(crops.frontCover.left).toBe(crops.backCover.width + crops.spine.width);
  });

  it('sums exactly to the source width for awkward widths', () => {
    for (const sourceWidth of [999, 1234, 2896, 3001]) {
      const crops = computeSourceCrops(sourceWidth, 500, layout);
      const sum = crops.backCover.width + crops.spine.width + crops.frontCover.width;
      expect(sum).toBe(sourceWidth);
    }
  });

  it('uses the full source height for every zone', () => {
    const crops = computeSourceCrops(2896, 1024, layout);
    expect(crops.backCover.height).toBe(1024);
    expect(crops.spine.height).toBe(1024);
    expect(crops.frontCover.height).toBe(1024);
    expect(crops.backCover.top).toBe(0);
    expect(crops.spine.top).toBe(0);
    expect(crops.frontCover.top).toBe(0);
  });

  it('scales crops with a different spine width', () => {
    // Thin book: 39 mm spine (TAPA_DELGADA anchor) → innerWidth 47.9 cm.
    const thin = computeWrapLayout(22, 22, 39, 3);
    const crops = computeSourceCrops(4790, 100, thin); // 100 px/cm exact
    expect(crops.backCover.width).toBe(2200);
    expect(crops.spine.width).toBe(390);
    expect(crops.frontCover.width).toBe(2200);
  });
});
