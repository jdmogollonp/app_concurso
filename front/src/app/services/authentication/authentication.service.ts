import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHelperService } from '../http-helper/http-helper.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUrl = `${environment.apiUrl}auth/`

  constructor(private http: HttpHelperService) { }

  signIn({ email, password }) {
    return new Promise((resolve, reject) => {
      if (!email || !password) {
        return reject('Todos los campos son requeridos');
      }

      this.http.postRequest(`${this.apiUrl}signIn`, { email, password }, '', resolve, reject);
    });
  }

  storeToken(token: string) {
    localStorage.clear();
    localStorage.setItem('SMART_TOOLS_STUFF', token);
  }

}
