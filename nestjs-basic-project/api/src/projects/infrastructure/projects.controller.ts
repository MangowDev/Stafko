import { Controller, Get, Post, Body, Param, Put, Delete, Res, UseInterceptors, UploadedFile, Inject } from "@nestjs/common";
import { ProjectsDto } from "../domain/dto/projects.dto/projects.dto";
import { ProjectsEntity } from "../domain/entities/projects.entity";
import { IProjectsService } from "../application/projects.service.interface";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterFile } from "multer";
import { Response } from 'express';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('projects')
@Controller("api/projects")
export class ProjectsController {
  constructor(
    @Inject('ProjectsRepository')
    private readonly projectsService: IProjectsService) {}

  @Post()
  @ApiOperation({ summary: 'Creates a new project.' })
  @ApiBody({ type: ProjectsDto })
  @UseInterceptors(FileInterceptor("project_file"))
  @ApiResponse({ status: 200, description: 'Returns the created project.', type: ProjectsEntity })
  @ApiResponse({ status: 500, description: 'An error has occurred while trying to create the project.' })
  
  async create(
    @Body() projectDto: ProjectsDto,
    @UploadedFile() file: MulterFile
  ): Promise<ProjectsEntity> {
    return this.projectsService.create(projectDto, file);
  }

  
  @Get()
  @ApiOperation({ summary: 'Get all projects.' })
  @ApiResponse({ status: 200, description: 'Returns an array with all the projects.'})

  async findAll(): Promise<ProjectsEntity[]> {
    return this.projectsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: 'Get project by ID.' })
  @ApiParam({ name: 'id', description: 'Project ID.' })
  @ApiResponse({ status: 200, description: 'Returns the project specified by the ID.', type: ProjectsEntity })
  @ApiResponse({ status: 404, description: 'Project not found.' })

  async findOne(@Param("id") id: number): Promise<ProjectsEntity> {
    return this.projectsService.findOne(+id);
  }

  @Put(":id")
  @ApiOperation({ summary: 'Update project by ID.' })
  @ApiParam({ name: 'id', description: 'Project ID.' })
  @ApiBody({ type: ProjectsDto })
  @ApiResponse({ status: 200, description: 'Returns the updated project specified by the ID.', type: ProjectsEntity })
  @ApiResponse({ status: 500, description: 'An error has occurred while trying to update the project.' })

  async update(
    @Param("id") id: number,
    @Body() projectDto: ProjectsDto
  ): Promise<ProjectsEntity> {
    return this.projectsService.update(+id, projectDto);
  }

  @Get("projectname/:project_name")
  @ApiOperation({ summary: 'Get project by name.' })
  @ApiParam({ name: 'project_name', description: 'Project name.' })
  @ApiResponse({ status: 200, description: 'Returns the project specified by the name.', type: ProjectsEntity })
  @ApiResponse({ status: 404, description: 'Project not found.' })

  async findByProjectName(@Param("project_name") project_name: string): Promise<ProjectsEntity> {
    return this.projectsService.findByProjectName(project_name);
  }

  @Delete(":id")
  @ApiOperation({ summary: 'Delete project by ID.' })
  @ApiParam({ name: 'id', description: 'Project ID.' })
  @ApiResponse({ status: 204, description: 'Deletes the project specified by the ID.' })
  @ApiResponse({ status: 500, description: 'An error has occurred while trying to delete the project.'})

  async remove(@Param("id") id: number): Promise<void> {
    return this.projectsService.delete(+id);
  }

  @Get(":id/download")
  @ApiOperation({ summary: 'Download project file by ID.' })
  @ApiParam({ name: 'id', description: 'Project ID.' })
  @ApiResponse({ status: 200, description: 'Returns the project file.' })
  @ApiResponse({ status: 500, description: 'An error has occurred while trying to download the project file.'})

  async downloadFile(@Param("id") id: number, @Res() res: Response) {
    const project = await this.projectsService.findOne(+id);
    res.send(project.project_file); 
  }
}