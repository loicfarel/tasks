import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskDocument } from './entities/task.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name)
    private readonly taskModel: Model<TaskDocument>,
  ) {}

  async create(
    createTaskDto: CreateTaskDto,
  ): Promise<{ success: boolean; message: string }> {
    try {
      const newTask = new this.taskModel(createTaskDto);
      await newTask.save();
      return { success: true, message: 'Task successfully created' };
    } catch (error) {
      return { success: false, message: 'Failed to create task' };
    }
  }

  async findAll(): Promise<{
    success: boolean;
    message: string;
    tasks?: Task[];
  }> {
    try {
      const tasks = await this.taskModel.find().sort({ updatedAt: -1 }).exec();
      return { success: true, message: 'Tasks retrieved successfully', tasks };
    } catch (error) {
      return { success: false, message: 'Failed to retrieve tasks' };
    }
  }

  async findOne(
    id: string,
  ): Promise<{ success: boolean; message: string; task?: Task }> {
    try {
      const task = await this.taskModel.findById(id).exec();
      if (!task) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }
      return { success: true, message: 'Task retrieved successfully', task };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async update(
    id: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<{ success: boolean; message: string }> {
    try {
      const existingTask = await this.taskModel
        .findByIdAndUpdate(id, updateTaskDto, { new: true })
        .exec();
      if (!existingTask) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }
      return { success: true, message: 'Task successfully updated' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async delete(id: string): Promise<{ success: boolean; message: string }> {
    try {
      const result = await this.taskModel.findByIdAndDelete(id).exec();
      if (!result) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }
      return { success: true, message: 'Task successfully deleted' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}
