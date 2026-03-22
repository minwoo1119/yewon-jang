import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const httpApp = app.getHttpAdapter().getInstance() as {
    set: (name: string, value: unknown) => void;
  };

  httpApp.set('trust proxy', 1);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin:
      process.env.FRONTEND_ORIGIN?.split(',').map((origin) => origin.trim()) ??
      true,
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
