import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Priority, Status, Task } from '../entities/task.entity';

export class CreateTaskDto implements Omit<Task, 'id'> {
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
  assign?: string;
}
