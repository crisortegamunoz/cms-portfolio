import { Injectable } from '@angular/core';
import { user } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private username: string;

  constructor() { 
    this.username = '';
  }

  setUserName(username: string): void {
    this.username = username;
  }

  getUserName(): string {
    return this.username; 
  }

}
