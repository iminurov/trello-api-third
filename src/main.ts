import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { JwtAuthGuard } from './auth/jwt.auth.guard';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Приложение Ильдара CMS')
    .setDescription('Второе и третье задание')
    .setVersion('1.0.0')
    .addTag('Ильдар Разработчик')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);
  //Испоьзовал общий с ядра
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalGuards(new JwtAuthGuard());

  await app.listen(PORT, () => console.log('Server started on port = 5000'));
}
bootstrap();
