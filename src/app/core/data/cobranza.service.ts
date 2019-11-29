import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiRestService } from './api-rest.service';
const basePath = "cobranza";

@Injectable({
  providedIn: 'root'
})
export class CobranzaService {

  constructor(private api: ApiRestService) { }

  getAll(): Observable<any> {
    return this.api.all(basePath).get();
  }

  getAllPageable(p: number, s: number): Observable<any> {
    return this.api.all(basePath).all(`pageable?page=${p}&size=${s}`).get();
  }

  findById(id: number): Observable<any> {
    return this.api.one(basePath, id).get();
  }

  create(data: any): Observable<any> {
    return this.api.all(basePath).all("registrar").post(data);
  }

  update(data: any): Observable<any> {
    return this.api.all(basePath).all("actualizar").put(data);
  }

  delete(id: number): Observable<any> {
    return this.api.all(basePath).one("eliminar", id).delete();
  }
}
