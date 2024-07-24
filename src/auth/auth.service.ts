import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { verify } from 'src/helpers/hash';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}
  async login(loginDto: LoginDto) {
    const user = await this.userService.findOneByEmail(loginDto.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const passwordMatch = await verify(loginDto.password, user.password);
    if (!passwordMatch) throw new UnauthorizedException('Invalid credentials');

    const payload = {
      user,
      sub: user.id,
    };

    return {
      user: payload.user,
      access_token: await this.generateUserToken(payload),
    };
  }

  async generateUserToken(payload: any) {
    return await this.jwtService.signAsync(payload);
  }
}
