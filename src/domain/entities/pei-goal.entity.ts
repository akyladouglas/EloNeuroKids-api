import { MethodologyStage } from './methodology.entity';

export class PeiGoal {
  constructor(
    public readonly id: string,
    public peiId: string,
    public currentStageId: number,
    public title: string,
    public description: string | null,
    public currentStage?: MethodologyStage, // Optional loaded relation
  ) {}
}
