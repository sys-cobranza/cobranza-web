import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Configuration } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class ApiRestService {

  private url: string;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private _http: HttpClient, private configuration: Configuration) {
    this.url = configuration.api;
  }

  get path() {
    return this.url;
  }

  get http() {
    return this._http;
  }

  one(path: string, id: number): ApiRestService {
    const restangular = this.clone();
    restangular.url += (path ? '/' + path : '') + '/' + id;
    return restangular;
  }

  all(path: string): ApiRestService {
    const restangular = this.clone();
    restangular.url = restangular.url + '/' + path;
    return restangular;
  }

  get(): Observable<Response> {
    return this._http.get(this.url, { headers: this.headers }).pipe(
      map((response) => {
        return response as any;
      }), catchError((res) => { return this.onError(res); }));
  }

  post(obj?: any): Observable<Response> {
    return this._http.post(this.url, obj, { headers: this.headers }).pipe(
      map((response) => {
        return response as any;
      }), catchError((res) => { return this.onError(res); }));
  }

  put(obj: any): Observable<Response> {
    const clone = Object.assign({}, obj);
    delete clone['_restangular'];
    return this._http.put(this.url, clone, { headers: this.headers }).pipe(
      map((response) => {
        return response as any;
      }), catchError((res) => { return this.onError(res); }));
  }

  delete(): Observable<Response> {
    return this._http.delete(this.url).pipe(
      map((response) => {
        return response as any;
      }),
      catchError((res) => { return this.onError(res); }));
  }

  clone(): ApiRestService {
    return new ApiRestService(this._http, { api: this.url });
  }

  onError(error: any) {
    return throwError(error.message || error);
  }
}