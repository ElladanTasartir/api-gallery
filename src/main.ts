import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { port } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(Number(port));
}
bootstrap();
