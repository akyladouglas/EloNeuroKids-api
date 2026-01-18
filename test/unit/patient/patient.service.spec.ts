import { Test, TestingModule } from '@nestjs/testing';
import { PatientService } from '@application/services/patient.service';
import { IPatientRepository } from '@domain/repositories/patient.repository.interface';
import { CreatePatientDto } from '@dtos/create-patient.dto';
import { UpdatePatientDto } from '@dtos/update-patient.dto';
import { Patient } from '@domain/entities/patient.entity';
import { NotFoundException } from '@nestjs/common';

// Token usado para injeção
const PATIENT_REPOSITORY = 'IPatientRepository';

// Mock do módulo 'uuid' APENAS para este arquivo de teste
jest.mock('uuid', () => ({
  v4: () => 'generated-uuid',
}));

describe('Serviço de Pacientes', () => {
  let service: PatientService;
  let repository: IPatientRepository;

  const mockPatientRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PatientService,
        {
          provide: PATIENT_REPOSITORY,
          useValue: mockPatientRepository,
        },
      ],
    }).compile();

    service = module.get<PatientService>(PatientService);
    repository = module.get<IPatientRepository>(PATIENT_REPOSITORY);
  });

  it('o serviço deve estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('criar um paciente com sucesso', () => {
    it('deve criar um paciente com sucesso e retornar apenas o ID', async () => {
      const createDto: CreatePatientDto = {
        name: 'Joãozinho',
        birthDate: '2018-05-15',
        diagnosis: 'TEA',
        isActive: true,
      };

      const savedEntity = new Patient(
        'uuid-1234',
        createDto.name,
        new Date(createDto.birthDate),
        createDto.diagnosis!,
        createDto.isActive!,
      );

      mockPatientRepository.create.mockResolvedValue(savedEntity);

      const result = await service.create(createDto);

      expect(result).toBeDefined();
      expect(result.id).toBe('uuid-1234');
      expect(repository.create).toHaveBeenCalled();
    });
  });

  describe('listar todos os pacientes com sucesso', () => {
    it('deve retornar uma lista de pacientes com detalhes', async () => {
      const patientEntity = new Patient('uuid-1234', 'Maria', new Date('2019-01-01'), null, true);

      mockPatientRepository.findAll.mockResolvedValue([patientEntity]);

      const result = await service.findAll();

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Maria');
      expect(repository.findAll).toHaveBeenCalled();
    });
  });

  describe('buscar por id com sucesso', () => {
    it('deve retornar um paciente se encontrado', async () => {
      const patientEntity = new Patient('uuid-1234', 'Maria', new Date('2019-01-01'), null, true);
      mockPatientRepository.findById.mockResolvedValue(patientEntity);

      const result = await service.findById('uuid-1234');

      expect(result).toBeDefined();
      expect(result.id).toBe('uuid-1234');
      expect(repository.findById).toHaveBeenCalledWith('uuid-1234');
    });

    it('deve lançar NotFoundException se não encontrar', async () => {
      mockPatientRepository.findById.mockResolvedValue(null);

      await expect(service.findById('uuid-invalido')).rejects.toThrow(NotFoundException);
    });
  });

  describe('atualizar um paciente com sucesso', () => {
    it('deve atualizar um paciente com sucesso', async () => {
      const existingPatient = new Patient('uuid-1234', 'Maria', new Date('2019-01-01'), 'TEA', true);
      const updateDto: UpdatePatientDto = { name: 'Maria Silva', isActive: false };

      const updatedEntity = new Patient('uuid-1234', 'Maria Silva', new Date('2019-01-01'), 'TEA', false);

      mockPatientRepository.findById.mockResolvedValue(existingPatient);
      mockPatientRepository.update.mockResolvedValue(updatedEntity);

      const result = await service.update('uuid-1234', updateDto);

      expect(result).toBeUndefined();
      expect(repository.update).toHaveBeenCalledWith('uuid-1234', expect.objectContaining({ name: 'Maria Silva' }));
    });

    it('deve lançar NotFoundException ao tentar atualizar paciente inexistente', async () => {
      mockPatientRepository.findById.mockResolvedValue(null);

      await expect(service.update('uuid-invalido', {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('remover um paciente com sucesso', () => {
    it('deve realizar soft delete (desativar) o paciente', async () => {
      const existingPatient = new Patient('uuid-1234', 'Maria', new Date('2019-01-01'), 'TEA', true);
      const updatedEntity = new Patient('uuid-1234', 'Maria', new Date('2019-01-01'), 'TEA', false);

      mockPatientRepository.findById.mockResolvedValue(existingPatient);
      mockPatientRepository.update.mockResolvedValue(updatedEntity);

      await service.remove('uuid-1234');

      expect(repository.update).toHaveBeenCalledWith('uuid-1234', expect.objectContaining({ isActive: false }));
    });
  });
});
