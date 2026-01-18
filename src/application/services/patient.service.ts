import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreatePatientDto } from '@dtos/create-patient.dto';
import { UpdatePatientDto } from '@dtos/update-patient.dto';
import { PatientResponseDto } from '@dtos/patient-response.dto';
import type { IPatientRepository } from '@domain/repositories/patient.repository.interface';
import { Patient } from '@domain/entities/patient.entity';

const PATIENT_REPOSITORY = 'IPatientRepository';

@Injectable()
export class PatientService {
  constructor(
    @Inject(PATIENT_REPOSITORY)
    private readonly patientRepository: IPatientRepository,
  ) {}

  async create(dto: CreatePatientDto): Promise<PatientResponseDto> {
    const newPatient = new Patient(
      uuidv4(),
      dto.name,
      new Date(dto.birthDate),
      dto.diagnosis || null,
      dto.isActive ?? true,
    );

    const savedPatient = await this.patientRepository.create(newPatient);
    return PatientResponseDto.fromDomain(savedPatient);
  }

  async findAll(): Promise<PatientResponseDto[]> {
    const patients = await this.patientRepository.findAll();
    return patients.map((patient) => PatientResponseDto.fromDomain(patient));
  }

  async findById(id: string): Promise<PatientResponseDto> {
    const patient = await this.patientRepository.findById(id);
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
    return PatientResponseDto.fromDomain(patient);
  }

  async update(id: string, dto: UpdatePatientDto): Promise<PatientResponseDto> {
    const patient = await this.patientRepository.findById(id);
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }

    // Merge manual simples (poderia ser feito na entidade se houvesse lógica de domínio)
    const updatedData: Partial<Patient> = {
      name: dto.name ?? patient.name,
      birthDate: dto.birthDate ? new Date(dto.birthDate) : patient.birthDate,
      diagnosis: dto.diagnosis !== undefined ? dto.diagnosis : patient.diagnosis,
      isActive: dto.isActive !== undefined ? dto.isActive : patient.isActive,
    };

    const updatedPatient = await this.patientRepository.update(id, updatedData);
    return PatientResponseDto.fromDomain(updatedPatient);
  }

  async remove(id: string): Promise<void> {
    // Soft delete: apenas desativa
    await this.update(id, { isActive: false });
  }
}
