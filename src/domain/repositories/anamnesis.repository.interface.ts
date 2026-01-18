import { Anamnesis } from '../entities/anamnesis.entity';

export interface IAnamnesisRepository {
  create(anamnesis: Anamnesis): Promise<Anamnesis>;
  findByPatientAndRole(patientId: string, roleId: string): Promise<Anamnesis | null>;
  findById(id: string): Promise<Anamnesis | null>;
}
