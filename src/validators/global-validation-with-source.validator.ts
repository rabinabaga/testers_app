import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  ValidationPipe,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { flattenErrors } from 'src/common/helpers/array.helpers';

@Injectable()
export class GlobalValidationWithSourcePipe extends ValidationPipe {
  private currentMetadata: ArgumentMetadata | null = null;

  constructor() {
    super({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,

      exceptionFactory: (validationErrors: ValidationError[]) => {
        const source = this.currentMetadata?.type ?? 'body';

        const formattedErrors = flattenErrors(validationErrors);

        const transformedErrors = formattedErrors.map((err) => ({
          type: 'field',
          value: err.value,
          msg: err.msg,
          path: err.path,
          location: source,
        }));

        return new BadRequestException({
          statusCode: 422,
          message: 'The request failed due to a validation problem',
          errors: transformedErrors,
        });
      },
    });
  }

  override async transform(value: any, metadata: ArgumentMetadata) {
    this.currentMetadata = metadata;
    try {
      return await super.transform(value, metadata);
    } finally {
      this.currentMetadata = null;
    }
  }
}
