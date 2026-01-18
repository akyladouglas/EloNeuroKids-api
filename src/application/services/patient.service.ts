import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreatePatientDto } from '@dtos/create-patient.dto';
import { UpdatePatientDto } from '@dtos/update-patient.dto';
import { PatientCreatedResponseDto } from '@dtos/patient-created-response.dto';
import { PatientDetailsResponseDto } from '@dtos/patient-details-response.dto';
import type { IPatientRepository } from '@domain/repositories/patient.repository.interface';
import { Patient } from '@domain/entities/patient.entity';

const PATIENT_REPOSITORY = 'IPatientRepository';

@Injectable()
export class PatientService {
  constructor(
    @Inject(PATIENT_REPOSITORY)
    private readonly patientRepository: IPatientRepository,
  ) {}

  async create(dto: CreatePatientDto): Promise<PatientCreatedResponseDto> {
    const newPatient = new Patient(
      uuidv4(),
      dto.name,
      new Date(dto.birthDate),
      dto.diagnosis || null,
      dto.isActive ?? true,
    );

    const savedPatient = await this.patientRepository.create(newPatient);
    return PatientCreatedResponseDto.fromDomain(savedPatient);
  }

  async findAll(): Promise<PatientDetailsResponseDto[]> {
    const patients = await this.patientRepository.findAll();
    return patients.map((patient) => PatientDetailsResponseDto.fromDomain(patient));
  }

  async findById(id: string): Promise<PatientDetailsResponseDto> {
    const patient = await this.patientRepository.findById(id);
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
    return PatientDetailsResponseDto.fromDomain(patient);
  }

  async update(id: string, dto: UpdatePatientDto): Promise<void> {
    const patient = await this.patientRepository.findById(id);
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }

    patient.updateDetails(dto.name, dto.birthDate ? new Date(dto.birthDate) : undefined, dto.diagnosis, dto.isActive);

    await this.patientRepository.update(id, patient);
  }

  async remove(id: string): Promise<void> {
    const patient = await this.patientRepository.findById(id);
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }

    patient.deactivate();
    await this.patientRepository.update(id, patient);
  }
}
