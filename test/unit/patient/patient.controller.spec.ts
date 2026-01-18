import { Test, TestingModule } from '@nestjs/testing';
import { PatientController } from '@presentation/controllers/patient.controller';
import { PatientService } from '@application/services/patient.service';
import { CreatePatientDto } from '@dtos/create-patient.dto';
import { UpdatePatientDto } from '@dtos/update-patient.dto';
import { PatientResponseDto } from '@dtos/patient-response.dto';

describe('Controlador de Pacientes', () => {
  let controller: PatientController;
  let service: PatientService;

  const mockPatientResponse: PatientResponseDto = {
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

  it('deve estar definido', () => {
    expect(controller).toBeDefined();
  });

  describe('criar', () => {
    it('deve criar um paciente', async () => {
      const createDto: CreatePatientDto = {
        name: 'Joãozinho Silva',
        birthDate: '2018-05-15',
        diagnosis: 'TEA Nível 1',
        isActive: true,
      };

      mockPatientService.create.mockResolvedValue(mockPatientResponse);

      const result = await controller.create(createDto);

      expect(result).toEqual(mockPatientResponse);
      expect(service.create).toHaveBeenCalledWith(createDto);
    });
  });

  describe('listarTodos', () => {
    it('deve retornar um array de pacientes', async () => {
      const responseArray = [mockPatientResponse];
      mockPatientService.findAll.mockResolvedValue(responseArray);

      const result = await controller.findAll();

      expect(result).toEqual(responseArray);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('buscarPorId', () => {
    it('deve retornar um paciente pelo ID', async () => {
      mockPatientService.findById.mockResolvedValue(mockPatientResponse);

      const result = await controller.findOne('uuid-1234');

      expect(result).toEqual(mockPatientResponse);
      expect(service.findById).toHaveBeenCalledWith('uuid-1234');
    });
  });

  describe('atualizar', () => {
    it('deve atualizar um paciente', async () => {
      const updateDto: UpdatePatientDto = { name: 'Novo Nome' };
      const updatedResponse = { ...mockPatientResponse, name: 'Novo Nome' };
      
      mockPatientService.update.mockResolvedValue(updatedResponse);

      const result = await controller.update('uuid-1234', updateDto);

      expect(result).toEqual(updatedResponse);
      expect(service.update).toHaveBeenCalledWith('uuid-1234', updateDto);
    });
  });

  describe('remover', () => {
    it('deve remover (soft delete) um paciente', async () => {
      mockPatientService.remove.mockResolvedValue(undefined);

      await controller.remove('uuid-1234');

      expect(service.remove).toHaveBeenCalledWith('uuid-1234');
    });
  });
});
