import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Ejercicio } from '../models/ejercicio';

@Injectable({
  providedIn: 'root'
})
export class EjercicioService {
  private url: string = "";

  constructor(private _http: HttpClient, private toarService: ToastrService) {
    this.url = "http://localhost:3000/api/ejercicio/"
  }

  public obtenerEjercicio(id: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this._http.get(this.url + id, httpOptions);
  }

  public obtenerEjercicios(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this._http.get(this.url, httpOptions);
  }

  public guardarEjercicio(ejercicio: Ejercicio): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    this.toarService.success('Ejercicio Guardado correctamente', 'Ejercicio')
    return this._http.post<Ejercicio>(this.url, ejercicio, httpOptions);
  }

  public eliminarEjercicio(ejercicio: Ejercicio): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    this.toarService.success('Ejercicio Eliminada correctamente', 'Ejercicio')
    return this._http.delete(this.url + ejercicio._id, httpOptions);
  }

  public modificarEjercicio(ejercicio: Ejercicio): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    this.toarService.success('Ejercicio Modificado correctamente', 'Ejercicio')
    return this._http.put(this.url + ejercicio._id, ejercicio, httpOptions);
  }
}
