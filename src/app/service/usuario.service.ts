import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url: string = "";

  constructor(private _http: HttpClient, private toarService: ToastrService) {
    this.url = "http://localhost:3000/api/usuario/"
  }

  public obtenerUsuario(id: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this._http.get(this.url + id, httpOptions);
  }

  public obtenerUsuarios(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this._http.get(this.url, httpOptions);
  }

  public guardarUsuario(usuario: Usuario): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    this.toarService.success('Usuario Guardado correctamente', 'Usuario')
    return this._http.post<Usuario>(this.url, usuario, httpOptions);
  }

  public eliminarUsuario(usuario: Usuario): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    this.toarService.success('Usuario Eliminada correctamente', 'Usuario')
    return this._http.delete(this.url + usuario._id, httpOptions);
  }

  public modificarUsuario(usuario: Usuario): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    this.toarService.success('Usuario Modificado correctamente', 'Usuario')
    return this._http.put(this.url + usuario._id, usuario, httpOptions);
  }
}
