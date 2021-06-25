import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Entrenador } from '../models/entrenador';

@Injectable({
  providedIn: 'root'
})
export class EntrenadorService {
  private url: string = "";

  constructor(private _http: HttpClient, private toarService: ToastrService) {
    this.url = "http://localhost:3000/api/entrenador/"
  }

  public obtenerEntrenador(id: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this._http.get(this.url + id, httpOptions);
  }

  public obtenerEntrenadores(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this._http.get(this.url, httpOptions);
  }

  public guardarEntrenador(entrenador: Entrenador): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    this.toarService.success('Entrenador Guardado correctamente', 'Entrenador')
    return this._http.post<Entrenador>(this.url, entrenador, httpOptions);
  }

  public eliminarEntrenador(id:string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    this.toarService.success('Entrenador Eliminada correctamente', 'Entrenador')
    return this._http.delete(this.url + id, httpOptions);
  }

  public modificarEntrenador(entrenador: Entrenador): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    this.toarService.success('Entrenador Modificado correctamente', 'Entrenador')
    return this._http.put(this.url + entrenador._id, entrenador, httpOptions);
  }
}
