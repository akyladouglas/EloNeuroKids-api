import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PatientService } from '@application/services/patient.service';
import { CreatePatientDto } from '@dtos/create-patient.dto';
import { UpdatePatientDto } from '@dtos/update-patient.dto';
import { PatientCreatedResponseDto } from '@dtos/patient-created-response.dto';
import { PatientDetailsResponseDto } from '@dtos/patient-details-response.dto';
import { JwtAuthGuard } from '@application/auth/guards/jwt-auth.guard';

@ApiTags('Patients')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new patient' })
  @ApiResponse({
    status: 201,
    description: 'The patient has been successfully created. Returns only the ID.',
    type: PatientCreatedResponseDto,
  })
  async create(@Body() createPatientDto: CreatePatientDto): Promise<PatientCreatedResponseDto> {
    return this.patientService.create(createPatientDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all patients' })
  @ApiResponse({ status: 200, description: 'Return all patients details.', type: [PatientDetailsResponseDto] })
  async findAll(): Promise<PatientDetailsResponseDto[]> {
    return this.patientService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a patient by ID' })
  @ApiResponse({ status: 200, description: 'Return the patient details.', type: PatientDetailsResponseDto })
  @ApiResponse({ status: 404, description: 'Patient not found.' })
  async findOne(@Param('id') id: string): Promise<PatientDetailsResponseDto> {
    return this.patientService.findById(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Update a patient' })
  @ApiResponse({
    status: 204,
    description: 'The patient has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Patient not found.' })
  async update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto): Promise<void> {
    await this.patientService.update(id, updatePatientDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a patient (set isActive to false)' })
  @ApiResponse({ status: 200, description: 'The patient has been successfully deactivated.' })
  @ApiResponse({ status: 404, description: 'Patient not found.' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.patientService.remove(id);
  }
}
