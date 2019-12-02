import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiRestService } from './api-rest.service';
const basePath = "venta";

@Injectable({
  providedIn: 'root'
})
export class CobranzaService {

  constructor(private api: ApiRestService) { }

  getAll(): Observable<any> {
    return this.api.all(basePath).all("all").get();
  }

  findById(id: number): Observable<any> {
    return this.api.one(basePath, id).get();
  }

  venta(data: any): Observable<any> {
    return this.api.all(basePath).all("save").post(data);
  }

  deuda(clienteId) {
    return this.api.all(basePath).one("deuda", clienteId).get();
  }

  cobro(data: any): Observable<any> {
    return this.api.all(basePath).all("cobro").all("save").post(data);
  }

  update(data: any): Observable<any> {
    return this.api.all(basePath).all("actualizar").put(data);
  }

  delete(id: number): Observable<any> {
    return this.api.all(basePath).one("eliminar", id).delete();
  }
}
