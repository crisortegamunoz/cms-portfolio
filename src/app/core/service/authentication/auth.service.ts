import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { TokenService } from './token.service';
import { Auth } from '@core/models/auth.model';
import { User } from '@core/models/user.model';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private SERVICE = `/api/auth`;


  constructor(private http: HttpClient,
              private tokenService: TokenService,
              private userService: UserService) {

  }

  login(user: User) {
    return this.http.post<Auth>(`${this.SERVICE}/login`, user)
    .pipe(
      tap(response => {
        this.tokenService.saveToken(response.jwt);
        this.userService.setUserName(user.username);
      })
    )
  }

}
