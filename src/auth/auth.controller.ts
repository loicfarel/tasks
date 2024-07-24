import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { Public } from './decorators/public.decorator';

@ApiTags('Authentification')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Public()
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }
  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }
}
