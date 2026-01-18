export class MethodologyStage {
  constructor(
    public readonly id: number,
    public methodologyId: number,
    public name: string,
    public orderIndex: number,
  ) {}
}

export class Methodology {
  constructor(
    public readonly id: number,
    public name: string,
    public stages: MethodologyStage[] = [],
  ) {}
}
