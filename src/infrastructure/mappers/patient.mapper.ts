import { Patient as PrismaPatient, Prisma } from '@prisma/client';
import { Patient } from '@domain/entities/patient.entity';

export class PatientMapper {
  static toDomain(raw: PrismaPatient): Patient {
    return new Patient(
      raw.id,
      raw.name,
      raw.birthDate,
      raw.diagnosis,
      raw.isActive,
      // Schema doesn't have createdAt/updatedAt yet, passing undefined or adding to schema later
      undefined,
      undefined,
    );
  }

  static toPersistence(domain: Patient): Prisma.PatientCreateInput {
    return {
      id: domain.id || undefined, // Allow Prisma to generate UUID if empty
      name: domain.name,
      birthDate: domain.birthDate,
      diagnosis: domain.diagnosis,
      isActive: domain.isActive,
    };
  }
}
