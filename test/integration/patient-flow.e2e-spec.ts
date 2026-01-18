import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/app.module';
import { CreatePatientDto } from '@dtos/create-patient.dto';
import { UpdatePatientDto } from '@dtos/update-patient.dto';

describe('Patient Flow (E2E)', () => {
  let app: INestApplication;
  let accessToken: string;
  let createdPatientId: string;

  // Usuário do Seed
  const loginPayload = {
    email: 'admin@eloneurokids.com',
    password: 'password123',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('1. Deve fazer login e obter access_token', async () => {
    const response = await request(app.getHttpServer()).post('/auth/login').send(loginPayload).expect(200);

    expect(response.body).toHaveProperty('access_token');
    accessToken = response.body.access_token;
  });

  it('2. Deve criar um paciente (POST)', async () => {
    const createDto: CreatePatientDto = {
      name: 'Paciente E2E Teste',
      birthDate: '2023-01-01T00:00:00.000Z',
      diagnosis: 'Teste de Integração',
      isActive: true,
    };

    const response = await request(app.getHttpServer())
      .post('/patients')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(createDto)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    createdPatientId = response.body.id;
  });

  it('3. Deve listar todos os pacientes (GET All)', async () => {
    const response = await request(app.getHttpServer())
      .get('/patients')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('4. Deve buscar o paciente criado pelo ID (GET By ID)', async () => {
    const response = await request(app.getHttpServer())
      .get(`/patients/${createdPatientId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(response.body.id).toBe(createdPatientId);
    expect(response.body.name).toBe('Paciente E2E Teste');
  });

  it('5. Deve atualizar o paciente (PATCH)', async () => {
    const updateDto: UpdatePatientDto = {
      name: 'Paciente E2E Teste 2', // Alterando o nome
    };

    await request(app.getHttpServer())
      .patch(`/patients/${createdPatientId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(updateDto)
      .expect(204); // No Content
  });

  it('6. Deve verificar se a atualização persistiu (GET By ID)', async () => {
    const response = await request(app.getHttpServer())
      .get(`/patients/${createdPatientId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(response.body.name).toBe('Paciente E2E Teste 2');
  });

  it('7. Deve deletar o paciente (DELETE - Soft Delete)', async () => {
    await request(app.getHttpServer())
      .delete(`/patients/${createdPatientId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
  });

  it('8. Deve verificar se foi desativado (GET By ID)', async () => {
    const response = await request(app.getHttpServer())
      .get(`/patients/${createdPatientId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(response.body.isActive).toBe(false);
  });
});
