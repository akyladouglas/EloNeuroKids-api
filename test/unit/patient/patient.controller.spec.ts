import { Test, TestingModule } from '@nestjs/testing';
import { PatientController } from '@presentation/controllers/patient.controller';
import { PatientService } from '@application/services/patient.service';
import { CreatePatientDto } from '@dtos/create-patient.dto';
import { PatientCreatedResponseDto } from '@dtos/patient-created-response.dto';
import { PatientDetailsResponseDto } from '@dtos/patient-details-response.dto';
import { UpdatePatientDto } from '@dtos/update-patient.dto';

// Mock do módulo 'uuid' APENAS para este arquivo de teste
jest.mock('uuid', () => ({
  v4: () => 'generated-uuid',
}));

describe('Controlador de Pacientes', () => {
  let controller: PatientController;
  let service: PatientService;

  const mockPatientCreatedResponse: PatientCreatedResponseDto = {
    id: 'uuid-1234',
  };

  const mockPatientDetailsResponse: PatientDetailsResponseDto = {
    id: 'uuid-1234',
    name: 'Joãozinho Silva',
    birthDate: new Date('2018-05-15'),
    diagnosis: 'TEA Nível 1',
    isActive: true,
    age: 7,
  };

  const mockPatientService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientController],
      providers: [
        {
          provide: PatientService,
          useValue: mockPatientService,
        },
      ],
    }).compile();

    controller = module.get<PatientController>(PatientController);
    service = module.get<PatientService>(PatientService);
  });

  it('o controlador deve estar definido', () => {
    expect(controller).toBeDefined();
  });

  describe('criar um paciente com sucesso', () => {
    it('deve criar um paciente com sucesso e retornar apenas o ID', async () => {
      const createDto: CreatePatientDto = {
        name: 'Joãozinho Silva',
        birthDate: '2018-05-15',
        diagnosis: 'TEA Nível 1',
        isActive: true,
      };

      mockPatientService.create.mockResolvedValue(mockPatientCreatedResponse);

      const result = await controller.create(createDto);

      expect(result).toEqual(mockPatientCreatedResponse);
      expect(service.create).toHaveBeenCalledWith(createDto);
    });
  });

  describe('listar todos os pacientes com sucesso', () => {
    it('deve retornar uma lista de detalhes de pacientes', async () => {
      const responseArray = [mockPatientDetailsResponse];
      mockPatientService.findAll.mockResolvedValue(responseArray);

      const result = await controller.findAll();

      expect(result).toEqual(responseArray);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('buscar por id com sucesso', () => {
    it('deve retornar os detalhes de um paciente pelo ID', async () => {
      mockPatientService.findById.mockResolvedValue(mockPatientDetailsResponse);

      const result = await controller.findOne('uuid-1234');

      expect(result).toEqual(mockPatientDetailsResponse);
      expect(service.findById).toHaveBeenCalledWith('uuid-1234');
    });
  });

  describe('atualizar um paciente com sucesso', () => {
    it('deve atualizar um paciente', async () => {
      const updateDto: UpdatePatientDto = { name: 'Novo Nome' };

      mockPatientService.update.mockResolvedValue(undefined);

      const result = await controller.update('uuid-1234', updateDto);

      expect(result).toBeUndefined();
      expect(service.update).toHaveBeenCalledWith('uuid-1234', updateDto);
    });
  });

  describe('remover um paciente com sucesso', () => {
    it('deve remover (soft delete) um paciente', async () => {
      mockPatientService.remove.mockResolvedValue(undefined);

      await controller.remove('uuid-1234');

      expect(service.remove).toHaveBeenCalledWith('uuid-1234');
    });
  });
});
