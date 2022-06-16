import { Injectable } from '@nestjs/common';

@Injectable()
export class PrivacyReplacer {
  replaceHeader(headers: Record<string, any>) {
    if ('authorization' in headers) {
      headers.authorization = '<privacy-masked>';
    }
    if ('Authorization' in headers) {
      headers.Authorization = '<privacy-masked>';
    }
    if ('cookie' in headers) {
      headers.cookie = '<privacy-masked>';
    }
    return headers;
  }

  replaceBody(body: any) {
    if (body == null) return;
    if (typeof body === 'object') {
      if ('accessToken' in body) {
        body.accessToken = '<privacy-masked>';
      }
      if ('refreshToken' in body) {
        body.refreshToken = '<privacy-masked>';
      }
      if ('password' in body) {
        body.password = '<privacy-masked>';
      }
      if ('repeatPassword' in body) {
        body.repeatPassword = '<privacy-masked>';
      }
      if ('verificationLink' in body) {
        body.verificationLink = '<privacy-masked>';
      }
      if ('currentRefreshToken' in body) {
        body.currentRefreshToken = '<privacy-masked>';
      }
    }

    return body;
  }
}
