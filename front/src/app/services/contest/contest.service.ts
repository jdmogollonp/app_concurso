import { Injectable } from '@angular/core';
// en la variable? (funcion?) environment esta la dirrecion de la api
import { environment } from 'src/environments/environment';
import { HttpHelperService } from '../http-helper/http-helper.service';
import { AuthenticationService } from '../authentication/authentication.service';


// coneccion con el back
@Injectable({
  providedIn: 'root'
})
export class ContestService {

  // url contests
  // acuerdese que en el rout de contest debe enrutar a /api/contests
  private apiUrl = `${environment.apiUrl}contests/`;

  constructor(private http: HttpHelperService, private authenticationService:AuthenticationService) { }

  createContest({name}){
    return new Promise((resolve,reject) => {
      if (!name){
        return reject('Todo los campos son requeridos')
      }
      const token = this.authenticationService.getTokenInformation();
      // this.http.postRequest(this.apiUrl,{name,email:name,description:name},"" )
      this.http.postRequest(this.apiUrl,{name},token,resolve,reject);

    } )

  }
}
