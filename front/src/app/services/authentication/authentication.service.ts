import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHelperService } from '../http-helper/http-helper.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUrl = `${environment.apiUrl}auth/`;

  constructor(private http: HttpHelperService) { }

  signIn({ email, password }) {
    return new Promise((resolve, reject) => {
      if (!email || !password) {
        return reject('Todos los campos son requeridos');
      }

      email = email.toLowerCase().replace(/\s/g, '');

      this.http.postRequest(`${this.apiUrl}signIn`, { email, password }, '', resolve, reject);
    });
  }

  signUp({ email, password, passwordConfirmation, name, lastName }) {
    return new Promise((resolve, reject) => {
      if (!email || !password || !passwordConfirmation || !name || !lastName) {
        return reject('Todos los campos son requeridos');
      }

      if (password !== passwordConfirmation) {
        return reject('Las contraseñas ingresadas no coinciden');
      }

      email = email.toLowerCase().replace(/\s/g, '');

      this.http.postRequest(`${this.apiUrl}signUp`, { email, password, name, lastName }, '', resolve, reject);
    });
  }

  storeToken(token: string) {
    localStorage.clear();
    localStorage.setItem('SMART_TOOLS_STUFF', token);
  }

}
