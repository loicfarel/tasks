import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Maintainer } from './config/config.type';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);

  const maintainer = config.get<Maintainer>('maintainer');

  const apiDocConfig = new DocumentBuilder()
    .setTitle('SHOP API')
    .setDescription('The SHOP API description')
    .setVersion('1.0')
    .setContact(maintainer.name, maintainer.site, maintainer.email)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, apiDocConfig);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({});

  await app.listen(config.get<number>('port') || 3000);

  Logger.log(
    'App running at http://localhost:' + config.get<number>('port') || 3000,
    'NestApplication',
  );
}
bootstrap();
