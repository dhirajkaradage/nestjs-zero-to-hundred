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
  const extractValidationErrors = (errors: ValidationError[]): string[] => {
    const messages: string[] = [];
    for (const error of errors) {
      if (error.constraints) {
        messages.push(
          `${error.property} - ${Object.values(error.constraints).join(', ')}`,
        );
      }
      if (error.children?.length) {
        messages.push(...extractValidationErrors(error.children));
      }
    }
    return messages;
  };

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const messages = extractValidationErrors(errors);
        return new HttpException(
          {
            statusCode: HttpStatus.PRECONDITION_FAILED,
            message: messages[0],
          },
          HttpStatus.PRECONDITION_FAILED,
        );
      },
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
