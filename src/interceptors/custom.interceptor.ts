import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
function toPascalCase(str) {
  return str
    .replace(/[_-]+/g, ' ') // replace _ and - with spaces
    .trim()
    .split(/\s+/) // split by spaces
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

@Injectable()
export class CustomInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Intercept and log the request
    const request = context.switchToHttp().getRequest();

    const { method, originalUrl } = request;

    const startTime = Date.now();
    Logger.log(
      `Incoming Request: ${method} ${originalUrl} - Received at ${new Date(
        startTime,
      ).toISOString()}`,
    );

    return next.handle().pipe(
      tap((data) => {
        const response = context.switchToHttp().getResponse();
        const { statusCode } = response;
        const endTime = Date.now();
        const timeTaken = endTime - startTime;

        Logger.log(
          `Outgoing Response: ${method} ${originalUrl} - Status: ${statusCode} - Sent at ${new Date(
            endTime,
          ).toISOString()} - Time Taken: ${timeTaken}ms`,
        );
        const resource = originalUrl.split('/')[2];
        const originalUrlResource = toPascalCase(resource);
        const responseMessage =
          method === 'PATCH'
            ? `${originalUrlResource} Updated Successfully`
            : method === 'DELETE'
              ? `${originalUrlResource} Deleted Successfully`
              : `${originalUrlResource} Created Successfully`;

        return {
          ...data,
          message: data.message ?? responseMessage,
          modifiedByInterceptor: true,
        };
      }),
      catchError((error) => {
        // Log the exception
        const response = context.switchToHttp().getResponse();
        const { statusCode } = response;

        Logger.error(
          `Error occurred in ${request.method} ${request.originalUrl}: ${error.message}`,
          error.stack,
        );

        throw error;
      }),
    );
  }
}
