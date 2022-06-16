import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { PrivacyReplacer } from '../utils/PrivacyReplacer';

@Injectable()
export class LogInterceptor implements NestInterceptor {
  private requestLogger = new Logger('HTTP_REQUEST');
  private responseLogger = new Logger('HTTP_RESPONSE');
  constructor(private readonly privacyReplacer: PrivacyReplacer) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.logRequest(context);

    return next.handle().pipe(
      catchError((error: any) => {
        this.logResponse(context, error);
        throw error;
      }),
      tap((data) => {
        this.logResponse(context, data);
      }),
    );
  }

  private logRequest(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();

    this.requestLogger.verbose(
      'log REQUEST',
      JSON.stringify(
        {
          body: this.privacyReplacer.replaceBody(_.cloneDeep(request.body)),
          headers: this.privacyReplacer.replaceHeader(
            _.cloneDeep(request.headers),
          ),
          user: this.getUser(context),
        },
        null,
        2,
      ),
    );
  }

  private logResponse(context: ExecutionContext, data: any) {
    const response = context.switchToHttp().getResponse<Response>();

    const loggingParams: Record<string, any> = {
      headers: this.privacyReplacer.replaceHeader(
        _.cloneDeep(response.getHeaders()),
      ),
      user: this.getUser(context),
    };
    if (data instanceof Error) {
      loggingParams.error = { message: data.message };
    } else {
      loggingParams.body = this.privacyReplacer.replaceBody(_.cloneDeep(data));
    }

    this.responseLogger.verbose(
      'log RESPONSE',
      JSON.stringify(loggingParams, null, 2),
    );
  }

  private getUser(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    if (request.user == null || typeof request.user !== 'object') {
      return null;
    }

    const user = { ...request.user };

    delete user.iat;
    delete user.exp;

    return this.privacyReplacer.replaceBody(_.cloneDeep(user));
  }
}
