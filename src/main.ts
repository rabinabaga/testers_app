import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const APP_PORT = process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 8000;

  app.setGlobalPrefix('api');
  app.enableCors({
    origin: '*', // or restrict to frontend IP later
    credentials: true, // Required for cookies to work
  });
  await app.listen(APP_PORT);
  console.log(`Listening on http://0.0.0.0:${APP_PORT}`);
}
bootstrap();
