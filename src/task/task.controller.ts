import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiTags } from '@nestjs/swagger';
import { Task } from './entities/task.entity';

@ApiTags('Tasks')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<{ success: boolean; message: string }> {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  async findAll(): Promise<{
    success: boolean;
    message: string;
    tasks?: Task[];
  }> {
    return this.taskService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<{ success: boolean; message: string; task?: Task }> {
    return this.taskService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<{ success: boolean; message: string }> {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
  ): Promise<{ success: boolean; message: string }> {
    return this.taskService.delete(id);
  }
}
