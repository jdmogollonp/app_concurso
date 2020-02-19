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
      //this.http.getRequest(`${this.apiUrl}all`, localStorage.getItem('SMART_TOOLS_STUFF'), resolve, reject);
    });

  }
  uploadContest(imageFile: File, { url, start_date, end_date, description }) {
    return new Promise((resolve, reject) => {
      if (!imageFile || !url  || !end_date || !description) {
        return reject('Todos los campos son requeridos');
      }
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('data', JSON.stringify({ url, start_date, end_date, description }));
      console.log(url);
      console.log(imageFile);

      // this.http.postRequest(`${this.apiUrl}new`, formData, localStorage.getItem('SMART_TOOLS_STUFF'), resolve, reject);
    });
  }
}
