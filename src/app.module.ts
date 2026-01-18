import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PatientModule } from './presentation/patient.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Disponível em toda a app
    }),
    PatientModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
