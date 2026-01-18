import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Patient } from '@domain/entities/patient.entity';

@Exclude()
export class PatientResponseDto {
  @ApiProperty({ example: 'uuid-v4-string' })
  @Expose()
  id: string;

  // Propriedades expostas (importante para o GET/Listagem)
  @ApiProperty({ example: 'Joãozinho Silva' })
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  birthDate: Date;

  @ApiProperty({ nullable: true })
  @Expose()
  diagnosis: string | null;

  @ApiProperty()
  @Expose()
  isActive: boolean;

  @ApiProperty({ example: 7 })
  @Expose()
  age: number;

  constructor(partial: Partial<PatientResponseDto>) {
    Object.assign(this, partial);
  }

  static fromDomain(patient: Patient): PatientResponseDto {
    return new PatientResponseDto({
      id: patient.id,
      name: patient.name,
      birthDate: patient.birthDate,
      diagnosis: patient.diagnosis,
      isActive: patient.isActive,
      age: patient.age,
    });
  }
}
