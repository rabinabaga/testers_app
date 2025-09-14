import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { CustomInterceptor } from './interceptors/custom.interceptor';
import { GlobalValidationWithSourcePipe } from './validators/global-validation-with-source.validator';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const APP_PORT = process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 8000;
  app.useGlobalPipes(new GlobalValidationWithSourcePipe());

  app.useGlobalInterceptors(
    new TransformInterceptor(),
    new CustomInterceptor(),
  );
  app.setGlobalPrefix('api/v1');
  app.enableCors({
    origin: '*', // or restrict to frontend IP later
    credentials: true, // Required for cookies to work
  });
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(APP_PORT);
  console.log(`Listening on http://0.0.0.0:${APP_PORT}`);
}
bootstrap();
