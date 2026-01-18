import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Patient } from '@domain/entities/patient.entity';

@Exclude()
export class PatientCreatedResponseDto {
  @ApiProperty({ example: 'uuid-v4-string', description: 'ID of the newly created patient' })
  @Expose()
  id: string;

  constructor(partial: Partial<PatientCreatedResponseDto>) {
    Object.assign(this, partial);
  }

  static fromDomain(patient: Patient): PatientCreatedResponseDto {
    return new PatientCreatedResponseDto({
      id: patient.id,
    });
  }
}
