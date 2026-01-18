import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePatientDto {
  @ApiPropertyOptional({ example: 'Joãozinho Silva Editado' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ example: '2018-05-15T00:00:00.000Z' })
  @IsDateString()
  @IsOptional()
  birthDate?: string;

  @ApiPropertyOptional({ example: 'TEA Nível 2' })
  @IsString()
  @IsOptional()
  diagnosis?: string;

  @ApiPropertyOptional({ example: false })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
