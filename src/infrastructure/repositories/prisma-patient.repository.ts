import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IPatientRepository } from '@domain/repositories/patient.repository.interface';
import { Patient } from '@domain/entities/patient.entity';
import { PatientMapper } from '../mappers/patient.mapper';

@Injectable()
export class PrismaPatientRepository implements IPatientRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(patient: Patient): Promise<Patient> {
    const data = PatientMapper.toPersistence(patient);

    const created = await this.prisma.patient.create({
      data,
    });
    return PatientMapper.toDomain(created);
  }

  async findById(id: string): Promise<Patient | null> {
    const found = await this.prisma.patient.findUnique({
      where: { id },
    });
    return found ? PatientMapper.toDomain(found) : null;
  }

  async findAll(): Promise<Patient[]> {
    const found = await this.prisma.patient.findMany();
    return found.map((p) => PatientMapper.toDomain(p));
  }

  async update(id: string, patient: Partial<Patient>): Promise<Patient> {
    const updated = await this.prisma.patient.update({
      where: { id },
      data: {
        name: patient.name,
        birthDate: patient.birthDate,
        diagnosis: patient.diagnosis,
        isActive: patient.isActive,
      },
    });
    return PatientMapper.toDomain(updated);
  }
}
