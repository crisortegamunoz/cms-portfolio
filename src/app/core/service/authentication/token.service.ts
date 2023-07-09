import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private token: string | null;

  constructor() {
    this.token = null;
  }

  saveToken(token: string): void {
    this.token = token;
  }

  getToken(): string | null {
    return this.token;
  }

}
