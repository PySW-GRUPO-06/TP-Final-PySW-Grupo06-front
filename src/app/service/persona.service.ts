import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Persona } from '../models/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private url: string = "";

  constructor(private _http: HttpClient, private toarService: ToastrService) {
    this.url = "http://localhost:3000/api/persona/"
  }

  public obtenerPersona(id: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this._http.get(this.url + id, httpOptions);
  }

  public obtenerPersonaDNI(dni: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this._http.get(this.url + 'dni/'+dni, httpOptions);
  }

  public obtenerPersonaUsuario(idUsuario: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this._http.get(this.url + 'usuario/'+idUsuario, httpOptions);
  }

  public obtenerPersonas(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this._http.get(this.url, httpOptions);
  }

  public guardarPersona(persona: Persona): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    this.toarService.success('Persona Guardado correctamente', 'Persona')
    return this._http.post<Persona>(this.url, persona, httpOptions);
  }

  public eliminarPersona(id:string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    this.toarService.success('Persona Eliminada correctamente', 'Persona')
    return this._http.delete(this.url + id, httpOptions);
  }

  public modificarPersona(persona: Persona): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    this.toarService.success('Persona Modificado correctamente', 'Persona')
    return this._http.put(this.url + persona._id, persona, httpOptions);
  }
}
