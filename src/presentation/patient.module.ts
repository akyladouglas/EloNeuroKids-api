import { Module } from '@nestjs/common';
import { PatientController } from './controllers/patient.controller';
import { PatientService } from '@application/services/patient.service';
import { DatabaseModule } from '@infrastructure/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule {}
