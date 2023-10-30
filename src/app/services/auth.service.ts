import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private bddUrl = 'http://localhost:3000'
  currentUser!: User;
  isConnected: boolean = false;

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<{ accessToken: string, user_id: number, sub: string }>(this.bddUrl + '/auth/login', { email, password })
      .pipe(
        tap(response => {
          localStorage.setItem('access_token', response.accessToken);
          console.log('prénom personne co', response.sub)
          if (response.user_id && Number.isFinite(response.user_id)) {
            localStorage.setItem('user_id', `${response.user_id}`);
            console.log('Id utilisateur stocké:', localStorage.getItem('user_id'))
            console.log(typeof response.user_id)
          } else {
            console.error('mauvais user Id');
          }
        })
      );
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(
      'http://localhost:3000/auth/register',
      user
    );
  }

  checkConnexion(): boolean {
    this.isConnected = !!localStorage.getItem('access_token');
    return this.isConnected;
  }


}
