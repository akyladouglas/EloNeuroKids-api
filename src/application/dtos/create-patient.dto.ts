import { IsBoolean, IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePatientDto {
  @ApiProperty({ example: 'Joãozinho Silva', description: 'Full name of the patient' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '2018-05-15T00:00:00.000Z', description: 'Date of birth (ISO 8601)' })
  @IsDateString()
  @IsNotEmpty()
  birthDate: string;

  @ApiPropertyOptional({ example: 'TEA Nível 1', description: 'Clinical diagnosis' })
  @IsString()
  @IsOptional()
  diagnosis?: string;

  @ApiPropertyOptional({ example: true, default: true, description: 'Is the patient active?' })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
