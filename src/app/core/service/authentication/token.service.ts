import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private token: string | null;
  private apiKey: string | null;

  constructor() {
    this.token = null;
    this.apiKey = null;
  }

  saveToken(token: string): void {
    this.token = token;
  }

  saveApiKey(apiKey: string): void {
    this.apiKey = apiKey;
  }

  getToken(): string | null {
    return this.token;
  }

  getApiKey(): string | null{
    return this.apiKey;
  }

}
