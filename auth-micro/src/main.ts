import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const NAME = configService.get<string>('SERVICE_NAME');
  const MODE = configService.get<number>('SERVICE_MODE');
  const PORT = configService.get<number>('SERVICE_PORT');
  const HOST = configService.get<number>('SERVICE_HOST');
  const PROTOCOL = configService.get<number>('SERVICE_PROTOCOL');
  const GLOBAL_PREFIX = configService.get<string>('SERVICE_GLOBAL_PREFIX');
  const SWAGGER = configService.get<string>('SERVICE_SWAGGER');
  // const swaggerUrl = configService.get<string>('SWAGGER_URL');
  const swaggerUrl = `${GLOBAL_PREFIX}/${SWAGGER}`;

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      whitelist: true,
    }),
  );
  app.setGlobalPrefix(GLOBAL_PREFIX);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle(`name: ${NAME} | mode: ${MODE}`)
    .setVersion('1.0')
    .setDescription('auth bearer service')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(swaggerUrl, app, document);

  await app.listen(PORT, () => {
    console.log(`${NAME} run on port ${PORT} with mode ${MODE}`);
    console.log(
      `Server has been started on ${PROTOCOL}://${HOST}:${PORT}/${GLOBAL_PREFIX}`,
    );
    console.log(`Open swagger: ${PROTOCOL}://${HOST}:${PORT}/${swaggerUrl}`);
  });
}
bootstrap();
