import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const config = new DocumentBuilder().addBearerAuth().build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      apisSorter: 'alpha',
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  await app.listen(3003);
  console.log(`Swagger API doc at http://localhost:${3003}/api/docs`);
}

bootstrap();
