import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap, tap } from 'rxjs/operators';

import { environment } from 'environments/environment';
import { TokenService } from './token.service';
import { Auth } from '@core/models/auth.model';
import { User } from '@core/models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private SERVICE = `/api/auth`;


  constructor(private http: HttpClient,
    private tokenService: TokenService) {

  }

  login(user: User) {
    return this.http.post<Auth>(`${this.SERVICE}/login`, user)
    .pipe(
      tap(response => this.tokenService.saveToken(response.jwt))
    )
  }

}
