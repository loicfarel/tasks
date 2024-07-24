import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';
import { JwtAuthGuard } from './guards/auth/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [configuration],
    }),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('jwtSecret'),
          signOptions: {
            expiresIn: configService.get<string>('jwtTtl'),
          },
        };
      },
      global: true,
      inject: [ConfigService],
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get<string>('databaseUri'),
        };
      },
      inject: [ConfigService],
    }),

    UserModule,

    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
