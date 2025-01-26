import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  HttpException,
  HttpStatus,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties that are not in the DTO
      forbidNonWhitelisted: true, // Throw an error if unknown properties are provided
      transform: true, // Automatically transform payloads to match DTO types
      exceptionFactory: (errors: ValidationError[]) => {
        const firstError = errors[0]; // Only use the first validation error
        const message = `${firstError.property} - ${Object.values(firstError.constraints).join(', ')}`;
        return new HttpException(
          {
            statusCode: HttpStatus.PRECONDITION_FAILED,
            message,
          },
          HttpStatus.PRECONDITION_FAILED,
        );
      },
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
