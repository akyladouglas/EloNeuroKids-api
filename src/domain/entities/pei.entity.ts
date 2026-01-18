import { PeiGoal } from './pei-goal.entity';

export type PeiStatus = 'ACTIVE' | 'ARCHIVED';

export class Pei {
  constructor(
    public readonly id: string,
    public patientId: string,
    public startDate: Date,
    public endDate: Date | null,
    public status: PeiStatus,
    public goals: PeiGoal[] = [],
  ) {}

  isActive(): boolean {
    return this.status === 'ACTIVE';
  }

  archive(endDate: Date = new Date()): void {
    this.status = 'ARCHIVED';
    this.endDate = endDate;
  }
}
