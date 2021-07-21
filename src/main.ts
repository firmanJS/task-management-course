import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(morgan('combined'));
  app.enableCors();
  app.use(helmet());
  await app.listen(3000);
  console.info(`Application listening on port 3000`);
}
bootstrap();
