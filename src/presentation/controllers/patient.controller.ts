import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PatientService } from '@application/services/patient.service';
import { CreatePatientDto } from '@dtos/create-patient.dto';
import { UpdatePatientDto } from '@dtos/update-patient.dto';
import { PatientResponseDto } from '@dtos/patient-response.dto';

@ApiTags('patients')
@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new patient' })
  @ApiResponse({ status: 201, description: 'The patient has been successfully created.', type: PatientResponseDto })
  async create(@Body() createPatientDto: CreatePatientDto): Promise<PatientResponseDto> {
    return this.patientService.create(createPatientDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all patients' })
  @ApiResponse({ status: 200, description: 'Return all patients.', type: [PatientResponseDto] })
  async findAll(): Promise<PatientResponseDto[]> {
    return this.patientService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a patient by ID' })
  @ApiResponse({ status: 200, description: 'Return the patient.', type: PatientResponseDto })
  @ApiResponse({ status: 404, description: 'Patient not found.' })
  async findOne(@Param('id') id: string): Promise<PatientResponseDto> {
    return this.patientService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a patient' })
  @ApiResponse({ status: 200, description: 'The patient has been successfully updated.', type: PatientResponseDto })
  @ApiResponse({ status: 404, description: 'Patient not found.' })
  async update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto): Promise<PatientResponseDto> {
    return this.patientService.update(id, updatePatientDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a patient (set isActive to false)' })
  @ApiResponse({ status: 200, description: 'The patient has been successfully deactivated.' })
  @ApiResponse({ status: 404, description: 'Patient not found.' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.patientService.remove(id);
  }
}
