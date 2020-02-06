import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHelperService } from '../http-helper/http-helper.service';
import * as jwt from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUrl = `${environment.apiUrl}auth/`;

  constructor(private http: HttpHelperService) { }

  getTokenInformation() {
    try {
      const token = localStorage.getItem('SMART_TOOLS_STUFF');
      if (!token) {
        return false;
      }
      const decodedToken = jwt(token);
      if (!decodedToken) {
        localStorage.clear();
        return false;
      }
      console.log(decodedToken);

      return decodedToken;
    } catch (error) {
      console.log(error);
      localStorage.clear();
      return false;
    }
  }

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

  logOut() {
    localStorage.clear();
    window.location.reload();
  }

  storeToken(token: string) {
    localStorage.clear();
    localStorage.setItem('SMART_TOOLS_STUFF', token);
  }

}
