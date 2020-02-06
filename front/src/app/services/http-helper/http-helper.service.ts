import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpHelperService {
  constructor(private http: HttpClient) { }

  private requestOptions: any;

  // Return the header object
  getAuthorizationOptionsHeaders(token: any) {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token
      })
    };
  }

  // Return the header object
  getOptionsHeaders() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  // Handles the response of a delete request
  handleRequestResponse(request: Observable<ArrayBuffer>, resolve: any, reject: any, callback: any, errorCallback: any) {
    request.subscribe(
      (data: any) => {
        if (callback) {
          callback(data.data, resolve);
        } else {
          resolve(data.data);
        }
      },
      err => {
        return errorCallback
          ? errorCallback(err, reject)
          : this.handleError(err, reject);
      }
    );
  }

  // DELETE request
  deleteRequest(
    endpoint: string,
    body: any,
    token: any,
    resolve: any,
    reject: any,
    callback?: any,
    errorCallback?: any) {
    this.requestOptions =
      token === ''
        ? this.getOptionsHeaders()
        : this.getAuthorizationOptionsHeaders(token);
    this.requestOptions.body = body;
    this.handleRequestResponse(this.http.delete(endpoint, this.requestOptions), resolve, reject, callback, errorCallback);
  }

  // GET request
  getRequest(
    endpoint: string,
    token: any,
    resolve: any,
    reject: any,
    callback?: any,
    errorCallback?: any
  ) {
    this.requestOptions =
      token === ''
        ? this.getOptionsHeaders()
        : this.getAuthorizationOptionsHeaders(token);

    this.handleRequestResponse(this.http.get(endpoint, this.requestOptions), resolve, reject, callback, errorCallback);
  }

  // Handle an http error
  handleError(err, reject) {
    console.log(err);
    const status = err.status;
    if (status === 404 || status === 400 || status === 401) {
      if (err.error && err.error.errors && err.error.errors[0]) {
        return reject(err.error.errors[0]);
      } else {
        return reject('Se presentó un error realizando la petición.');
      }
    } else if (err.error && err.error.responseText) {
      return reject(err.error.responseText);
    } else {
      return reject('Se presentó un error realizando la petición');
    }
  }

  // POST request
  postRequest(
    endpoint: string,
    requestBody: any,
    token: any,
    resolve: any,
    reject: any,
    callback?: any,
    errorCallback?: any
  ) {
    this.requestOptions =
      token === ''
        ? this.getOptionsHeaders()
        : this.getAuthorizationOptionsHeaders(token);

    this.handleRequestResponse(this.http.post(endpoint, requestBody, this.requestOptions), resolve, reject, callback, errorCallback);
  }

  // PUT request
  putRequest(
    endpoint: string,
    requestBody: any,
    token: any,
    resolve: any,
    reject: any,
    callback?: any,
    errorCallback?: any
  ) {
    this.requestOptions =
      token === ''
        ? this.getOptionsHeaders()
        : this.getAuthorizationOptionsHeaders(token);

    this.handleRequestResponse(this.http.put(endpoint, requestBody, this.requestOptions), resolve, reject, callback, errorCallback);
  }
}
