import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Dieta } from '../models/dieta';

@Injectable({
  providedIn: 'root'
})
export class DietaService {
  private url: string = "";

  constructor(private _http: HttpClient, private toarService: ToastrService) {
    this.url = "http://localhost:3000/api/dieta/"
  }

  public obtenerDieta(id: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this._http.get(this.url + id, httpOptions);
  }

  public obtenerDietas(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this._http.get(this.url, httpOptions);
  }

  public guardarDieta(dieta: Dieta): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    this.toarService.success('Dieta Guardado correctamente', 'Dieta')
    return this._http.post<Dieta>(this.url, dieta, httpOptions);
  }

  public eliminarDieta(dieta: Dieta): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    this.toarService.success('Dieta Eliminada correctamente', 'UsuaDietario')
    return this._http.delete(this.url + dieta._id, httpOptions);
  }

  public modificarDieta(dieta: Dieta): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    this.toarService.success('Dieta Modificado correctamente', 'Dieta')
    return this._http.put(this.url + dieta._id, dieta, httpOptions);
  }
}
