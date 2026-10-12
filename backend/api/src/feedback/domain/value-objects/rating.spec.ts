import { Rating } from './rating';

describe('Rating.stars', () => {
  it('halves the stored ×2 value', () => {
    expect(new Rating(10).stars).toBe(5);
    expect(new Rating(9).stars).toBe(4.5);
    expect(new Rating(7).stars).toBe(3.5);
    expect(new Rating(2).stars).toBe(1);
  });

  it('does not validate the input range (characterization)', () => {
    // The class performs no validation — out-of-range values pass through.
    expect(new Rating(0).stars).toBe(0);
    expect(new Rating(11).stars).toBe(5.5);
    expect(new Rating(-2).stars).toBe(-1);
  });
});

describe('Rating.meetsGoogleThreshold', () => {
  it('is true at exactly 4.5 stars (valueX2 = 9)', () => {
    expect(new Rating(9).meetsGoogleThreshold()).toBe(true);
  });

  it('is true above the threshold', () => {
    expect(new Rating(10).meetsGoogleThreshold()).toBe(true);
  });

  it('is false below the threshold', () => {
    expect(new Rating(8).meetsGoogleThreshold()).toBe(false);
    expect(new Rating(1).meetsGoogleThreshold()).toBe(false);
  });
});
