import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvionmentVariables } from './config/config.options';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<EnvionmentVariables>);

  const port = configService.get('PORT');

  await app.listen(port);
}
bootstrap();
