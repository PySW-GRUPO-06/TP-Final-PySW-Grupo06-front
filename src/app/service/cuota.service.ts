import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Cuota } from '../models/cuota';

@Injectable({
  providedIn: 'root'
})
export class CuotaService {

  private url: string = "";

  constructor(private _http: HttpClient, private toarService: ToastrService) {
    this.url = "http://localhost:3000/api/cuota/"
  }

  public obtenerCuota(id: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this._http.get(this.url + id, httpOptions);
  }

  public obtenerCuotas(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this._http.get(this.url, httpOptions);
  }

  public guardarCuota(cuota: Cuota): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    this.toarService.success('Cuota Guardado correctamente', 'Cuota')
    return this._http.post<Cuota>(this.url, cuota, httpOptions);
  }

  public eliminarCuota(cuota: Cuota): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    this.toarService.success('Cuota Eliminada correctamente', 'Cuota')
    return this._http.delete(this.url + cuota._id, httpOptions);
  }

  public modificarCuota(cuota: Cuota): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    this.toarService.success('Cuota Modificado correctamente', 'Cuota')
    return this._http.put(this.url + cuota._id, cuota, httpOptions);
  }
}