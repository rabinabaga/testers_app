import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp().getResponse();
    return next.handle().pipe(
      map((data) => {
        const isEmptyArray =
          Array.isArray(data?.data ?? data) &&
          (data?.data ?? data).length === 0;

        return {
          status: 'success',
          statusCode: ctx.statusCode,
          message: isEmptyArray
            ? 'No content found'
            : (data?.message ?? 'Request successful'),
          data: data.data ?? data,
          ...(data.pagination && {
            pagination: data.pagination,
          }),
        };
      }),
    );
  }
}
