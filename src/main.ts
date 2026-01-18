import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validation Pipe (for DTOs)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strips properties not in DTO
      forbidNonWhitelisted: true, // Throws error if extra props sent
      transform: true, // Transforms primitive types
    }),
  );

  // Interceptor for serialization (Expose/Exclude)
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('EloNeuroKids API')
    .setDescription('API for Child Neurodevelopment Clinics Management')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
