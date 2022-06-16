import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export function recursivelyStripNullValues(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(recursivelyStripNullValues);
  }

  if (value !== null && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, val]) =>
        key === 'createdAt' || key === 'updatedAt'
          ? [key, val]
          : key === 'password' ||
            key === 'repeatPassword' ||
            key === 'currentRefreshToken'
          ? []
          : [key, recursivelyStripNullValues(val)],
      ),
    );
  }

  return value;
}

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(map((value) => recursivelyStripNullValues(value)));
  }
}
