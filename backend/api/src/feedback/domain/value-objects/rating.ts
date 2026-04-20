// TODO: Value object Rating (escala ×2, 1-10 en DB)
export class Rating {
  constructor(private readonly valueX2: number) {}
  get stars(): number { return this.valueX2 / 2; }
  meetsGoogleThreshold(): boolean { return this.stars >= 4.5; }
}
