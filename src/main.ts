import './search/search.controller.js'; // Adjust path as needed
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle(process.env.APP_NAME)
    .setDescription(process.env.APP_DESCRIPTION)
    .setVersion(process.env.API_VERSION)
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig, {
    ignoreGlobalPrefix: false,
  });

  try {
    SwaggerModule.setup('docs', app, document, {
      // swaggerOptions: {
      //   baseUrl: '/backend/v1',
      // },
    });
  } catch (error) {
    this.logger.error(error);
  }

  app.useGlobalPipes(new ValidationPipe());

  app.enableVersioning({
    type: VersioningType.URI,
  });

  await app.listen(
    process.env.APP_SERVER_LISTEN_PORT,
    process.env.APP_SERVER_LISTEN_IP,
  );
}
bootstrap();
