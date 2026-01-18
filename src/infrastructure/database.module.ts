import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaPatientRepository } from './repositories/prisma-patient.repository';

// Tokens para Injeção de Dependência
export const PATIENT_REPOSITORY = 'IPatientRepository';

@Module({
  providers: [
    PrismaService,
    // Provider com Token personalizado
    {
      provide: PATIENT_REPOSITORY,
      useClass: PrismaPatientRepository,
    },
  ],
  exports: [
    PrismaService,
    PATIENT_REPOSITORY, // Exporta o Token para ser usado em outros módulos
  ],
})
export class DatabaseModule {}
