import { Controller, Get, Post, Body, Param, Put, Delete, Inject } from '@nestjs/common';
import { StaffDto } from '../domain/dto/staff.dto/staff.dto';
import { StaffEntity } from '../domain/entities/staff.entity';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';
import { IStaffService } from '../application/staff.service.interface';

@ApiTags('staff')
@Controller('api/staff')
export class StaffController {
  constructor(
    @Inject('StaffRepository')
    private readonly staffService: IStaffService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new staff member.' })
  @ApiBody({ type: StaffDto })
  @ApiResponse({ status: 200, description: 'Returns the created staff member.', type: StaffEntity })
  @ApiResponse({ status: 500, description: 'An error occurred while trying to create the staff member.' })

  async create(@Body() staffDto: StaffDto): Promise<StaffEntity> {
    return this.staffService.create(staffDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all staff members.' })
  @ApiResponse({ status: 200, description: 'Returns an array with all the staff members.'})

  async findAll(): Promise<StaffEntity[]> {
    return this.staffService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get staff member by ID.' })
  @ApiParam({ name: 'id', description: 'Staff member ID.' })
  @ApiResponse({ status: 200, description: 'Returns the staff member specified by the ID.' })
  @ApiResponse({ status: 404, description: 'Staff not found.' })
  
  async findOne(@Param('id') id: number): Promise<StaffEntity> {
    return this.staffService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update staff member by ID.' })
  @ApiParam({ name: 'id', description: 'Staff member ID.' })
  @ApiBody({ type: StaffDto })
  @ApiResponse({ status: 200, description: 'Returns the updated staff member specified by the ID.', type: StaffEntity })
  @ApiResponse({ status: 500, description: 'An error occurred while trying to update the staff member.' })

  async update(@Param('id') id: number, @Body() staffDto: StaffDto): Promise<StaffEntity> {
    return this.staffService.update(+id, staffDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete staff member by ID.' })
  @ApiParam({ name: 'id', description: 'Staff member ID.' })
  @ApiResponse({ status: 204, description: 'Deletes the staff member specified by the ID.' })
  @ApiResponse({ status: 500, description: 'An error occurred while trying to delete the staff member.' })

  async remove(@Param('id') id: number): Promise<void> {
    return this.staffService.remove(+id);
  }

  @Get('username/:username')
  @ApiOperation({ summary: 'Get staff member by username.' })
  @ApiParam({ name: 'username', description: 'Staff member username.' })
  @ApiResponse({ status: 200, description: 'Returns the staff member specified by the username.' })
  
  async findOneByUsername(@Param('username') username: string): Promise<StaffEntity> {
    return this.staffService.findOneByUsername(username);
  }
}
