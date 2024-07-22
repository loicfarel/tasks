import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { hash } from 'src/helpers/hash';
import { ApiResponse } from 'globalType';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<ApiResponse<User>> {
    const { email, password, role } = createUserDto;

    try {
      const existEmail = await this.userModel.findOne({ email });
      if (existEmail) {
        return {
          success: false,
          message: 'Email déjà utilisé',
        };
      }

      const hashedPassword = await hash(password);
      const user = await this.userModel.create({
        email,
        password: hashedPassword,
        role,
      });

      return {
        success: true,
        data: user,
      };
    } catch (error) {
      console.error('Error creating user:', error);
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      return this.userModel.findOne({ email });
    } catch (error) {
      console.error(error);
    }
  }

  async findOneById(id: string): Promise<User> {
    try {
      return this.userModel.findById(id).exec();
    } catch (error) {
      console.error(error);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const users = await this.userModel
        .find()
        .sort({ updupdatedAt: -1 })
        .exec();
      return users;
    } catch (error) {
      console.error(error);
    }
  }

  async updateOneById(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<{ success: boolean; user: User }> {
    try {
      const { password, profile } = updateUserDto;
      const hashedPassword = password ? await hash(password) : undefined;
      const user = await this.userModel
        .findByIdAndUpdate(id, {
          ...(password && { password: hashedPassword }),
          ...(profile && { profile }),
        })
        .exec();
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return { success: true, user };
    } catch (error) {
      console.error(error);
    }
  }

  async deleteById(id: string): Promise<{ success: boolean }> {
    try {
      const result = await this.userModel.findByIdAndDelete(id).exec();
      if (!result) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false };
    }
  }
}
