import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { TokenService } from "@core/service/authentication/token.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.tokenService.getToken();
    const apiKey = this.tokenService.getApiKey();
    if (token && apiKey) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          'x-api-key': apiKey
        }
      });
    }
    return next.handle(request);
  }
}
