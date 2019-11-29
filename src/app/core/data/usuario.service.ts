import { Injectable } from '@angular/core';
import { ApiRestService } from './api-rest.service';
import { Observable } from 'rxjs';
const basePath = "usuario";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private api: ApiRestService) { }

  getAll(): Observable<any> {
    return this.api.all(basePath).all("all").get();
  }

  findById(id: number): Observable<any> {
    return this.api.one(basePath, id).get();
  }

  create(data: any): Observable<any> {
    return this.api.all(basePath).all("save").post(data);
  }

  update(data: any): Observable<any> {
    return this.api.all(basePath).all("actualizar").put(data);
  }

  delete(id: number): Observable<any> {
    return this.api.all(basePath).one("eliminar", id).delete();
  }
}