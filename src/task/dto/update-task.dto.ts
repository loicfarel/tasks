import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateTaskDto } from './create-task.dto';
import { Priority, Status } from '../entities/task.entity';

export class UpdateTaskDto implements Omit<CreateTaskDto, 'date'> {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  status: Status;

  @IsNotEmpty()
  priority: Priority;

  @IsOptional()
  @IsString()
  @IsEmail()
  assign: string;
}
