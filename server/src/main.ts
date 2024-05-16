import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);

  app.setGlobalPrefix(config.get<string>('API_PREFIX'));

  app.enableCors();

  await app.listen(7888);
}
bootstrap();
