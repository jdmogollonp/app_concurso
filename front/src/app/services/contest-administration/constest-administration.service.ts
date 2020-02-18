import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHelperService } from '../http-helper/http-helper.service';




@Injectable({
  providedIn: 'root'
})
export class ConstestAdministrationService {
  private apiUrl = `${environment.apiUrl}contests/administrartor/`;

  constructor(private http: HttpHelperService) { }
  getContests(){
    return new Promise((resolve, reject) => {            
      this.http.getRequest(`${this.apiUrl}all`, localStorage.getItem('SMART_TOOLS_STUFF'), resolve, reject);
    });

  }
}
