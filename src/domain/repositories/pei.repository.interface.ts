import { Pei } from '../entities/pei.entity';

export interface IPeiRepository {
  create(pei: Pei): Promise<Pei>;
  findById(id: string): Promise<Pei | null>;
  findByPatientId(patientId: string): Promise<Pei[]>;
  findActiveByPatientId(patientId: string): Promise<Pei | null>;
  update(id: string, pei: Partial<Pei>): Promise<Pei>;
}
