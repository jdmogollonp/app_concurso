import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHelperService } from '../http-helper/http-helper.service';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ContestService {

  private apiUrl = `${environment.apiUrl}contests/`;

  constructor(private http: HttpHelperService , private htttp: HttpClient) { }

  getVideos(url:string){
    return this.htttp.get(`${this.apiUrl}${url}/videos`);
  }
  getVideo(url:string, id){
    return this.htttp.get(`${this.apiUrl}${url}/videos${id}`)
  }

  constructor(private http: HttpHelperService) { }


  uploadVideo(url: string, videoFile: File, { name, lastName, message, email }) {
    return new Promise((resolve, reject) => {
      if (!url || !videoFile || !name || !lastName || !message || !email) {
        return reject('Todos los campos son requeridos');
      }
      const formData = new FormData();
      formData.append('file', videoFile);
      formData.append('data', JSON.stringify({ name, lastName, message, email }));
      this.http.postRequest(`${this.apiUrl}${url}/videos`, formData, '', resolve, reject);
    });
  }

}
