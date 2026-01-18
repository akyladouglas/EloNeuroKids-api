import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PatientModule } from './presentation/patient.module';
import { AuthModule } from './presentation/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Disponível em toda a app
    }),
    PatientModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
